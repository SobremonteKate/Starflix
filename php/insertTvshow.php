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
        $tvID = $_POST["tvID"] ?? "";

        if (!empty($tvID)) {
            $query = "DELETE FROM tvshow WHERE tvID = ?";
            $stmt = $conn->prepare($query);

            if ($stmt) {
                $stmt->bind_param("i", $tvID);
                if ($stmt->execute()) {
                    echo "TV Show deleted successfully.";
                } else {
                    echo "Failed to delete TV Show: " . $stmt->error;
                }
                $stmt->close();
            } else {
                echo "Failed to prepare the query: " . $conn->error;
            }
        } else {
            echo "TV Show ID is required to delete.";
        }
    }
    // UPDATE function
    elseif (isset($_POST["update"])) {
        $tvID = $_POST["tvID"] ?? "";
        $showName = $_POST["showName"] ?? "";
        $genre = $_POST["genre"] ?? "";
        $finalreleaseDate = $_POST["finalreleaseDate"] ?? "";
        $releaseDate = $_POST["releaseDate"] ?? "";
        $status = $_POST["status"] ?? "";
        $episodeRuntime = $_POST["episodeRuntime"] ?? "";
        $ageRating = $_POST["ageRating"] ?? "";

        if (
            empty($tvID) ||
            empty($showName) ||
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

        $query = "UPDATE tvshow 
                  SET showName = ?, genre = ?, finalreleaseDate = ?, releaseDate = ?, status = ?, episodeRuntime = ?, ageRating = ?
                  WHERE tvID = ?";

        $stmt = $conn->prepare($query);

        if ($stmt) {
            $stmt->bind_param(
                "sssssssi",
                $showName,
                $genre,
                $finalreleaseDate,
                $releaseDate,
                $status,
                $episodeRuntime,
                $ageRating,
                $tvID
            );

            if ($stmt->execute()) {
                echo "TV Show updated successfully.";
            } else {
                echo "Failed to update TV Show: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Failed to prepare the query: " . $conn->error;
        }
    }
    // ADD function
    else {
        $showName = $_POST["showName"] ?? "";
        $genre = $_POST["genre"] ?? "";
        $finalreleaseDate = $_POST["finalreleaseDate"] ?? "";
        $releaseDate = $_POST["releaseDate"] ?? "";
        $status = $_POST["status"] ?? "";
        $episodeRuntime = $_POST["episodeRuntime"] ?? "";
        $ageRating = $_POST["ageRating"] ?? "";

        if (
            empty($showName) ||
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

        $query = "INSERT INTO tvshow (showName, genre, finalreleaseDate, releaseDate, status, episodeRuntime, ageRating) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($query);

        if ($stmt) {
            $stmt->bind_param(
                "sssssss",
                $showName,
                $genre,
                $finalreleaseDate,
                $releaseDate,
                $status,
                $episodeRuntime,
                $ageRating
            );

            if ($stmt->execute()) {
                echo "TV Show data inserted successfully.";
            } else {
                echo "Failed to insert TV Show data: " . $stmt->error;
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
