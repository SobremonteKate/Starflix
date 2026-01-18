<?php
session_start();
require_once 'dbconn1.php'; 

$config = new Config();
$conn = $config->conn;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data for all users 
$query = "SELECT userID, firstName, lastName, userName, contactNum, email, subs, payment, status FROM users";
$result = $conn->query($query);

$data = [];

if ($result->num_rows > 0) {
    // Store the user data in the array
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    $data = [];
}

// Get count of active users (status = 'active')
$activeUserQuery = "SELECT COUNT(*) AS activeCount FROM users WHERE status = 'active'";  // Modify as needed based on your status field value
$activeResult = $conn->query($activeUserQuery);
$activeUserCount = 0;

if ($activeResult->num_rows > 0) {
    $row = $activeResult->fetch_assoc();
    $activeUserCount = $row['activeCount'];
}

$conn->close();

// Return the full user data along with active user count
echo json_encode([
    'users' => $data,
    'activeUserCount' => $activeUserCount
]);
?>
