
<?php
declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Magic Hammer Renovations - Dynamic SEO
|--------------------------------------------------------------------------
| Reads page metadata from Firestore and injects it into Vite's index.html.
| Metadata changes in Firestore do not require a frontend rebuild.
*/

const FIREBASE_PROJECT_ID = 'mhrc-43549';

const SITE_URL = 'https://www.magichammerrenovations.com';
const DEFAULT_TITLE = 'Magic Hammer Renovations | Home Renovations in Oakville';
const DEFAULT_DESCRIPTION =
    'Magic Hammer Renovations provides kitchen, bathroom and basement renovations, drywall, home staging and window coverings in Oakville, Ontario.';

$indexFile = __DIR__ . '/index.html';

if (!is_file($indexFile)) {
    http_response_code(500);
    exit('Website HTML file not found.');
}

$html = file_get_contents($indexFile);

if ($html === false) {
    http_response_code(500);
    exit('Unable to load website HTML.');
}

/*
|--------------------------------------------------------------------------
| Route URL to the matching Firestore page slug
|--------------------------------------------------------------------------
| Change the slug values if your Firestore pages use different slugs.
*/

$routeToSlug = [
    '/' => 'home',
    '/about' => 'about',
    '/contact' => 'contact',
    '/portfolio' => 'portfolio',

    // All six service pages
    '/services/kitchen-renovation' => 'kitchen-renovation',
    '/services/bathroom-renovation' => 'bathroom-renovation',
    '/services/basement-renovation' => 'basement-renovation',
    '/services/window-covering' => 'window-covering',
    '/services/drywall' => 'drywall',
    '/services/home-staging' => 'home-staging',
];

$requestPath = parse_url(
    $_SERVER['REQUEST_URI'] ?? '/',
    PHP_URL_PATH
) ?: '/';

if ($requestPath !== '/') {
    $requestPath = rtrim($requestPath, '/');
}

$slug = $routeToSlug[$requestPath]
    ?? basename($requestPath);

if ($requestPath === '/') {
    $slug = 'home';
}

/*
|--------------------------------------------------------------------------
| Firestore REST API helpers
|--------------------------------------------------------------------------
| Unauthenticated requests are subject to your Firestore Security Rules.
| This version is suitable only if public read access to the published
| pages and their sections is already permitted.
*/

function firestoreRequest(
    string $url,
    string $method = 'GET',
    ?array $payload = null
): array {
    if (!function_exists('curl_init')) {
        throw new RuntimeException('PHP cURL extension is not enabled.');
    }

    $ch = curl_init($url);

    $options = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 12,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_HTTPHEADER => [
            'Accept: application/json',
        ],
    ];

    if ($method === 'POST') {
        $options[CURLOPT_POST] = true;
        $options[CURLOPT_HTTPHEADER][] = 'Content-Type: application/json';
        $options[CURLOPT_POSTFIELDS] = json_encode(
            $payload,
            JSON_THROW_ON_ERROR
        );
    }

    curl_setopt_array($ch, $options);

    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);

    curl_close($ch);

    if ($response === false) {
        throw new RuntimeException('Firestore request failed: ' . $error);
    }

    if ($status < 200 || $status >= 300) {
        throw new RuntimeException(
            'Firestore returned HTTP ' . $status . ': ' . $response
        );
    }

    $decoded = json_decode($response, true);

    if (!is_array($decoded)) {
        throw new RuntimeException('Invalid Firestore JSON response.');
    }

    return $decoded;
}

/*
|--------------------------------------------------------------------------
| Convert Firestore REST values into ordinary PHP values
|--------------------------------------------------------------------------
*/

function firestoreValue(array $value): mixed
{
    foreach ([
        'stringValue',
        'integerValue',
        'doubleValue',
        'booleanValue',
        'timestampValue',
        'referenceValue',
        'bytesValue',
    ] as $type) {
        if (array_key_exists($type, $value)) {
            return $value[$type];
        }
    }

    if (array_key_exists('nullValue', $value)) {
        return null;
    }

    if (isset($value['arrayValue'])) {
        $items = $value['arrayValue']['values'] ?? [];

        return array_map(
            fn($item) => firestoreValue($item),
            $items
        );
    }

    if (isset($value['mapValue'])) {
        return firestoreFields(
            $value['mapValue']['fields'] ?? []
        );
    }

    return null;
}

function firestoreFields(array $fields): array
{
    $result = [];

    foreach ($fields as $key => $value) {
        $result[$key] = firestoreValue($value);
    }

    return $result;
}

function plainText(mixed $value): string
{
    if (is_string($value) || is_numeric($value)) {
        return trim((string) $value);
    }

    if (is_array($value)) {
        $items = array_map(
            fn($item) => plainText($item),
            $value
        );

        return trim(implode(', ', array_filter($items)));
    }

    return '';
}

function escapeHtml(string $value): string
{
    return htmlspecialchars(
        $value,
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );
}

/*
|--------------------------------------------------------------------------
| Find the page by its Firestore slug, then load its Meta section
|--------------------------------------------------------------------------
*/

function getPageMetadata(string $slug): array
{
    $projectId = FIREBASE_PROJECT_ID;

    if (
        $projectId === '' ||
        $projectId === 'mhrc-43549'
    ) {
        throw new RuntimeException('Configure FIREBASE_PROJECT_ID first.');
    }

    $base = 'https://firestore.googleapis.com/v1/projects/'
        . rawurlencode($projectId)
        . '/databases/(default)/documents';

    // Find the page document whose slug matches the requested route.
    $queryResponse = firestoreRequest(
        $base . ':runQuery',
        'POST',
        [
            'structuredQuery' => [
                'from' => [
                    ['collectionId' => 'pages'],
                ],
                'where' => [
                    'fieldFilter' => [
                        'field' => ['fieldPath' => 'slug'],
                        'op' => 'EQUAL',
                        'value' => ['stringValue' => $slug],
                    ],
                ],
                'limit' => 1,
            ],
        ]
    );

    $pageDocument = null;

    foreach ($queryResponse as $row) {
        if (isset($row['document'])) {
            $pageDocument = $row['document'];
            break;
        }
    }

    if (!$pageDocument || empty($pageDocument['name'])) {
        throw new RuntimeException('Page not found for slug: ' . $slug);
    }

    // Convert the full document name to its relative path:
    // pages/{pageDocumentId}
    $marker = '/documents/';
    $position = strpos($pageDocument['name'], $marker);

    if ($position === false) {
        throw new RuntimeException('Unexpected Firestore document path.');
    }

    $relativePagePath = substr(
        $pageDocument['name'],
        $position + strlen($marker)
    );

    // Load the sections subcollection for this page.
    $sectionsResponse = firestoreRequest(
        $base . '/' . $relativePagePath . '/sections'
    );

    $metaBlocks = [];

    foreach ($sectionsResponse['documents'] ?? [] as $document) {
        $fields = firestoreFields($document['fields'] ?? []);

        if (strcasecmp((string) ($fields['title'] ?? ''), 'Meta') !== 0) {
            continue;
        }

        $blocks = $fields['content'] ?? [];

        foreach ($blocks as $block) {
            if (!is_array($block)) {
                continue;
            }

            $id = (string) ($block['id'] ?? '');

            if ($id !== '') {
                $metaBlocks[$id] = $block;
            }
        }

        break;
    }

    if (!$metaBlocks) {
        throw new RuntimeException('Meta section not found for: ' . $slug);
    }

    $getBlockText = static function (
        string $id
    ) use ($metaBlocks): string {
        return plainText($metaBlocks[$id]['text'] ?? '');
    };

    return [
        'title' => $getBlockText('heading1'),
        'description' => $getBlockText('paragraph1'),
        'keywords' => $getBlockText('paragraph2'),
        'canonical' => $getBlockText('paragraph3'),
    ];
}

/*
|--------------------------------------------------------------------------
| Read current metadata and prepare safe defaults
|--------------------------------------------------------------------------
*/

$defaultCanonical = 'https://www.magichammerrenovations.com'
    . ($requestPath === '/' ? '/' : $requestPath);

$meta = [
    'title' => DEFAULT_TITLE,
    'description' => DEFAULT_DESCRIPTION,
    'keywords' => '',
    'canonical' => $defaultCanonical,
];

try {
    $firebaseMeta = getPageMetadata($slug);

    foreach (['title', 'description', 'keywords', 'canonical'] as $key) {
        if (!empty($firebaseMeta[$key])) {
            $meta[$key] = $firebaseMeta[$key];
        }
    }
} catch (Throwable $exception) {
    // Keep the website available if Firestore is temporarily unavailable.
    error_log('[MHR SEO] ' . $exception->getMessage());
}

// Only allow canonical URLs on the official website.
if (
    !preg_match(
        '~^https://www\.magichammerrenovations\.com(?:/|$)~i',
        $meta['canonical']
    )
) {
    $meta['canonical'] = $defaultCanonical;
}

$title = escapeHtml($meta['title']);
$description = escapeHtml($meta['description']);
$keywords = escapeHtml($meta['keywords']);
$canonical = escapeHtml($meta['canonical']);

/*
|--------------------------------------------------------------------------
| Replace the existing head metadata with the latest Firestore values
|--------------------------------------------------------------------------
*/

$html = preg_replace(
    '~<title\b[^>]*>.*?</title>\s*~is',
    '',
    $html
) ?? $html;

$html = preg_replace(
    '~<meta\b(?=[^>]*\b(?:name|property)\s*=\s*["\']'
    . '(?:description|keywords|og:title|og:description|og:url|'
    . 'twitter:card|twitter:title|twitter:description)["\'])'
    . '[^>]*>\s*~i',
    '',
    $html
) ?? $html;

$html = preg_replace(
    '~<link\b(?=[^>]*\brel\s*=\s*["\']canonical["\'])'
    . '[^>]*>\s*~i',
    '',
    $html
) ?? $html;

$headMetadata = <<<HTML
<title>{$title}</title>
<meta name="description" content="{$description}">
HTML;

if ($keywords !== '') {
    $headMetadata .= "\n<meta name=\"keywords\" content=\"{$keywords}\">";
}

$headMetadata .= <<<HTML

<link rel="canonical" href="{$canonical}">
<meta property="og:title" content="{$title}">
<meta property="og:description" content="{$description}">
<meta property="og:url" content="{$canonical}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{$title}">
<meta name="twitter:description" content="{$description}">
HTML;

if (stripos($html, '</head>') !== false) {
    $html = preg_replace(
        '~</head>~i',
        $headMetadata . "\n</head>",
        $html,
        1
    ) ?? $html;
}

header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-cache, must-revalidate');

echo $html;