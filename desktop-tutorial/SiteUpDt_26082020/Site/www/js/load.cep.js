$(function() {
	$(".cep").change(function() {
		var cepCode = $(this).val();
		
		$.getJSON("../app/content/ajax/cep.php",{cep: cepCode}, function(j){
			var OptionEstado = ".estado option[value='"+ j.uf +"']";
			$('.endereco').val(j.logradouro);
			$('.bairro').val(j.bairro);
			$('.cidade').val(j.cidade);
			$(OptionEstado).prop("selected", "selected");
		});
	});
});