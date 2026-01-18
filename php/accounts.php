<?php
session_start();
require_once "dbconn1.php";

$config = new Config();
$conn = $config->conn;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // UPDATE function
    if (isset($_POST["update"])) {
        $accountID = $_POST["accountID"] ?? "";
        $fname = $_POST["fname"] ?? "";
        $lname = $_POST["lname"] ?? "";
        $email = $_POST["email"] ?? "";
        $password = $_POST["password"] ?? "";

        if (
            empty($accountID) ||
            empty($fname) ||
            empty($lname) ||
            empty($email)
        ) {
            echo "All fields are required for updating.";
            exit();
        }

        // hash yung password
        $hashedPassword = !empty($password)
            ? password_hash($password, PASSWORD_DEFAULT)
            : null;

        // update query lang
        if ($hashedPassword) {
            $query = "UPDATE accounts 
                      SET fname = ?, lname = ?, email = ?, password = ?
                      WHERE accountID = ?";

            $stmt = $conn->prepare($query);

            if ($stmt) {
                $stmt->bind_param(
                    "ssssi",
                    $fname,
                    $lname,
                    $email,
                    $hashedPassword,
                    $accountID
                );
            }
        } else {
            $query = "UPDATE accounts 
                      SET fname = ?, lname = ?, email = ?
                      WHERE accountID = ?";

            $stmt = $conn->prepare($query);

            if ($stmt) {
                $stmt->bind_param("sssi", $fname, $lname, $email, $accountID);
            }
        }

        if ($stmt) {
            if ($stmt->execute()) {
                echo "Account updated successfully.";
            } else {
                echo "Failed to update Account: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Failed to prepare the query: " . $conn->error;
        }
    }
    // ADD function
    elseif (isset($_POST["regisNewAcc"])) {
        $fname = $_POST["fname"] ?? "";
        $lname = $_POST["lname"] ?? "";
        $email = $_POST["email"] ?? "";
        $password = $_POST["password"] ?? "";

        if (
            empty($fname) ||
            empty($lname) ||
            empty($email) ||
            empty($password)
        ) {
            echo "All fields are required.";
            exit();
        }

        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $query = "INSERT INTO accounts (fname, lname, email, password) 
                  VALUES (?, ?, ?, ?)";

        $stmt = $conn->prepare($query);

        if ($stmt) {
            $stmt->bind_param("ssss", $fname, $lname, $email, $hashedPassword);

            if ($stmt->execute()) {
                $lastInsertedID = $conn->insert_id;
                echo json_encode([
                    "status" => "success",
                    "message" => "Account created successfully",
                    "accountID" => $lastInsertedID,
                ]);
            } else {
                echo json_encode([
                    "status" => "error",
                    "message" => "Failed to create account: " . $stmt->error,
                ]);
            }

            $stmt->close();
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to prepare the query: " . $conn->error,
            ]);
        }
    } else {
        echo "Invalid request.";
    }
} else {
    echo "Invalid request method.";
}

$conn->close();
?>
