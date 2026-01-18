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
        $userID = $_POST["userID"] ?? "";

        if (!empty($userID)) {
            $query = "DELETE FROM users WHERE userID = ?";
            $stmt = $conn->prepare($query);

            if ($stmt) {
                $stmt->bind_param("i", $userID); // 'i' for integer
                if ($stmt->execute()) {
                    echo "User deleted successfully.";
                } else {
                    echo "Failed to delete User: " . $stmt->error;
                }
                $stmt->close();
            } else {
                echo "Failed to prepare the query: " . $conn->error;
            }
        } else {
            echo "User ID is required to delete.";
        }
    }
    // UPDATE function
    elseif (isset($_POST["update"])) {
        $userID = $_POST["userID"] ?? "";
        $firstName = $_POST["firstName"] ?? "";
        $lastName = $_POST["lastName"] ?? "";
        $userName = $_POST["userName"] ?? "";
        $contactNum = $_POST["contactNum"] ?? "";
        $email = $_POST["email"] ?? "";
        $subs = $_POST["subs"] ?? "Basic"; // Default to 'Basic'
        $payment = $_POST["payment"] ?? "Credit Card"; // Default to 'Credit Card'
        $status = $_POST["status"] ?? "Active"; // Default to 'Active'

        if (
            empty($userID) ||
            empty($firstName) ||
            empty($lastName) ||
            empty($userName) ||
            empty($contactNum) ||
            empty($email) ||
            empty($subs) ||
            empty($payment) ||
            empty($status)
        ) {
            echo "All fields are required for updating.";
            exit();
        }

        $query = "UPDATE users 
                  SET firstName = ?, lastName = ?, userName = ?, contactNum = ?, email = ?, subs = ?, payment = ?, status = ?
                  WHERE userID = ?";

        $stmt = $conn->prepare($query);

        if ($stmt) {
            $stmt->bind_param(
                "ssssssssi",
                $firstName,
                $lastName,
                $userName,
                $contactNum,
                $email,
                $subs,
                $payment,
                $status,
                $userID
            );

            if ($stmt->execute()) {
                echo "User updated successfully.";
            } else {
                echo "Failed to update User: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Failed to prepare the query: " . $conn->error;
        }
    }
    // ADD function
    else {
        $firstName = $_POST["firstName"] ?? "";
        $lastName = $_POST["lastName"] ?? "";
        $userName = $_POST["userName"] ?? "";
        $contactNum = $_POST["contactNum"] ?? "";
        $email = $_POST["email"] ?? "";
        $subs = $_POST["subs"] ?? "Basic"; // Default to 'Basic'
        $payment = $_POST["payment"] ?? "Credit Card"; // Default to 'Credit Card'
        $status = $_POST["status"] ?? "Active"; // Default to 'Active'

        if (
            empty($firstName) ||
            empty($lastName) ||
            empty($userName) ||
            empty($contactNum) ||
            empty($email) ||
            empty($subs) ||
            empty($payment) ||
            empty($status)
        ) {
            echo "All fields are required.";
            exit();
        }

        $query = "INSERT INTO users (firstName, lastName, userName, contactNum, email, subs, payment, status) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($query);

        if ($stmt) {
            $stmt->bind_param(
                "ssssssss",
                $firstName,
                $lastName,
                $userName,
                $contactNum,
                $email,
                $subs,
                $payment,
                $status
            );

            if ($stmt->execute()) {
                echo "User data inserted successfully.";
            } else {
                echo "Failed to insert User data: " . $stmt->error;
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
