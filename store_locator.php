<?php
    include 'connect.php';
 
    //connect to db
    $con = mysqli_connect("localhost", $username, $password, $database);
    // Check connection
    if (mysqli_connect_errno())
      {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
      }

    // Get parameters
    $mlat = $_POST["lat"];
    $mlng = $_POST["lng"];
    $radius = $_POST["radius"];
 
    // Search the rows in the markers table
    //change 3959 to 6371 for distance in KM
    $sql = sprintf("SELECT name, address, lat, lng, category, ( 3959 * acos( cos( radians('$mlat') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('$mlng') ) + sin( radians('$mlat') ) * sin( radians( lat ) ) ) ) AS distance FROM markers HAVING distance < '$radius' ORDER BY distance LIMIT 0 , 20",
      mysqli_real_escape_string($con,$mlat),
      mysqli_real_escape_string($con,$mlng),
      mysqli_real_escape_string($con,$mlat),
      mysqli_real_escape_string($con,$radius));
 
    $result = mysqli_query($con, $sql);

    if (!$result) {
    printf("Error: %s\n", mysqli_error($con));
    exit();
    }

    $rows = array();
    
    while($r = mysqli_fetch_array($result)) {
        $rows[] = $r;
    }
    mysqli_close($con);
 
    echo json_encode($rows);
?>
