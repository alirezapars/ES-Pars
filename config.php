<?php
@mysqli_set_charset("utf8");
$con=@mysqli_connect("localhost","Username","Password","DBname") or die("با پایگاه داده ، ارتباط برقرار نشد");
@mysqli_query($con,"SET character_set_results = 'utf8',character_set_client = 'utf8',character_set_connection = 'utf8',character_set_database = 'utf8',character_set_server = 'utf8'");
global $con;
session_start();
?>
