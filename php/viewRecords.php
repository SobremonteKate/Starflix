<?php
session_start();
require_once "dbconn1.php";

$config = new Config();
$conn = $config->conn;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// kukuhain yung records with pagination (yung next prev, tapos 123 function)
$limit = isset($_GET["limit"]) ? (int) $_GET["limit"] : 10;
$page = isset($_GET["page"]) ? (int) $_GET["page"] : 1;
$offset = ($page - 1) * $limit;

$query = "SELECT userID, firstName, lastName, userName, contactNum, email, subs, payment, status FROM users LIMIT $limit OFFSET $offset";
$result = $conn->query($query);

$totalRecordsQuery = "SELECT COUNT(*) AS total FROM users";
$totalRecordsResult = $conn->query($totalRecordsQuery);
$totalRecords = mysqli_fetch_assoc($totalRecordsResult)["total"];
$totalPages = ceil($totalRecords / $limit);

$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    $data = [];
}

$conn->close();

// Return yung data into JSON format
echo json_encode(["users" => $data, "totalPages" => $totalPages]);
?>
