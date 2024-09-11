<?php

declare(strict_types = 1);

namespace Pyz\Client\SnapFind;

use GuzzleHttp\Client;
use GuzzleHttp\ClientInterface;
use Spryker\Client\Kernel\AbstractFactory;

/**
 * @method \Pyz\Client\SnapFind\SnapFindConfig getConfig()
 */
class SnapFindFactory extends AbstractFactory
{
    /**
     * @return ClientInterface
     */
    public function createGuzzleClient(): ClientInterface
    {
        return new Client();
    }

}
