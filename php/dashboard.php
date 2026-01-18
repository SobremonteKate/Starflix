<?php
	session_start();
	require 'dbconn1.php';

	class RegisterUser {
			
			public function savePersonalInfo($fname,$lname,$email,$password) {
			error_reporting(E_ERROR);
			$config = new Config();
			$app = new RegisterUser();
			$response = array();

			$conn = $config->conn;

						if($conn->connect_error){
				return $conn->connect_error;

			} else {
				$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

				$query = 'INSERT INTO accounts(fname,lname,email,password) VALUES(?,?,?,?)';

				
				if($stmt = $conn->prepare($query)){
					$stmt->bind_param('ssss',$fname,$lname,$email,$hashedPassword);

		if($stmt->execute()){
						$response['isSuccess'] = true;
								$response['msg'] = 'User save successfully';
			
						$stmt->close();

						return json_encode($response);
					} 
				}
				$conn->close();
			}
		}

	}


	$app = new RegisterUser(); 

	if(isset($_REQUEST['action'])) {
		if($_REQUEST['action'] == 'isSignUp') {

			$lname = $_REQUEST['lname'];
			$fname = $_REQUEST['fname'];
			$email = $_REQUEST['email'];
			$password = $_REQUEST['password'];
		
			echo $app->savePersonalInfo($fname,$lname,$email,$password);	
			
		}
		
	} else {
		echo 'ERROR: No direct access';
	}
	
?>