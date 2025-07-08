<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Verificación estricta del método HTTP
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    header("Allow: POST");
    header("Location: contacto.html?status=error&message=no_post");
    exit;
}

// Incluir PHPMailer
require 'PHPMailer-6.10.0/src/Exception.php';
require 'PHPMailer-6.10.0/src/PHPMailer.php';
require 'PHPMailer-6.10.0/src/SMTP.php';

// Configuración inicial
$mail = new PHPMailer(true);
$recipient_email = "al202300078tidsm@gmail.com";
$site_name = "Cultivares";
$asunto = $_POST['asunto'] ?? '';

// Validar asunto
$campos_validos = [
    'Contacto General' => ['contacto_nombre', 'contacto_email', 'contacto_mensaje'],
    'Vacantes' => ['vacantes_nombre', 'vacantes_email', 'vacantes_cv'],
    'Ser Cliente' => ['cliente_empresa', 'cliente_email', 'cliente_telefono', 'cliente_interes', 'cliente_mensaje'],
    'Ser Proveedor' => ['proveedor_empresa', 'proveedor_email', 'proveedor_producto', 'proveedor_mensaje'],
    'Mensaje al Director' => ['director_nombre', 'director_email', 'director_mensaje'],
    'Buzon de Quejas' => ['queja_descripcion'],
    'Agradecimiento' => ['agradecimiento_nombre', 'agradecimiento_dirigido', 'agradecimiento_mensaje']
];

if (!isset($campos_validos[$asunto])) {
    header("Location: contacto.html?status=error&message=asunto_invalido");
    exit;
}

// Validar campos
$datos = [];
foreach ($campos_validos[$asunto] as $campo) {
    $datos[$campo] = $_POST[$campo] ?? '';
    
    // Validar email si el campo contiene 'email'
    if (strpos($campo, 'email') !== false && !empty($datos[$campo]) && !filter_var($datos[$campo], FILTER_VALIDATE_EMAIL)) {
        header("Location: contacto.html?status=error&message=campos_invalidos");
        exit;
    }
    
    // Validar campos requeridos (excepto queja_nombre y queja_email)
    if (empty($datos[$campo]) && !in_array($campo, ['queja_nombre', 'queja_email'])) {
        header("Location: contacto.html?status=error&message=campos_invalidos");
        exit;
    }
}

// Manejar archivo adjunto
$attachment_path = '';
if ($asunto === 'Vacantes' && isset($_FILES['vacantes_cv']) && $_FILES['vacantes_cv']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['vacantes_cv'];
    $allowed_types = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!in_array($file['type'], $allowed_types) || $file['size'] > 5 * 1024 * 1024) {
        header("Location: contacto.html?status=error&message=archivo_no_valido");
        exit;
    }
    
    $upload_dir = 'uploads/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }
    
    $attachment_path = $upload_dir . uniqid() . '_' . basename($file['name']);
    if (!move_uploaded_file($file['tmp_name'], $attachment_path)) {
        header("Location: contacto.html?status=error&message=error_servidor_archivos");
        exit;
    }
}

// Configurar y enviar correo
try {
    // Configuración SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'al202300078tidsm@gmail.com';
    $mail->Password = 'pecsjokpdlnhgghq';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';

    // Remitente y destinatario
    $mail->setFrom('al202300078tidsm@gmail.com', "$site_name Contacto");
    $mail->addAddress($recipient_email);
    
    // Configurar reply-to con el email del formulario
    $reply_email = '';
    foreach ($datos as $key => $value) {
        if (strpos($key, 'email') !== false && !empty($value)) {
            $reply_email = $value;
            $reply_name = $datos[str_replace('email', 'nombre', $key)] ?? $value;
            $mail->addReplyTo($reply_email, $reply_name);
            break;
        }
    }

    // Asunto y cuerpo del mensaje
    $mail->Subject = "Nuevo mensaje - $asunto desde $site_name";
    
    $body = "Asunto: $asunto\n\n";
    foreach ($datos as $key => $value) {
        $pretty_key = ucfirst(str_replace('_', ' ', $key));
        $body .= "$pretty_key: $value\n";
    }
    
    $mail->Body = $body;

    // Adjuntar archivo si existe
    if (!empty($attachment_path)) {
        $mail->addAttachment($attachment_path, $_FILES['vacantes_cv']['name']);
    }

    // Enviar correo
    $mail->send();
    
    // Eliminar archivo temporal después de enviar
    if (!empty($attachment_path) && file_exists($attachment_path)) {
        unlink($attachment_path);
    }
    
    // Redirigir a éxito
    header("Location: contacto.html?status=success");
    exit;
    
} catch (Exception $e) {
    // Eliminar archivo temporal si hubo error
    if (!empty($attachment_path) && file_exists($attachment_path)) {
        unlink($attachment_path);
    }
    
    // Registrar error y redirigir
    error_log("Error al enviar correo: " . $mail->ErrorInfo);
    header("Location: contacto.html?status=error&message=mail_error");
    exit;
}