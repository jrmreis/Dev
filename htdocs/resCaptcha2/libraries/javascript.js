/* global grecaptcha */

grecaptcha.ready(function() {
    grecaptcha.execute('6LfrN8MZAAAAAIBRuOgeIPzkZpd2v-ThtTe7yqeG', {action: 'homepage'})
        .then(function(token) {
            document.getElementById('g-recaptcha-response').value=token;
        });
});


