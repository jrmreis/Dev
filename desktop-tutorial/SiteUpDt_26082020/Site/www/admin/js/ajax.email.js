$(function() {
	$(".validaEmail").validate({
		rules:{
			email:{ 
				remote: {
					url:	"checkemail.php",
					type:	"post"
				}
			}
		},
		messages:{
			email:{	remote:		"Email já se encontra cadastrado no sistema" }
		}
	});
});