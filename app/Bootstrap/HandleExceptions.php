<?php

namespace App\Bootstrap;

use Illuminate\Foundation\Bootstrap\HandleExceptions as BaseHandleExceptions;

/**
 * Custom HandleExceptions bootstrapper for PHP 8.1+ compatibility.
 *
 * Laravel 8.42 does not have #[ReturnTypeWillChange] attributes,
 * so E_DEPRECATED notices from ArrayAccess/Countable/etc. must be
 * suppressed to prevent fatal ErrorExceptions.
 */
class HandleExceptions extends BaseHandleExceptions
{
    /**
     * Override the error handler to silently ignore deprecation notices.
     */
    public function handleError($level, $message, $file = '', $line = 0, $context = [])
    {
        if ($level === E_DEPRECATED || $level === E_USER_DEPRECATED) {
            return; // Silently swallow deprecation notices
        }

        parent::handleError($level, $message, $file, $line, $context);
    }
}
