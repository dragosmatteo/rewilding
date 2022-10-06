<?php

namespace App\Classes;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class Gitea {
    public function storeClause($jurisdiction, $clause, $subJurisdiction = false)
    {
        if($this->cached($jurisdiction, $clause)) {
            return cache("{$jurisdiction}.{$clause}");
        }

        $folder = 'Clauses';
        if($subJurisdiction) {
            $folder = 'Sub Jurisdictions';
        }

        $jurisdiction   = rawurlencode($jurisdiction);
        $folder         = rawurlencode($folder);
        $clause         = rawurlencode($clause);

        $url = "https://git.law/Selector/Documents/raw/branch/master/{$jurisdiction}/{$folder}/{$clause}";
        Storage::disk('local')->put(
            'clauses/' . $clause,
            file_get_contents($url)
        );

        return storage_path('app/clauses/' . $clause);

        // $clause = cache()->remember(
        //                     "{$jurisdiction}.{$clause}",
        //                     3600,
        //                     fn() => file_get_contents($url)
        //                     );
    }

    /**
     * Check if the given clause is cached.
    */
    protected function cached($jurisdiction, $clause)
    {
        if(cache("{$jurisdiction}.{$clause}")) {
            return true;
        }

        return false;
    }

    public function jurisdictions()
    {
        return Http::get("https://git.law/api/v1/repos/Selector/documents/contents");
    }

    public function subJurisdictions($jurisdiction)
    {
        $jurisdiction = rawurlencode($jurisdiction);
        return Http::get("https://git.law/api/v1/repos/Selector/documents/contents/{$jurisdiction}/Sub%20Jurisdictions");
    }

    /**
     * Retrieve the clauses for a jurisdiction
     *
     * @param   string $jurisdiction
     * @return  string|false
     */
    public function clauses($jurisdiction)
    {
        $jurisdiction = rawurlencode($jurisdiction);
        /** @var array $clauses */
        $clauses = Http::get("https://git.law/api/v1/repos/Selector/documents/contents/{$jurisdiction}/Clauses")->json();

        # Filter out non ".docx" clauses
        /** @var array clauses */
        $clauses = array_filter(
            $clauses,
            function ($clause) {
                $extension = pathinfo($clause['name'], PATHINFO_EXTENSION);
                if ($extension !== 'docx') {
                    return false;
                }

                return true;
            }
        );

        # Remove extension from clauses' filename(s)
        /** @var array $clauses */
        $clauses = array_map(
            function (array $clause) {
                $filename = pathinfo($clause['name'], PATHINFO_FILENAME);
                $clause['name'] = $filename;

                return $clause;
            },
            $clauses
        );

        # Reset array indexes
        $clauses = array_values($clauses);

        ## Remove duplicate values
        ## TODO: Prioritize .docx clauses
        # Retrieve unique clause names
        $tempClauses = array_unique(array_column($clauses, 'name'));
        # Filter the items in the array based on the unique clause names
        $clauses = array_values(array_intersect_key($clauses, $tempClauses));

        return json_encode($clauses);
    }

    public function contracts($jurisdiction)
    {
        $jurisdiction = rawurlencode($jurisdiction);
        return Http::get("https://git.law/api/v1/repos/Selector/documents/contents/{$jurisdiction}/Contracts");
    }

    public function readme($jurisdiction)
    {
        $jurisdiction = rawurlencode($jurisdiction);
        $readme = Http::get("https://git.law/api/v1/repos/Selector/documents/contents/{$jurisdiction}/README.md");

        $readme = base64_decode($readme['content']);

        return $readme;
    }

    public function contractData($jurisdiction, $contract)
    {
        $jurisdiction = rawurlencode($jurisdiction);
        $contract = rawurlencode($contract);
        $contractSelectedData = Http::get("https://git.law/api/v1/repos/Selector/documents/contents/{$jurisdiction}/Contracts/{$contract}.json");
        $contractSelectedData = base64_decode($contractSelectedData['content']);

        return $contractSelectedData;
    }
}