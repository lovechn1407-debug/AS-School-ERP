<?php

// Force HTTPS for Vercel serverless environment to prevent Mixed Content blocking
$_SERVER['HTTPS'] = 'on';
$_SERVER['SERVER_PORT'] = 443;
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO'])) {
    $_SERVER['HTTP_X_FORWARDED_PROTO'] = 'https';
}

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

// ===================================================================
// RUNTIME PATCH: Carbon's Creator trait for PHP 8.2 compatibility.
// In PHP 8.2, DateTime::getLastErrors() returns false (not array) when
// there are no errors. Old Carbon versions call setLastErrors(array) with
// false, causing TypeError.
// We pre-load the patched Creator trait directly AFTER vendor/autoload.php
// so it is in memory before Carbon::now() or any Carbon class is used.
// ===================================================================
$carbonCreatorPath = __DIR__ . '/../vendor/nesbot/carbon/src/Carbon/Traits/Creator.php';
if (file_exists($carbonCreatorPath) && !trait_exists('Carbon\\Traits\\Creator', false)) {
    $patchedCreatorFile = '/tmp/carbon_creator_patched.php';
    if (!file_exists($patchedCreatorFile)) {
        $content = file_get_contents($carbonCreatorPath);
        // Fix setLastErrors method signature to drop strict array typehint
        $content = str_replace(
            'public static function setLastErrors(array $lastErrors)',
            'public static function setLastErrors($lastErrors)',
            $content
        );
        // Ensure static::$lastErrors is always an array
        $content = str_replace(
            'static::$lastErrors = $lastErrors;',
            'static::$lastErrors = is_array($lastErrors) ? $lastErrors : [];',
            $content
        );
        // Safely wrap parent::getLastErrors() calls
        $content = str_replace(
            'static::setLastErrors(parent::getLastErrors());',
            'static::setLastErrors(parent::getLastErrors() ?: []);',
            $content
        );
        $content = str_replace(
            'static::setLastErrors(parent::getLastErrors())',
            'static::setLastErrors(parent::getLastErrors() ?: [])',
            $content
        );
        file_put_contents($patchedCreatorFile, $content);
    }
    if (file_exists($patchedCreatorFile)) {
        require_once $patchedCreatorFile;
    }
}

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

try {
    $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

    $response = $kernel->handle(
        $request = Illuminate\Http\Request::capture()
    );

    $response->send();

    $kernel->terminate($request, $response);
} catch (\Throwable $e) {
    http_response_code(500);
    echo "<h1>Runtime Exception</h1>";
    echo "<h3>" . get_class($e) . ": " . htmlspecialchars($e->getMessage()) . "</h3>";
    echo "<p>in <b>" . htmlspecialchars($e->getFile()) . "</b> on line <b>" . $e->getLine() . "</b></p>";
    echo "<pre style='background:#f4f4f4;padding:15px;border-radius:5px;'>" . htmlspecialchars($e->getTraceAsString()) . "</pre>";
}
