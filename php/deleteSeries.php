<?php
session_start();
require_once 'dbconn1.php';

$config = new Config();
$conn = $config->conn;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

 // get the series id from the request
$data = json_decode(file_get_contents('php://input'), true);
$seriesID = $data['seriesID'] ?? null;

if ($seriesID) {
    $query = "DELETE FROM series WHERE seriesID = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param('i', $seriesID);
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to Series']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare delete query']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No Series ID provided']);
}

$conn->close();
?>
