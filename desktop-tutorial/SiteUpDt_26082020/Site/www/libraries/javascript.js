/* global grecaptcha */

grecaptcha.ready(function() {
    grecaptcha.execute('6LekyMMZAAAAAPsezG2JPxPLkby4aSlRKS9sX6sE', {action: 'homepage'})
        .then(function(token) {
            document.getElementById('g-recaptcha-response').value=token;
        });
});


