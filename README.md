```
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

```php
// \App\Http\Middleware\InitializeTenancyByDomain::class
// skopiowane z Stancl'owego InitializeTenancyByDomain
public function handle($request, Closure $next)
{
    if(in_array($request->getHost(), config('tenancy.central_domains'), true)){
        return $next($request);
    }

    return $this->initializeTenancy(
        $request, $next, $request->getHost()
    );
}
```

```php
// app/Http/Kernel.php
protected $middleware = [
    // ...
    InitializeTenancyByDomain::class,
];

'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```


```php
// tinker
$tenant = Tenant::create([ "id" => "foo" ])
$tenant->domains()->create([ "domain" => "foo" ])
```

```dotenv
# .env
SANCTUM_STATEFUL_DOMAINS=*.localhost:8000
SESSION_DOMAIN=.localhost:8000
```

```php
// config/cors.php
'supports_credentials' => true,
```

```
composer require laravel/fortify
php artisan vendor:publish --provider="Laravel\Fortify\FortifyServiceProvider"
php artisan migrate
```

```php
// config/app.php
App\Providers\TenancyServiceProvider::class,
App\Providers\FortifyServiceProvider::class
```

```php
// config/fortify.php
'middleware' => [ 'web', PreventAccessFromCentralDomains::class ],
'views' => false,
'features' => [
    Features::registration(),
//    Features::resetPasswords(),
//    Features::emailVerification(),
//    Features::updateProfileInformation(),
//    Features::updatePasswords(),
//    Features::twoFactorAuthentication([
//        'confirmPassword' => true,
//    ]),
],
```

```
npm install
npm install react react-dom react-router-dom
```

```js
// webpack.mix.js
mix.js('resources/js/app.jsx', 'public/js')
    .css('resources/css/app.css', 'public/css')
    .react();
```
