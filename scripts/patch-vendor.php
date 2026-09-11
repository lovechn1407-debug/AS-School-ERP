<?php

/**
 * Patch vendor files for PHP 8.1+ compatibility.
 *
 * This script runs after `composer install` to fix known
 * incompatibilities in locked dependency versions.
 *
 * Safe to run in Vercel build environment (no DB, no Laravel bootstrap).
 */

$patches = [
    // Carbon: DateTime::getLastErrors() returns false on PHP 8.2 (was array on PHP 7/8.0)
    'vendor/nesbot/carbon/src/Carbon/Traits/Creator.php' => [
        'static::setLastErrors(parent::getLastErrors());' =>
        'static::setLastErrors(parent::getLastErrors() ?: []);',
    ],
];

$basePath = dirname(__DIR__);

foreach ($patches as $file => $replacements) {
    $filePath = $basePath . '/' . $file;
    if (!file_exists($filePath)) {
        echo "  [SKIP] $file (not found)\n";
        continue;
    }

    $content = file_get_contents($filePath);
    $changed = false;

    foreach ($replacements as $search => $replace) {
        if (strpos($content, $search) !== false) {
            $content = str_replace($search, $replace, $content);
            $changed = true;
            echo "  [PATCH] $file: applied fix\n";
        } else {
            echo "  [OK] $file: already patched or pattern not found\n";
        }
    }

    if ($changed) {
        file_put_contents($filePath, $content);
    }
}

echo "Vendor patching complete.\n";
