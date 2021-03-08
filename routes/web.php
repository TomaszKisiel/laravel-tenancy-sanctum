<?php

use Illuminate\Support\Facades\Route;

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

//Route::middleware("auth:sanctum")->group( function() {
//    Route::post('/', function() {
//        return response( )->json([], 200);
//    });
//});
//
//Route::get("/domain", function() { return config( "session.domain" ); });
//Route::view( '/{path?}', 'tenant.app' )->where( 'path', '.*' );

Route::view("/", "welcome");
