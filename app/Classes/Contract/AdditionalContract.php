<?php

namespace App\Classes\Contract;

use Exception;
use App\Classes\Clauses;
use App\Classes\Gitea;

class AdditionalContract extends BasicContract implements ContractInterface {
    protected $business;
    protected $trading;
    protected $address;
    protected $jurisdiction;
    protected $documents = [];
    protected $registeredAddress;
    protected $websiteAddress;
    protected $generalEmail;
    protected $generalTel;
    protected $servicesDescription;
    protected $minimumAge;

    private Gitea $api;

    public function __construct($data)
    {
        parent::__construct();

        $this->business = $data['businessName'];
        $this->trading = $data['tradingName'];
        $this->address = $data['tradingAddress'];
        $this->jurisdiction = $data['jurisdictionCountry'];
        $this->documents = $data['generateDocs'];
        $this->registeredAddress = $data['registeredAddress'];
        $this->websiteAddress = $data['websiteAddress'];
        $this->generalEmail = $data['generalEmail'];
        $this->generalTel = $data['generalTel'];
        $this->servicesDescription = $data['servicesDescription'];
        $this->minimumAge = $data['minimumAge'];
        if(! is_array($this->documents)) {
            $this->documents = explode(',', $this->documents);
        }

        $this->api = new Gitea();
    }

    /**
     * Create a new contract
     *
     * @return string|array paths
    */
    public function create()
    {
        $paths = [];
        try {
            foreach($this->documents as $document) {
                $contractData = json_decode($this->api->contractData($this->jurisdiction, $document), true);
                $clauses = new Clauses($this->jurisdiction, $contractData['clauses']);
                $names = $clauses->names(true);

                $clausePaths = [];
                foreach($names as $key => $clause) {
                    # TODO: Check which file format is available and use the best one
                    $clausePaths[] = $clauses->get($clause . '.docx'); # Hardcoded .docx format
                }

                $paths[] = $this->store($document, $clausePaths);
            }
        } catch (\Exception $e) {
            throw new Exception($e->getMessage());
        }
        return $paths;
    }

    public function getTags()
    {
        return [
            'business_name' => $this->business,
            'Business_Name' => $this->business,
            'trading_name' => $this->trading,
            'Trading_Name' => $this->trading,
            'trading_address' => $this->address,
            'Trading_Address' => $this->address,
            'Country_Incorporation' => $this->jurisdiction,
            'jurisdiction_country' => $this->jurisdiction,
            'Jurisdiction_Law' => $this->jurisdiction,
            'Applicable_Law' => $this->jurisdiction,
            'Registered_Address' => $this->registeredAddress,
            'Website_Address' => $this->websiteAddress,
            'General_Email' => $this->generalEmail,
            'General_Tel' => $this->generalTel,
            'Services.Description' => $this->servicesDescription,
            'Minimum_Age' => $this->minimumAge
        ];
    }
}