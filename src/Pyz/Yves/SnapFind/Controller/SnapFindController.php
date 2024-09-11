<?php

declare(strict_types=1);

namespace Pyz\Yves\SnapFind\Controller;

use Spryker\Yves\Kernel\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * @method \Pyz\Yves\SnapFind\SnapFindFactory getFactory()
 * @method \Pyz\Client\SnapFind\SnapFindClientInterface getClient()()
 */
class SnapFindController extends AbstractController
{
    /**
     * @var string
     */
    private const ROUTE_SEARCH = 'search';

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Spryker\Yves\Kernel\View\View|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $imageUploadForm = $this
            ->getFactory()
            ->createSnapFindFormFactory()
            ->getImageUploadForm()
            ->handleRequest($request);

        if ($imageUploadForm->isSubmitted() && $imageUploadForm->isValid()) {
            $searchQuery = $this->getSearchQueryByImage($imageUploadForm->getData());

            if (!empty($searchQuery)) {
                $route = static::ROUTE_SEARCH;

                return $this->redirectResponseInternal($route, ['q' => $searchQuery]);
            }
            // todo add some error handling
        }

        return $this->view(
            [
                'message' => 'yves action',
                'form' => $imageUploadForm->createView(),
            ],
            [],
            '@SnapFind/views/index.twig',
        );
    }

    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function apiAction(Request $request): Response
    {
        return $this->jsonResponse(
            [
                'message' => 'yves action',
            ],
        );
    }

    /**
     * @param $formData
     * @return string
     */
    private function getSearchQueryByImage($formData): string
    {
        /** @var \Symfony\Component\HttpFoundation\File\UploadedFile $image */
        $image = $formData['image'];
        /**
         * send data to ai, get useful keywords to find the product
         */
        return $this->getClient()->getSearchQueryByImage($image);
    }
}
