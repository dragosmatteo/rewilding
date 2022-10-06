<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ContractController;
use App\Http\Controllers\GiteaApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('contract', [ContractController::class, 'contract']);

Route::get('jurisdictions', [GiteaApiController::class, 'jurisdictions']);
Route::get('clauses', [GiteaApiController::class, 'clauses']);
Route::get('contracts', [GiteaApiController::class, 'contracts']);
Route::get('readme', [GiteaApiController::class, 'readme']);
Route::get('contractSelectedData', [GiteaApiController::class, 'contractSelectedData']);
Route::get('specificClause', [GiteaApiController::class, 'specificClause']);
Route::get('subJurisdictions', [GiteaApiController::class, 'subJurisdictions']);