<?php

if(isset($_POST['submit'])) {

    // Retrieve form data
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $subject = isset($_POST['subject']) ? $_POST['subject'] : '';
    $mailFrom = isset($_POST['mail']) ? $_POST['mail'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';

    // Display form data
    echo "Sender: " . $name . "</br>";
    echo "Subject: " . $subject . "</br>";
    echo "Email: " . $mailFrom . "</br>";
    echo "Message: " . $message;

    // Email setup
    $mailTo = "owusuaed@kean.edu";
    $headers = "From: ". $mailFrom;
    $txt = "You have received an e-mail from ".$name.".\n\n".$message;

    // Send email
    mail($mailTo, $subject, $txt, $headers);
    header("Location: http://obi2.kean.edu/~owusuaed/websiteProjects/receiver.php?mainsend");

}
?>
