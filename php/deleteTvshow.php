<?php
session_start();
require_once 'dbconn1.php';

$config = new Config();
$conn = $config->conn;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// get the tv id from the request 
$data = json_decode(file_get_contents('php://input'), true);
$tvID = $data['tvID'] ?? null;

if ($tvID) {
    $query = "DELETE FROM tvshow WHERE tvID = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param('i', $tvID); 
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete TV show']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare delete query']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No TV ID provided']);
}

$conn->close();
?>
