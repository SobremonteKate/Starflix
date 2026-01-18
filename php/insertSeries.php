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
        $seriesID = $_POST["seriesID"] ?? "";

        if (!empty($seriesID)) {
            $query = "DELETE FROM series WHERE seriesID = ?";
            $stmt = $conn->prepare($query);

            if ($stmt) {
                $stmt->bind_param("i", $seriesID);
                if ($stmt->execute()) {
                    echo "Series deleted successfully.";
                } else {
                    echo "Failed to delete Series: " . $stmt->error;
                }
                $stmt->close();
            } else {
                echo "Failed to prepare the query: " . $conn->error;
            }
        } else {
            echo "Series ID is required to delete.";
        }
    }
    // UPDATE function
    elseif (isset($_POST["update"])) {
        $seriesID = $_POST["seriesID"] ?? "";
        $seriesName = $_POST["seriesName"] ?? "";
        $genre = $_POST["genre"] ?? "";
        $finalreleaseDate = $_POST["finalreleaseDate"] ?? "";
        $releaseDate = $_POST["releaseDate"] ?? "";
        $status = $_POST["status"] ?? "";
        $episodeRuntime = $_POST["episodeRuntime"] ?? "";
        $ageRating = $_POST["ageRating"] ?? "";

        if (
            empty($seriesID) ||
            empty($seriesName) ||
            empty($genre) ||
            empty($finalreleaseDate) ||
            empty($releaseDate) ||
            empty($status) ||
            empty($episodeRuntime) ||
            empty($ageRating)
        ) {
            echo "All fields are required for updating.";
            exit();
        }

        $query = "UPDATE series 
                  SET seriesName = ?, genre = ?, finalreleaseDate = ?, releaseDate = ?, status = ?, episodeRuntime = ?, ageRating = ?
                  WHERE seriesID = ?";

        $stmt = $conn->prepare($query);

        if ($stmt) {
            $stmt->bind_param(
                "sssssssi",
                $seriesName,
                $genre,
                $finalreleaseDate,
                $releaseDate,
                $status,
                $episodeRuntime,
                $ageRating,
                $seriesID
            );

            if ($stmt->execute()) {
                echo "Series updated successfully.";
            } else {
                echo "Failed to update Series: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Failed to prepare the query: " . $conn->error;
        }
    }
    // ADD function
    else {
        $seriesName = $_POST["seriesName"] ?? "";
        $genre = $_POST["genre"] ?? "";
        $finalreleaseDate = $_POST["finalreleaseDate"] ?? "";
        $releaseDate = $_POST["releaseDate"] ?? "";
        $status = $_POST["status"] ?? "";
        $episodeRuntime = $_POST["episodeRuntime"] ?? "";
        $ageRating = $_POST["ageRating"] ?? "";

        if (
            empty($seriesName) ||
            empty($genre) ||
            empty($finalreleaseDate) ||
            empty($releaseDate) ||
            empty($status) ||
            empty($episodeRuntime) ||
            empty($ageRating)
        ) {
            echo "All fields are required.";
            exit();
        }

        $query = "INSERT INTO series (seriesName, genre, finalreleaseDate, releaseDate, status, episodeRuntime, ageRating) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($query);

        if ($stmt) {
            $stmt->bind_param(
                "sssssss",
                $seriesName,
                $genre,
                $finalreleaseDate,
                $releaseDate,
                $status,
                $episodeRuntime,
                $ageRating
            );

            if ($stmt->execute()) {
                echo "Series data inserted successfully.";
            } else {
                echo "Failed to insert Series data: " . $stmt->error;
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
