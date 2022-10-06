<?php

namespace App\Http\Controllers;

use App\Models\Info;

class InfoController extends Controller
{
    public function store()
    {
        $attributes = request()->validate([
            'parameter' => 'required',
            'value' => 'required',
            'user_id' => 'required',
            'company_id' => 'required'
        ]);

        $info = Info::create($attributes);

        return response()->json(['information' => $info]);
    }

    public function show()
    {
        return Info::all()->where('user_id', auth()->user()->id);
    }

    public function update(Info $info)
    {
        $attributes = request()->validate([
            'value' => 'required',
        ]);

        $info->update($attributes);

        return response()->json(['information' => $info]);
    }
}
