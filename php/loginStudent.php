<?php
session_start();
require "dbconn1.php";

class LoginStudent
{
    //dito ichecheck if nage-exist ba yung account bago makapasok
    public function checkUser($email)
    {
        error_reporting(E_ERROR);
        $config = new Config();
        $conn = $config->conn;

        if ($conn->connect_error) {
            return $conn->connect_error;
        } else {
            $query = "SELECT email FROM accounts WHERE email = ?";

            if ($stmt = $conn->prepare($query)) {
                $stmt->bind_param("s", $email);

                if ($stmt->execute()) {
                    $stmt->bind_result($result_email);
                    $stmt->store_result();

                    $result =
                        $stmt->num_rows > 0 ? "USER_FOUND" : "USER_NOT_FOUND";
                    $stmt->close();
                    return $result;
                } else {
                    return $stmt->error;
                }
            } else {
                return $conn->error;
            }
            $conn->close();
        }
    }

    //para gumana yung hash password
    public function getHashPassword($email)
    {
        error_reporting(E_ERROR);
        $config = new Config();
        $conn = $config->conn;

        if ($conn->connect_error) {
            return $conn->connect_error;
        } else {
            $query = "SELECT password FROM accounts WHERE email = ?";

            if ($stmt = $conn->prepare($query)) {
                $stmt->bind_param("s", $email);

                if ($stmt->execute()) {
                    $stmt->bind_result($password);
                    $stmt->store_result();

                    if ($stmt->num_rows > 0) {
                        $stmt->fetch();
                        $stmt->close();
                        return $password;
                    }
                    $stmt->close();
                } else {
                    return $stmt->error;
                }
            } else {
                return $conn->error;
            }
            $conn->close();
        }
    }

    //for verifying
    public function verifyInput($password, $hashpassword)
    {
        return password_verify($password, $hashpassword);
    }

    //this is where we combine all the function into one then do an if-else loop pag maglo-login
    public function doLogin($email, $password)
    {
        $response = [];

        $checkUser = $this->checkUser($email);

        if ($checkUser == "USER_FOUND") {
            $hashpassword = $this->getHashPassword($email);
            $verifyPassword = $this->verifyInput($password, $hashpassword);

            if ($verifyPassword) {
                $response["isSuccess"] = true;
                $response["value"] = 1;
                $response["msg"] = "Login Successful";
            } else {
                $response["isSuccess"] = false;
                $response["value"] = 0;
                $response["msg"] = "Invalid Login Credentials";
            }
        } elseif ($checkUser == "USER_NOT_FOUND") {
            $response["isSuccess"] = false;
            $response["value"] = 0;
            $response["msg"] = "User not found";
        } else {
            $response["isSuccess"] = false;
            $response["value"] = 0;
            $response["msg"] = $checkUser;
        }

        return json_encode($response);
    }
}

$app = new LoginStudent();

//this is for the login button
if (isset($_REQUEST["action"])) {
    if ($_REQUEST["action"] == "isLogin") {
        $email = $_REQUEST["email"];
        $password = $_REQUEST["password"];

        $response = $app->doLogin($email, $password);

        echo $response;
        $decode_response = json_decode($response);

        if ($decode_response->isSuccess) {
            $_SESSION["email"] = $email;
        }
    }
} else {
    echo "ERROR: No direct access";
}
?>
