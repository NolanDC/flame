var canvas, ctx;

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
	f = new Fractal("One");
	function s1(v) {
		return new Vector(v.x / 2, v.y / 2);
	}
	function s2(v) {
		return new Vector(v.x+1 / 2, v.y / 2);
	}
	function s3(v) {
		return new Vector(v.x / 2, v.y+1 / 2);
	}
	f.addFunc(new Func("s1", s1, new Color(0,0,0,0) ))
	f.addFunc(new Func("s2", s2, new Color(0,0,0,0) ))
	f.addFunc(new Func("s3", s3, new Color(0,0,0,0) ))
	
	f.compute(10*10*10);
	f.render();
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


