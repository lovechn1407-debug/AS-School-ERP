<?php

// Intercept and suppress PHP 8.1+ deprecation warnings globally
set_error_handler(function ($level, $message, $file = '', $line = 0) {
    if ($level === E_DEPRECATED || $level === E_USER_DEPRECATED) {
        return true;
    }
    return false;
});

error_reporting(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED);
ini_set('error_reporting', (string)(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED));

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

// Re-enforce deprecation suppression after Laravel bootstraps HandleExceptions
set_error_handler(function ($level, $message, $file = '', $line = 0) {
    if ($level === E_DEPRECATED || $level === E_USER_DEPRECATED) {
        return true;
    }
    return false;
});

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
