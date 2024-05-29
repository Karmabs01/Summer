

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['amount'])) {$amount = $_POST['amount'];}
    if (isset($_POST['method'])) {$method = $_POST['method'];}
    if (isset($_POST['wallet'])) {$wallet = $_POST['wallet'];}
    if (isset($_POST['login'])) {$login = $_POST['login'];}


    $to = "info@myawardwallet.com"; /*Укажите адрес, га который должно приходить письмо*/
    $sendfrom   = "pickbonus.myawardwallet.com"; /*Укажите адрес, с которого будет приходить письмо, можно не настоящий, нужно для формирования заголовка письма*/
    $headers  = "From: " . strip_tags($sendfrom) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($sendfrom) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";
    $subject = "$formData";
    $message = "$formData<br> 
    <b>Login:</b> $login <br>
    <b>Amount:</b> $amount <br>
    <b>Method:</b> $method<br>
    <b>Wallet:</b> $wallet <br>";
    $send = mail ($to, $subject, $message, $headers);
    if ($send == 'true')
    {
    echo '<center><p class="success animated fadeInUp"><span>Спасибо за заявку!</span><br>
    В ближайшее время наш<br> менеджер Вам перезвонит<br>
    <a href="index.html">Закрыть</a></p></center>';
    }
    else 
    {
    echo '<center><p class="fail"><b>Ошибка. Сообщение не отправлено!</b></p></center>';
    }
} else {
    http_response_code(403);
    echo "Попробуйте еще раз";
}
?>

