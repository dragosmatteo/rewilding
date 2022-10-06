<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use App\Classes\Gitea;

class GiteaApiController {
    public function __construct() {
        $this->gitea = new Gitea();
    }
    public function jurisdictions()
    {
        return $this->gitea->jurisdictions();
    }

    public function clauses()
    {
        $jurisdiction = request()->jSelected;

        return $this->gitea->clauses($jurisdiction);
    }

    public function contracts()
    {
        $jurisdiction = request()->jSelected;

        return $this->gitea->contracts($jurisdiction);
    }

    public function readme()
    {
        $jurisdiction = request()->jSelected;

        return $this->gitea->readme($jurisdiction);
    }

    public function contractSelectedData()
    {
        $jurisdiction = request()->jSelected;
        $contract = str_replace('.json', '', request()->tSelected);

        return $this->gitea->contractData($jurisdiction, $contract);
    }

    public function subJurisdictions()
    {
        $jurisdiction = request()->jSelected;

        /** @var array $subJurisdictions */
        $subJurisdictions = Http::get("https://git.law/api/v1/repos/Selector/documents/contents/{$jurisdiction}/Sub%20Jurisdictions")->json();

        if (!empty($subJurisdictions['errors'])) {
            $subJurisdictions = [];
        } else {
            # Filter out non ".docx" clauses
            /** @var array subJurisdictions */
            $subJurisdictions = array_filter(
                $subJurisdictions,
                function ($subJurisdiction) {
                    $extension = pathinfo($subJurisdiction['name'], PATHINFO_EXTENSION);
                    if ($extension !== 'docx') {
                        return false;
                    }

                    return true;
                }
            );

            # Remove extension from subJurisdictions' filename(s)
            /** @var array $subJurisdictions */
            $subJurisdictions = array_map(
                function (array $subJurisdiction) {
                    $filename = pathinfo($subJurisdiction['name'], PATHINFO_FILENAME);
                    $subJurisdiction['name'] = $filename;

                    return $subJurisdiction;
                },
                $subJurisdictions
            );

            # Reset array indexes
            $subJurisdictions = array_values($subJurisdictions);

            ## Remove duplicate values
            ## TODO: Prioritize .docx subJurisdictions
            # Retrieve unique subJurisdiction names
            $tempSubJurisdictions = array_unique(array_column($subJurisdictions, 'name'));
            # Filter the items in the array based on the unique clause names
            $subJurisdictions = array_values(array_intersect_key($subJurisdictions, $tempSubJurisdictions));
        }

        return json_encode($subJurisdictions);
    }

    public function specificClause()
    {
        return preg_split("/\,/", request()->clausesSelected);
    }
}