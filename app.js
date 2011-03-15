


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
	

	function n(v) {
		return new Vector(v.x, v.y);
	}
	
	function s1(v) {
		return new Vector(v.x / 2, v.y / 2);
	}
	function s2(v) {
		return new Vector(parseFloat(v.x+1) / 2, v.y / 2);
	}
	function s3(v) {
		return new Vector(v.x / 2, parseFloat(v.y+1) / 2);
	}
	function s4(v) {
		return new Vector(Math.sin(v.x), Math.sin(v.y));
	}
	function s5(v) {
		var coef = 1.0 / r(v)*r(v);
		return new Vector(v.x * coef, v.y * coef);
	}
	function s6(v) {
		var _r = r(v);
		var _t = t(v);
		
		return new Vector(Math.sin(_t+_r)*_r, Math.cos(_t-_r)*_r);
	}
	
	function hyperbolic(v) {
		var _r = r(v);
		var _t = t(v);
		return new Vector(Math.sin(_t) / _r, _r * Math.cos(_t));
	}
	
	function diamond(v) {
		var _t = t(v);
		var _r = r(v);
		return new Vector(Math.sin(_t) * Math.cos(_r), Math.cos(_t) * Math.sin(_r));
	}
	
	function r(v) {
		return Math.sqrt(v.x * v.x + v.y * v.y);
	}

	function t(v) {
		return Math.atan(v.x/v.y);
	}
	
	f.addFunc( new Func("s1", hyperbolic, new Color(.5,0,0,.5) ))
	f.addFunc( new Func("s2", diamond, new Color(0,.5,0,.5) ))
	f.addFunc( new Func("s3", s6, new Color(0,0,.5,.5) ))
	f.addFunc( new Func("s3", s5, new Color(0,1,0,.5) ))
	f.addFunc( new Func("s3", s4, new Color(1,0,.5,.5) ))
	
	f.compute(1000000);
	//f.compute(100);
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


