<?php

// Forward Vercel requests to Laravel public/index.php

// Ensure essential storage folders exist in serverless /tmp environment
$storageDirs = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/logs',
];

foreach ($storageDirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

// Set environment variables for storage paths if not explicitly provided
if (!getenv('VIEW_COMPILED_PATH')) {
    putenv('VIEW_COMPILED_PATH=/tmp/storage/framework/views');
}

require __DIR__ . '/../public/index.php';
