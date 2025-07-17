<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';
require __DIR__ . '/phpmailer/Exception.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'al202300078tidsm@gmail.com';
        $mail->Password   = 'ifttisuyzopqunsh';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Remitente y destinatario
        $mail->setFrom('al202300078tidsm@gmail.com', 'Cultivares Contacto');
        $mail->addAddress('al202300078tidsm@gmail.com');

        // Datos del formulario
        $nombre   = $_POST['nombre'] ?? '';
        $email    = $_POST['email'] ?? '';
        $telefono = $_POST['telefono'] ?? '';
        $mensaje  = nl2br(htmlspecialchars($_POST['mensaje'] ?? ''));

        // Asunto
        $mail->Subject = "Mensaje de contacto de Cultivares";

        // Cuerpo del mensaje (HTML)
        $mail->isHTML(true);
        $mail->Body = "
        <div style=\"font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;\">
            <h2 style=\"color: #2d6a4f;\">📩 Nuevo mensaje desde el sitio web de Cultivares</h2>
            <p style=\"margin-bottom: 10px; font-size: 15px;\">Has recibido un nuevo mensaje de contacto:</p>
            <table style=\"font-size: 14px; line-height: 1.6;\">
                <tr>
                    <td style=\"font-weight: bold; width: 120px;\">Nombre:</td>
                    <td>$nombre</td>
                </tr>
                <tr>
                    <td style=\"font-weight: bold;\">Email:</td>
                    <td><a href=\"mailto:$email\">$email</a></td>
                </tr>
                <tr>
                    <td style=\"font-weight: bold;\">Teléfono:</td>
                    <td>$telefono</td>
                </tr>
                <tr>
                    <td style=\"font-weight: bold; vertical-align: top;\">Mensaje:</td>
                    <td>$mensaje</td>
                </tr>
            </table>
            <hr style=\"margin-top: 20px; border: none; border-top: 1px solid #ccc;\">
            <p style=\"font-size: 13px; color: #555;\">Este mensaje fue enviado desde el formulario de contacto del sitio web de Cultivares.</p>
        </div>
        ";

        $mail->send();

        echo json_encode(['success' => true, 'message' => 'Mensaje enviado con éxito.']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error al enviar: ' . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Solicitud no válida']);
}
