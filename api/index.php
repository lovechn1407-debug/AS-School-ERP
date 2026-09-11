<?php

// ===================================================================
// CRITICAL: Suppress PHP 8.1+ deprecation notices BEFORE everything.
// Laravel 8.42 is not PHP 8.1+ compatible (missing #[ReturnTypeWillChange]).
// We must prevent E_DEPRECATED from being converted to ErrorException.
// ===================================================================
error_reporting(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED);
ini_set('error_reporting', (string)(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED));
ini_set('display_errors', '0');

// Ensure essential storage folders exist in serverless /tmp environment
$storageDirs = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/logs',
    '/tmp/storage/app/public',
];

foreach ($storageDirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
}

putenv('VIEW_COMPILED_PATH=/tmp/storage/framework/views');

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
