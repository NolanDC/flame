
$(function() {
	$('.toggle').live('click', function() {
		$(this).parents('.code_block').children('.code').slideToggle();
	});	
	
	$('.delete').live('click', function() {
		$(this).parents('.code_block').slideUp(function() {
			$(this).remove();
		});
	});
	
	$('#func').click(function() {
		var name = $('#name');
		
		f = new Code( name.val() );
		name.val('');
	});
	
	new Code('f1');
	
});



function clicked() {
	f = new Code('hello');
}


function Code(name) {
	$('#functions').append(
		"<div class=\"code_block\">\
			<div class=\"header\">\
				<a class=\"toggle\" href=\"#\">"+ name +"</a>\
				<a class=\"delete\" href=\"#\">x</a>\
			</div>\
			<div class=\"code\">\
					<div class=\"function\">\
						function(vec, col) {\
					</div>\
					<div class=\"code_input\">\
						<textarea class=\"input\" id=\""+ name +"\">\
						</textarea>\
					</div>\
					<div class=\"function\">\
						<span class=\"indent\"></span>return [v, c];<br />\
						}\
					</div>\
			</div>\
		</div>"
	);
}