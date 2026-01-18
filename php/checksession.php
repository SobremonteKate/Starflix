<?php
	session_start();

	if(isset($_SESSION['email'])) {
		$arr = array(
			'isSuccess' => true
		);
	} else {
		$arr = array(
			'isSuccess' => false, 
			'value' => 0,
			'msg' => 'inactive session'
		);
	}

	echo json_encode($arr);
?>