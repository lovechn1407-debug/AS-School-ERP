<?php

// ===================================================================
// CRITICAL: Suppress PHP 8.1+ deprecation notices BEFORE everything.
// Laravel 8.42 is not PHP 8.1+ compatible (missing #[ReturnTypeWillChange]).
// We must prevent E_DEPRECATED from being converted to ErrorException.
// ===================================================================
error_reporting(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED);
ini_set('error_reporting', (string)(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED));
ini_set('display_errors', '0');

// Ensure essential storage and bootstrap folders exist in serverless /tmp environment
$storageDirs = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/logs',
    '/tmp/storage/app/public',
    '/tmp/bootstrap/cache',
];

foreach ($storageDirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
}

// Copy services.php from original bootstrap/cache if it exists
$originalServicesPath = __DIR__ . '/../bootstrap/cache/services.php';
if (file_exists($originalServicesPath) && !file_exists('/tmp/bootstrap/cache/services.php')) {
    @copy($originalServicesPath, '/tmp/bootstrap/cache/services.php');
}

putenv('VIEW_COMPILED_PATH=/tmp/storage/framework/views');

// CRITICAL: Set cache paths BEFORE the Application is constructed.
// Laravel's PackageManifest reads these env vars in the Application constructor.
// If not set, it defaults to bootstrap/cache/ which is read-only on Vercel.
putenv('APP_PACKAGES_CACHE=/tmp/bootstrap/cache/packages.php');
putenv('APP_SERVICES_CACHE=/tmp/bootstrap/cache/services.php');
putenv('APP_CONFIG_CACHE=/tmp/bootstrap/cache/config.php');
putenv('APP_ROUTES_CACHE=/tmp/bootstrap/cache/routes.php');
putenv('APP_EVENTS_CACHE=/tmp/bootstrap/cache/events.php');

$_ENV['APP_PACKAGES_CACHE'] = '/tmp/bootstrap/cache/packages.php';
$_ENV['APP_SERVICES_CACHE'] = '/tmp/bootstrap/cache/services.php';
$_ENV['APP_CONFIG_CACHE'] = '/tmp/bootstrap/cache/config.php';
$_ENV['APP_ROUTES_CACHE'] = '/tmp/bootstrap/cache/routes.php';
$_ENV['APP_EVENTS_CACHE'] = '/tmp/bootstrap/cache/events.php';

define('LARAVEL_START', microtime(true));

require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';

// Bind storage path to writable /tmp directory on serverless runtimes
if (method_exists($app, 'useStoragePath')) {
    $app->useStoragePath('/tmp/storage');
}

// ===================================================================
// Override Laravel's HandleExceptions error handler.
// Laravel 8.42's HandleExceptions::handleError() converts E_DEPRECATED
// to ErrorException which crashes the app on PHP 8.1+.
// We replace it with a handler that silently ignores deprecations.
// ===================================================================
set_error_handler(function ($level, $message, $file = '', $line = 0) {
    if ($level === E_DEPRECATED || $level === E_USER_DEPRECATED) {
        return true; // Swallow deprecation notices
    }
    // For all other errors, throw ErrorException (Laravel default behavior)
    if (error_reporting() & $level) {
        throw new \ErrorException($message, 0, $level, $file, $line);
    }
    return true;
});

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
