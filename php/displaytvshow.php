<?php
session_start();
require_once 'dbconn1.php'; 

$config = new Config();
$conn = $config->conn;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// get data
$query = "SELECT tvID, showName, genre, finalreleaseDate, releaseDate, episodeRuntime, status, ageRating FROM tvshow";
$result = $conn->query($query);

$data = [];

if ($result->num_rows > 0) {
    // store yung data sa array
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    $data = [];
}

$conn->close();


echo json_encode($data);
?>
