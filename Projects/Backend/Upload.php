<?php
$servername = "localhost";
$db = 'pdf_db'; 
$username = "aman";
$password = "Aman@#$850850";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// File Upload Logic
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['pdf']['name'])) {
    $fileName = $_FILES['pdf']['name'];
    $fileType = $_FILES['pdf']['type'];
    $fileData = file_get_contents($_FILES['pdf']['tmp_name']);

    $stmt = $conn->prepare("INSERT INTO pdf_files (file_name, file_type, file_data) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $fileName, $fileType, $fileData);
  
    if ($stmt->execute()) {
        // Fetch the last inserted ID to send it back to the client
        $lastId = $stmt->insert_id;
        echo json_encode([
            'message' => 'PDF uploaded successfully!',
            'id' => $lastId
        ]);
    } else {
        echo json_encode([
            'error' => $stmt->error
        ]);
    }

    $stmt->close();
    $conn->close();
}

// Fetch PDF Logic
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $pdfId = intval($_GET['id']);
    
    $stmt = $conn->prepare("SELECT file_name, file_type, file_data FROM pdf_files WHERE id = ?");
    $stmt->bind_param("i", $pdfId);
    $stmt->execute();
    $stmt->store_result();
  
    // Check if the PDF was found
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($fileName, $fileType, $fileData);
        $stmt->fetch();

        // Send the PDF file data to the browser
        header('Content-Type: ' . $fileType);
        header('Content-Disposition: inline; filename="' . $fileName . '"');
        echo $fileData;
    } else {
        echo json_encode(['error' => 'PDF not found']);
    }

    $stmt->close();
    $conn->close();
}
?>
