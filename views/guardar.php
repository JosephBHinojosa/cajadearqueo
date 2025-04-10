<?php
session_start();

if (!isset($_SESSION['billetes'])) {
    $_SESSION['billetes'] = [];
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $valor = intval($_POST['valor']);
    $cantidad = intval($_POST['cantidad']);
    $total = $valor * $cantidad;

    $encontrado = false;
    foreach ($_SESSION['billetes'] as &$billete) {
        if ($billete['valor'] == $valor) {
            $billete['cantidad'] += $cantidad;
            $billete['total'] = $billete['valor'] * $billete['cantidad'];
            $encontrado = true;
            break;
        }
    }

    if (!$encontrado) {
        $_SESSION['billetes'][] = ['valor' => $valor, 'cantidad' => $cantidad, 'total' => $total];
    }

    echo json_encode($_SESSION['billetes']);
}
?>
