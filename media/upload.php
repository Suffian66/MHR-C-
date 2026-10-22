
<?php

// Return JSON responses
header("Content-Type: application/json; charset=UTF-8");

// Allow requests from your website.
// Change this if your admin panel uses a different origin.
header("Access-Control-Allow-Origin: https://www.magichammerrenovations.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle CORS preflight requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

// Do not expose PHP errors to visitors
error_reporting(E_ALL);
ini_set("display_errors", "0");

// Send a consistent JSON response
function respond(int $status, array $data): void
{
    http_response_code($status);
    echo json_encode($data);
    exit;
}

// Accept POST requests only
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    respond(405, [
        "success" => false,
        "error" => "POST requests only."
    ]);
}

// Check that a file was submitted
if (!isset($_FILES["file"]) || !is_array($_FILES["file"])) {
    respond(400, [
        "success" => false,
        "error" => "No file uploaded."
    ]);
}

$file = $_FILES["file"];

// Check upload errors
if ($file["error"] !== UPLOAD_ERR_OK) {
    $message = "File upload failed.";

    if ($file["error"] === UPLOAD_ERR_INI_SIZE ||
        $file["error"] === UPLOAD_ERR_FORM_SIZE) {
        $message = "The uploaded file exceeds the server's upload limit.";
    }

    respond(400, [
        "success" => false,
        "error" => $message
    ]);
}

// Confirm the temporary upload is valid
if (
    !isset($file["tmp_name"]) ||
    !is_uploaded_file($file["tmp_name"])
) {
    respond(400, [
        "success" => false,
        "error" => "Invalid uploaded file."
    ]);
}

// Set a maximum image size of 5 MB
$maxImageSize = 5 * 1024 * 1024;

// Get the actual MIME type instead of trusting the browser
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $finfo->file($file["tmp_name"]);

if ($mimeType === false) {
    respond(400, [
        "success" => false,
        "error" => "Could not determine the file type."
    ]);
}

// Allowed image types and their safe extensions
$imageTypes = [
    "image/jpeg" => "jpg",
    "image/png"  => "png",
    "image/gif"  => "gif",
    "image/webp" => "webp",
    "image/avif" => "avif"
];

// Enforce the 5 MB limit for images
if (strpos($mimeType, "image/") === 0) {
    if (!isset($imageTypes[$mimeType])) {
        respond(415, [
            "success" => false,
            "error" => "Unsupported image format. Use JPG, PNG, GIF, WebP, or AVIF."
        ]);
    }

    if ($file["size"] > $maxImageSize) {
        respond(413, [
            "success" => false,
            "error" => "Images must not exceed 5 MB."
        ]);
    }

    $extension = $imageTypes[$mimeType];
} else {
    // Allow common video and audio formats used by the Media library.
    // These files do not use the 5 MB image limit.
    $otherTypes = [
        "video/mp4"       => "mp4",
        "video/webm"      => "webm",
        "video/quicktime" => "mov",
        "audio/mpeg"      => "mp3",
        "audio/wav"       => "wav",
        "audio/x-wav"     => "wav",
        "audio/ogg"       => "ogg",
        "audio/mp4"       => "m4a",
        "audio/aac"       => "aac",
        "audio/flac"      => "flac",
        "audio/webm"      => "webm"
    ];

    if (!isset($otherTypes[$mimeType])) {
        respond(415, [
            "success" => false,
            "error" => "This file type is not supported."
        ]);
    }

    $extension = $otherTypes[$mimeType];
}

// Confirm the file size is valid
if ($file["size"] <= 0) {
    respond(400, [
        "success" => false,
        "error" => "The uploaded file is empty."
    ]);
}

// Upload directory: /media/uploads/
$uploadDir = __DIR__ . "/uploads/";

// Create the directory if it does not exist
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true) && !is_dir($uploadDir)) {
        respond(500, [
            "success" => false,
            "error" => "Could not create the upload directory."
        ]);
    }
}

// Generate a unique filename; never use the original filename as a path
$fileName = bin2hex(random_bytes(16)) . "." . $extension;
$targetPath = $uploadDir . $fileName;

// Move the uploaded file into the hosting directory
if (!move_uploaded_file($file["tmp_name"], $targetPath)) {
    respond(500, [
        "success" => false,
        "error" => "Could not save the uploaded file."
    ]);
}

// Return the public URL for storing in Firestore
$fileUrl = "https://www.magichammerrenovations.com/media/uploads/" . $fileName;

respond(200, [
    "success" => true,
    "url" => $fileUrl,
    "fileName" => $fileName,
    "mimeType" => $mimeType,
    "size" => $file["size"]
]);

?>
