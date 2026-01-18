<?php
session_start();
require_once 'dbconn1.php';

$config = new Config();
$conn = $config->conn;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the User ID from the request 
$data = json_decode(file_get_contents('php://input'), true);
$userID = $data['userID'] ?? null;

if ($userID) {
    $query = "DELETE FROM users WHERE userID = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param('i', $userID);
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete User']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare delete query']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No User ID provided']);
}

$conn->close();
?>
