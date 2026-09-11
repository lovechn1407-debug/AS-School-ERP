<?php
/**
 * This script patches Illuminate\Foundation\Bootstrap\HandleExceptions
 * to NOT convert E_DEPRECATED warnings into ErrorExceptions.
 *
 * This is required for Laravel 8 running on PHP 8.1+
 * (e.g. Vercel serverless with vercel-php@0.7.x).
 */

$file = __DIR__ . '/vendor/laravel/framework/src/Illuminate/Foundation/Bootstrap/HandleExceptions.php';

if (!file_exists($file)) {
    echo "HandleExceptions.php not found, skipping patch.\n";
    exit(0);
}

$content = file_get_contents($file);

// Check if already patched
if (str_contains($content, '// PATCHED: Skip E_DEPRECATED')) {
    echo "HandleExceptions.php already patched.\n";
    exit(0);
}

// The original handleError method throws on all $level values that are in error_reporting().
// We patch it to return false (ignore) for E_DEPRECATED and E_USER_DEPRECATED.
$search = 'public function handleError($level, $message, $file = \'\', $line = 0, $context = [])';
$patch = 'public function handleError($level, $message, $file = \'\', $line = 0, $context = [])
    {
        // PATCHED: Skip E_DEPRECATED and E_USER_DEPRECATED to fix PHP 8.1+ incompatibility
        if ($level === E_DEPRECATED || $level === E_USER_DEPRECATED) {
            return false;
        }';

if (!str_contains($content, $search)) {
    // Try alternative signature (some versions use different spacing)
    echo "Could not find handleError signature to patch in HandleExceptions.php\n";
    exit(0);
}

// Replace the function opening to insert the early return
$content = preg_replace(
    '/public function handleError\(\$level, \$message, \$file = \'\', \$line = 0, \$context = \[\]\)\s*\{/',
    "public function handleError(\$level, \$message, \$file = '', \$line = 0, \$context = [])
    {
        // PATCHED: Skip E_DEPRECATED and E_USER_DEPRECATED to fix PHP 8.1+ incompatibility with Laravel 8
        if (\$level === E_DEPRECATED || \$level === E_USER_DEPRECATED) {
            return false;
        }",
    $content
);

file_put_contents($file, $content);
echo "Successfully patched HandleExceptions.php to suppress PHP 8.1+ deprecation exceptions.\n";
