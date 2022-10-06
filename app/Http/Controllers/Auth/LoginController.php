<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function redirectToAuth()
    {
        $query = http_build_query([
            'client_id' => config('services.contrai.client_id'),
            'redirect_uri' => config('app.url') . '/callback',
            'response_type' => 'code',
            'scope' => '',
        ]);

        return config('services.contrai.url') . '/oauth/authorize?' . $query;
    }

    public function authCallback(Request $request)
    {
        $http = new Client;

        $response = $http->post('nginx/oauth/token', [
            'headers' => [
                'Host'  => 'contrai-auth.orcro'
            ],
            'form_params' => [
                'grant_type' => 'authorization_code',
                'client_id' => config('services.contrai.client_id'),
                'client_secret' => config('services.contrai.client_secret'),
                'redirect_uri' => config('app.url') . '/callback',
                'code' => $request->code
            ],
        ]);

        $credentials = json_decode($response->getBody()->getContents());

        $client = new Client([
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => $credentials->token_type . ' ' . $credentials->access_token
            ]
        ]);

        $request = $client->get(
            'nginx/api/user',
            [
                'headers' => [
                    'Host'  => 'contrai-auth.orcro'
                ],
            ]
        );

        $contraiUser = json_decode($request->getBody()->getContents());

        $user = $this->findOrCreateUser($contraiUser);

        auth()->login($user);

        return redirect('/')->with('success', 'You have successfully logged in.');
    }

    public function findOrCreateUser($contraiUser)
    {
        $user = User::where('contrai_id', $contraiUser->id)->first();

        if($user) return $user;

        $user = User::create([
            'name' => $contraiUser->name,
            'email' => $contraiUser->email,
            'contrai_id' => $contraiUser->id
        ]);

        $user->save();

        return $user;
    }
}
