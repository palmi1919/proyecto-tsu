<?php

// Establecer tipo de contenido si deseas respuesta directa al navegador

header('Content-Type: text/html; charset=utf-8');



// Validación básica

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Validar que todos los campos requeridos están presentes

    if (empty($_POST["nombre"]) || empty($_POST["email"]) || empty($_POST["mensaje"])) {

        echo "Por favor completa todos los campos obligatorios.";

        exit;

    }



    // Sanitizar datos

    $nombre   = strip_tags(trim($_POST["nombre"]));

    $email    = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

    $telefono = strip_tags(trim($_POST["telefono"] ?? ''));

    $mensaje  = strip_tags(trim($_POST["mensaje"]));



    // Configurar destinatario y asunto

    $to = "info@cultivares.com.mx";

    $subject = "Nuevo mensaje desde el formulario de contacto";



    // Cabeceras del correo

    $headers = "From: $nombre <$email>\r\n";

    $headers .= "Reply-To: $email\r\n";

    $headers .= "Return-Path: $email\r\n";

    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";



    $body = "*************************************\n";

    $body .= "Mensaje enviado desde www.cultivares.com.mx\n";

    $body .= "*************************************\n\n";

    $body .= "Nombre: $nombre\n";

    $body .= "Email: $email\n";

    $body .= "Teléfono: $telefono\n";

    $body .= "Mensaje:\n$mensaje\n";



    // Enviar el correo

    if (mail($to, $subject, $body, $headers)) {

        header('Content-Type: application/json');

echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente.']);



    } else {

        echo "Error al enviar el mensaje. Intenta más tarde.";

    }

} else {

    echo "Acceso no permitido.";

}





