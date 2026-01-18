<?php
session_start();
require_once 'dbconn1.php';

$config = new Config();
$conn = $config->conn;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// get the movie id from the request
$data = json_decode(file_get_contents('php://input'), true);
$movieID = $data['movieID'] ?? null;

if ($movieID) {
    $query = "DELETE FROM movies WHERE movieID = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param('i', $movieID); // i for integer
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete Movie']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare delete query']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No Movie ID provided']);
}

$conn->close();
?>
