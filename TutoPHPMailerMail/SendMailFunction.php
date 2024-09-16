<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;




//Create an instance; passing `true` enables exceptions

function EnvoieMail($mail, $mailToSend, $Content)
{

    //Server settings
    $mail->SMTPDebug = 0;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'coderredemption@gmail.com';                     //SMTP username
    $mail->Password   = 'jwsabyixeqazbial';//SMTP password

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom($mailToSend, 'Abonnez-vous au Code Redempteur');
    $mail->addAddress($mailToSend, 'User');    // Ajouter un destinataire
    $mail->addReplyTo('noreply@domaine.com', 'No Reply');

    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Validation envoie message automatique';
    $mail->Body    = '<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Validation de Compte</title>
        <style>
            body {
                background-color: #000;
                color: #fff;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }

            .container {
                background-color: rgba(0, 0, 0, 0.7);
                margin: 0 auto;
                padding: 40px;
                max-width: 600px;
                text-align: center;
                border-radius: 10px;
                border: 1px solid #333;
            }

            h1 {
                font-size: 24px;
                color: #fff;
            }

            p {
                font-size: 18px;
                color: #ccc;
            }

            .validation-code {
                background-color: rgba(0, 0, 0, 0.9);
                padding: 20px;
                font-size: 32px;
                color: #00bfff;
                font-weight: bold;
                letter-spacing: 5px;
                margin: 20px 0;
                border-radius: 5px;
                border: 2px solid #00bfff;
            }
            a.more {
                color: rgb(0, 191, 255);
                text-decoration: none;
            }
            .footer {

                margin-top: 30px;
                font-size: 14px;
                color: #888;
            }
            a.more:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>

        <div class="container">
            <h1> Mail envoyé avec succès :</h1>
            <p> Abonnez-vous au : </p>
            <div class="validation-code">' . $Content . '</div>
            <div class="footer">
                Abonnez-vous à la chaîne du Code Redempteur
            </div>
        </div>

    </body>
    </html>';
    $mail->AltBody = 'Abonnez-vous au Code Redempteur';

    $mail->send();
}

