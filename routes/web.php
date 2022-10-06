<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\InfoController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{name?}', fn() => view('app'))->where('name', '(dashboard|additional|download-contracts|form-generator|login)');
Route::get('/company/{id}', fn() => view('app'))->where('id', '[0-9]+');
Route::get('generateDocument', [ContractController::class, 'contract']);

// log in from Contrai Saas
Route::middleware('guest')->group(function () {
    Route::get('/redirectToAuth', [LoginController::class, 'redirectToAuth'])->name('login');
    Route::get('/callback', [LoginController::class, 'authCallback']);
});

Route::get('user/companies', [CompanyController::class, 'index']);
Route::get('user/contracts', [ContractController::class, 'index']);

Route::middleware('auth')->group(function () {
    Route::post('logout', [SessionController::class, 'destroy']);
    
    Route::get('info', [InfoController::class, 'show']);
    Route::post('info', [InfoController::class, 'store']);
    Route::patch('info/{info}', [InfoController::class, 'update']);
    
    Route::get('company/{company}/info', [CompanyController::class, 'show']);
    Route::post('company', [CompanyController::class, 'store']);
    Route::patch('company/{company}', [CompanyController::class, 'update']);
    Route::delete('company/{company}', [CompanyController::class, 'destroy']);

    Route::get('contract/{contract}', [ContractController::class, 'show']);
    Route::delete('contract/{contract}', [ContractController::class, 'destroy']);
    Route::get('contracts-generated', [ContractController::class, 'index']);
    Route::post('document', [ContractController::class, 'store']);
});

Route::post('download', [ContractController::class, 'contract']);
Route::get("download/{id}", [ContractController::class, 'download']);

Route::post('download-all', [ContractController::class, 'downloadArchive']);