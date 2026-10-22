
<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://www.magichammerrenovations.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

function respond(int $status, array $data): void {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    respond(405, [
        "success" => false,
        "message" => "POST requests only."
    ]);
}

$fileName = $_GET["file"] ?? "";

if (
    !is_string($fileName) ||
    $fileName === "" ||
    basename($fileName) !== $fileName ||
    !preg_match('/^[a-zA-Z0-9_.-]+$/', $fileName)
) {
    respond(400, [
        "success" => false,
        "message" => "Invalid filename."
    ]);
}

/* Same directory used by upload.php */
$uploadDir = __DIR__ . "/uploads/";
$filePath = $uploadDir . $fileName;

if (!is_file($filePath)) {
    respond(404, [
        "success" => false,
        "message" => "File not found."
    ]);
}

if (!unlink($filePath)) {
    respond(500, [
        "success" => false,
        "message" => "Could not delete the file."
    ]);
}

respond(200, [
    "success" => true,
    "message" => "File deleted successfully."
]);
?>
