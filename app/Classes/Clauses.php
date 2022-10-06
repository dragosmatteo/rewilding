<?php

namespace App\Classes;

class Clauses {
    protected $jurisdiction;

    public function __construct($jurisdiction, $clauses = null)
    {
        $this->jurisdiction = $jurisdiction;
        $this->api = new Gitea();
        $this->clauses = $clauses;
    }

    /**
     * Get clauses name to create the document.
    */
    public function names($isAdditional = false)
    {
        if(isset($this->clauses)) {
            return $this->clauses;
        }

        $clauses = json_decode($this->api->clauses($this->jurisdiction, $isAdditional));
        $names = [];
        if($isAdditional){
            foreach($clauses as $clause) {
                if($clause->type=="file" && $clause->name!='README.md' && substr($clause->name, -3) == 'txt')
                    $names[] = $clause->name;
            }
        } else {
            foreach($clauses as $clause) {
                $names[] = $clause->name;
            }
        }

        return $names;
    }

    public function get($clause)
    {
        return $this->api->storeClause($this->jurisdiction, $clause);
    }
}