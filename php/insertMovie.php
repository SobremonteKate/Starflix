<?php

session_start();
require_once "dbconn1.php";

$config = new Config();
$conn = $config->conn;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // DELETE function
    if (isset($_POST["delete"])) {
        $movieID = $_POST["movieID"] ?? "";

        if (!empty($movieID)) {
            $query = "DELETE FROM movies WHERE movieID = ?";
            $stmt = $conn->prepare($query);

            if ($stmt) {
                $stmt->bind_param("i", $movieID);
                if ($stmt->execute()) {
                    echo "Movie deleted successfully.";
                } else {
                    echo "Failed to delete Movie: " . $stmt->error;
                }
                $stmt->close();
            } else {
                echo "Failed to prepare the query: " . $conn->error;
            }
        } else {
            echo "Movie ID is required to delete.";
        }
    }
    // UPDATE function
    elseif (isset($_POST["update"])) {
        $movieID = $_POST["movieID"] ?? "";
        $movieName = $_POST["movieName"] ?? "";
        $genre = $_POST["genre"] ?? "";
        $releaseDate = $_POST["releaseDate"] ?? "";
        $duration = $_POST["duration"] ?? "";
        $ageRating = $_POST["ageRating"] ?? "";

        if (
            empty($movieID) ||
            empty($movieName) ||
            empty($genre) ||
            empty($releaseDate) ||
            empty($duration) ||
            empty($ageRating)
        ) {
            echo "All fields are required for updating.";
            exit();
        }

        $query = "UPDATE movies 
                  SET movieName = ?, genre = ?, releaseDate = ?, duration = ?, ageRating = ?
                  WHERE movieID = ?";

        $stmt = $conn->prepare($query);

        if ($stmt) {
            $stmt->bind_param(
                "sssssi",
                $movieName,
                $genre,
                $releaseDate,
                $duration,
                $ageRating,
                $movieID
            );

            if ($stmt->execute()) {
                echo "Movie updated successfully.";
            } else {
                echo "Failed to update Movie: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Failed to prepare the query: " . $conn->error;
        }
    }
    // ADD function
    else {
        $movieName = $_POST["movieName"] ?? "";
        $genre = $_POST["genre"] ?? "";
        $releaseDate = $_POST["releaseDate"] ?? "";
        $duration = $_POST["duration"] ?? "";
        $ageRating = $_POST["ageRating"] ?? "";

        if (
            empty($movieName) ||
            empty($genre) ||
            empty($releaseDate) ||
            empty($duration) ||
            empty($ageRating)
        ) {
            echo "All fields are required.";
            exit();
        }

        $query = "INSERT INTO movies (movieName, genre, releaseDate, duration, ageRating) 
                  VALUES (?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($query);

        if ($stmt) {
            $stmt->bind_param(
                "sssss",
                $movieName,
                $genre,
                $releaseDate,
                $duration,
                $ageRating
            );

            if ($stmt->execute()) {
                echo "Movie data inserted successfully.";
            } else {
                echo "Failed to insert Movie data: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Failed to prepare the query: " . $conn->error;
        }
    }
} else {
    echo "Invalid request method.";
}

$conn->close();

?>
