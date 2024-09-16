<?php

use PHPMailer\PHPMailer\PHPMailer;

$message = filter_input(INPUT_POST, "message", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$mailToSend = filter_input(INPUT_POST, "email", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$btn = filter_input(INPUT_POST, "envoyer", FILTER_SANITIZE_FULL_SPECIAL_CHARS);

 require_once '../TutoPHPMailerMail/SendMailFunction.php';
if (isset($btn) && $btn == "envoyer") {
     $mail = new PHPMailer(true);
    EnvoieMail($mail,$mailToSend,$message);
}

?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire</title>
    <link rel="stylesheet" href="../TutoPHPMailer/css/index.css">
</head>

<body>
    <div class="form-container">
        <h2>Formulaire de Contact</h2>
        <form action="#" method="POST">
            <div class="form-group">
                <label for="email">Adresse e-mail :</label>
                <input type="email" id="email" name="email" placeholder="Votre e-mail" autocomplete="off" required>
            </div>
            <div class="form-group">
                <label for="message">Votre message :</label>
                <input type="text" id="message" name="message" placeholder="Écrivez votre message" autocomplete="off" required>
            </div>
            <button type="submit" name="envoyer" value="envoyer" class="submit-btn">Envoyer</button>

        </form>
    </div>

</body>

</html>





