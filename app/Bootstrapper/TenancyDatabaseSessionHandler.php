<?php


namespace App\Bootstrapper;


use Illuminate\Contracts\Container\Container;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Session\DatabaseSessionHandler;

class TenancyDatabaseSessionHandler extends DatabaseSessionHandler {

    public function __construct( ConnectionInterface $connection, $table, $minutes, Container $container = null ) {
        parent::__constructor( $connection, $table, $minutes, $container );
    }

    protected function addUserInformation( &$payload ) {
        $payload[ "tenant_id" ] = tenant( "id" ) ?? "central";

        return parent::addUserInformation( $payload );
    }

}
