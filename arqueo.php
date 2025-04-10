<?php
session_start();

if (!isset($_SESSION['billetes'])) {
    $_SESSION['billetes'] = [];
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['billetes'])) {
        $_SESSION['billetes'] = $data['billetes'];
    }

    echo json_encode(["success" => true, "totalGeneral" => array_sum(array_column($_SESSION['billetes'], 'total'))]);
    exit();
}

echo json_encode(["billetes" => $_SESSION['billetes']]);
?>
