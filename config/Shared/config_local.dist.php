<?php

use Pyz\Shared\SnapFind\SnapFindConstants;

// ----------------------------------------------------------------------------
// ---------------------------- SNAP FIND -------------------------------------
// ----------------------------------------------------------------------------
$config[SnapFindConstants::GEMINI_API_KEY] = 'FILL_IN_YOUR_GEMINI_API_KEY_HERE';
// you might want to change this to the latest endpoint
$config[SnapFindConstants::GEMINI_HOST_ENDPOINT] = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
