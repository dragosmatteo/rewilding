<?php

namespace App\Classes\Contract;

use Exception;
use App\Classes\Gitea;
use App\Classes\Clauses;

class ApiMainContract extends BasicContract implements ContractInterface {
    protected $data;
    protected $topic;
    protected $jurisdiction;
    protected $sub_jurisdiction;

    private Gitea $api;

    public function __construct($data)
    {
        parent::__construct();

        $this->data = $data;
        $this->topic = $this->data['contract-type'];
        $this->jurisdiction = $this->data['jurisdiction'];
        if(isset($this->data['sub-jurisdiction']))
            $this->sub_jurisdiction = $this->data['sub-jurisdiction'] . '.txt';

        $this->api = new Gitea();
    }

    public function create()
    {
        $names = $this->getContractClauses();
        $clauses = new Clauses($this->jurisdiction, $names);

        if(isset($this->sub_jurisdiction)) {
            $subj = $this->api->storeClause($this->jurisdiction, $this->sub_jurisdiction, true);

            array_splice($names, 1, 0, $this->sub_jurisdiction);
        }

        try {
            foreach($names as $key => $clause) {
                ($key == 1 && $this->sub_jurisdiction) ?
                    $clause = $subj : $clause = $clauses->get($clause);

                $this->addToContract($clause);
            }

            if(isset($this->data['company'])) {
                $document = $this->store(); // create new document to replace tags afterwards

                return $document;
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

        return $this->store();
    }

    protected function getContractClauses()
    {
        $jurisdiction = $this->jurisdiction;
        $contract = $this->topic;

        $contractData = json_decode($this->api->contractData($jurisdiction, $contract));

        // foreach($contractData->clauses as &$clause) {
        //     $clause = $clause . '.docx';
        // }

        // return $contractData->clauses;

        return array_map(
            function ($clause) {
                return $clause . '.docx';
            },
            $contractData->clauses
        );
    }

    public function getTags()
    {
        return $this->data['company'];
    }
}