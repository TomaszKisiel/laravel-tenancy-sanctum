<?php

declare( strict_types=1 );

use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use Stancl\Tenancy\Middleware\ScopeSessions;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::middleware( [
    'web',
//    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
] )->group( function () {
    Route::get( '/sanctum/csrf-cookie', CsrfCookieController::class . '@show' );

    Route::middleware( "auth:sanctum" )->group( function () {
        Route::post( '/', function () {
            return response()->json( [], 200 );
        } );
        Route::get( "/tenant", function () {
            return response()->json( [ "tenant" => tenant( "id" ) ], 200 );
        } );
    } );

    Route::view( '/{path?}', 'tenant.app' )->where( 'path', '.*' );
} );
