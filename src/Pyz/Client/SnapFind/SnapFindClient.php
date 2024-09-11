<?php

declare(strict_types = 1);

namespace Pyz\Client\SnapFind;

use GuzzleHttp\Exception\GuzzleException;
use Spryker\Client\Kernel\AbstractClient;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;

/**
 * @method \Pyz\Client\SnapFind\SnapFindFactory getFactory()
 */
class SnapFindClient extends AbstractClient implements SnapFindClientInterface
{
    /**
     * @param \Symfony\Component\HttpFoundation\File\UploadedFile $image
     * @return string
     */
    public function getSearchQueryByImage(UploadedFile $image): string
    {
        $guzzleClient = $this->getFactory()->createGuzzleClient();
        $base64Image = base64_encode($image->getContent());

        try {
            $response = $guzzleClient->post($this->getFactory()->getConfig()->getAiRequestUri(), [
                'json' => [
                    'contents' => [
                        [
                            'parts' => [
                                [
                                    'text' => 'As e commerce user give the best search string to look for when searching the product given in the image. Only return the search string to enter, no further explanation or any other text.',
                                ],
                                [
                                    'inline_data' => [
                                        'mime_type' => 'image/jpeg',
                                        'data' => $base64Image,
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ]);

            if ($response->getStatusCode() === Response::HTTP_OK) {
                $responseData = json_decode($response->getBody()->getContents(), true);

                return $responseData['candidates'][0]['content']['parts'][0]['text'] ?? '';
            }

            return '';
        } catch (GuzzleException $guzzleException) {
            return '';
        }
    }
}
