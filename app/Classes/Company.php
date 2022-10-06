<?php

namespace App\Classes;

use Illuminate\Support\Facades\DB;

class Company {
    protected $id;

    public function __construct($id)
    {
        $this->id = $id; // company id
        $this->user = auth()->user()->id;
    }

    public function getTags()
    {
        $company = $this->companyExists();
        if(! $company) {
            return false;
        }

        $tags = [];
        
        $tags['P1_Name'] = $company->name;
        $tags['P1_Ema'] = $company->email;
        $tags['P1_Reg'] = $company->address;

        $optionalData = $this->getInfos();

        if($optionalData)
            foreach($optionalData as $key => $optional)
                $tags[$key] = $optional;

        return $tags;
    }

    protected function companyExists()
    {
        $company = DB::table('companies')
            ->where([
                'id' => $this->id,
                'user_id' => $this->user
                ])
                ->first();

        return $company ?? false;
    }

    public function getInfos() {
        $additional = [
            'P1_Pro' => '{P1_Pro}',
            'P1_Hyp3' => 'P1_Hyp3'
        ];

        $product = DB::table('infos')
                    ->where([
                        'company_id' => $this->id,
                        'user_id' => $this->user,
                        'parameter' => 'Product / Service'
                    ])->first();

        (isset($product)) ? $additional['P1_Pro'] = $product->value : [];

        $site = DB::table('infos')
                    ->where([
                        'company_id' => $this->id,
                        'user_id' => $this->user,
                        'parameter' => 'Company Website'
                    ])->first();

        (isset($site)) ? $additional['P1_Hyp3'] = $site->value : [];
        
        return $additional;
    }
}