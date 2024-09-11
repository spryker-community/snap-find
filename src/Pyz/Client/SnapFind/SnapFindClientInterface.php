<?php

declare(strict_types = 1);

namespace Pyz\Client\SnapFind;

use Symfony\Component\HttpFoundation\File\UploadedFile;

interface SnapFindClientInterface
{
    /**
     * @param \Symfony\Component\HttpFoundation\File\UploadedFile $image
     * @return string
     */
    public function getSearchQueryByImage(UploadedFile $image): string;
}
