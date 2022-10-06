<?php

namespace App\Classes\Contract;

use Exception;
use App\Classes\Gitea;
use App\Classes\Clauses;
use App\Classes\Company;

class MainContract extends BasicContract implements ContractInterface {
    protected $jurisdiction;
    protected $topic;
    protected $clauses;
    protected $subJurisdiction;
    protected $extension;
    protected $companyId;

    private Gitea $api;

    public function __construct($data)
    {
        parent::__construct();

        $this->jurisdiction = $data['jSelected'];
        $this->topic = $data['tSelected'];
        $this->clauses = explode(',', $data['clausesSelected']);
        if($data['subJurisdictionSelected']){
            $this->subJurisdiction = $data['subJurisdictionSelected'] . '.docx';
        }

        if($data['companySelectedId']){
            $this->companyId = $data['companySelectedId'];
        }

        $this->api = new Gitea();
    }

    public function create()
    {
        $clauses = new Clauses($this->jurisdiction, $this->clauses);
        $names = $clauses->names();

        $subJurisdiction = null;
        if(isset($this->subJurisdiction)) {
            $subJurisdiction = $this->api->storeClause($this->jurisdiction, $this->subJurisdiction, true);
        }

        try {
            $clausePaths = [];

            if (!empty($subJurisdiction)) {
                $clausePaths[] = $subJurisdiction;
            }

            foreach($names as $key => $clause) {
                # TODO: Check which file format is available and use the best one
                $clausePaths[] = $clauses->get($clause . '.docx'); # Hardcoded .docx format
            }

        } catch (\Exception $e) {
            throw new Exception($e->getMessage());
        }

        return $this->store(null, $clausePaths);
    }

    public function getTags()
    {
        if($this->companyId === 'undefined' || $this->companyId === 'null')
            return [];

        return (new Company($this->companyId))->getTags();
    }
}