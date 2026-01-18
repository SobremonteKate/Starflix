<?php

class Config {
		public function __construct(){
			$dbservername = 'localhost';
			$username = 'root';
			$password = '';
			$dbname = 'starflix';
			
			$conn = new mysqli($dbservername,$username,$password,$dbname);

			
			$this->conn = $conn;

	}
 }

?>