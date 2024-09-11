# Snap Find for Spryker (Hackathon Project)
Created by
- David Wischner [kontakt@david-wischner](mailto:kontakt@david-wischner)
- Lukas
- Felicia

## Description

Snap Find allows the user to find a product via taking a picture of something related

## Snap Find quick start

This section describes how to get started with Snap Find quickly.

### Installing Snap Find

We have been using the B2B Demo Shop as starting position
To set up the extended B2B Demo Shop and its environment, do the following:

1. Create a project folder and navigate into it:
```bash
mkdir spryker-snap-find && cd spryker-snap-find
```

2. Clone the project:
```bash
git clone https://github.com/spryker-community/snap-find.git ./
```

3. Clone the Docker SDK:
```bash
git clone git@github.com:spryker/docker-sdk.git docker
```

#### Setting up a development environment

1. Bootstrap the docker setup:

```bash
docker/sdk boot deploy.dev.yml
```

2. If the command you've run in the previous step returned instructions, follow them.

3. Build and start the instance:
```bash
docker/sdk up
```

#### Configure GEMINI-API
- Get API-Key here: https://aistudio.google.com/app/apikey
- Copy config_local.dist.php
```bash
cp config/Shared/config_local.dist.php config/Shared/config_local.php
```
- configure API-Key in your config_local
```php
$config[SnapFindConstants::GEMINI_API_KEY] = 'abcabcabcabcabcabcabcabc';
```
- OPTIONAL: configure custom endpoint to fulfill your requests (since the endpoint contains the used version, you might want to change it to the latest one)
```php
$config[SnapFindConstants::GEMINI_HOST_ENDPOINT] = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
```

Congratulations, you've successfully set up *Snap Find* and can access http://yves.de.spryker.local/ to play around with the example implementation (use the camera icon right next to the search bar).

PLEASE NOTE: If your camera is not requested, you have to enable camera usage in your browser settings for insecure pages.
Chrome: chrome://flags/#unsafely-treat-insecure-origin-as-secure (add http://yves.de.spryker.local/ , enable the option and restart the browser)
