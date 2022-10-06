<?php

namespace App\Classes;

class PrepareForDownloadPage {
    protected $documents;
    protected $company;

    public function __construct($documents, $company)
    {
        $this->documents = $documents;
        $this->company = $company;
    }

    /**
     * Send documents data to client
     */
    public function send()
    {
        return $this->addDocsData();
    }

    /**
     * Add more data to be displayed in client
     * 
     * @return array documents
     */
    protected function addDocsData()
    {
        $documents = [];

        foreach($this->documents as $key => $document) {
            $documents[$key]['name'] = pathinfo($document, PATHINFO_FILENAME);
            $documents[$key]['extension'] = pathinfo($document, PATHINFO_EXTENSION);
            $documents[$key]['company'] = $this->company;
        }

        return $documents;
    }
}