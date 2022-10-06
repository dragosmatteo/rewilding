<?php

namespace App\Http\Controllers;

use App\Models\Company;

class CompanyController extends Controller
{
    public function show(Company $company)
    {
        return [
            'company' => $company,
            'user_id' => $company->user->id,
            'infos' => $company->infos
        ];
    }

    public function store()
    {
        $attributes = request()->validate([
            'user_id' => 'required',
            'name' => 'required',
            'slug' => 'required',
            'email' => 'required|email',
            'address' => 'required'
        ]);

        $company = Company::create($attributes);

        return response()->json($company);
    }


    public function update(Company $company)
    {
        $attributes = request()->validate([
            'user_id' => 'required',
            'name' => 'required',
            'email' => 'required|email',
            'address' => 'required'
        ]);

        $company->update($attributes);

        return back();
    }

    public function destroy(Company $company) {
        $company->delete();
        
        return redirect('/dashboard');
    }

    public function index()
    {
        $companies = null;

        if(auth()->check()) {
            $user = auth()->user()->id;
            $companies = Company::where('user_id', $user)->get();
        }

        return [
            'companies' => $companies,
            'user' => $user ?? null
        ];
    }
}