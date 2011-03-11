function Fractal(name, color) {
	this.name = name;
	
	this.data = context.getImageData(0, 0, canvas.width, canvas.height);
	this.func = new Array();
	
	this.addFunc = function(func) {
		this.func.push(func);
	}
	
	this.set = function(x, y, c) {
		var pos =  ( canvas.width * (x % canvas.width) ) + y;
		pos *= 4;
		this.data[pos] = c.r;
		this.data[pos+1] = c.g;
		this.data[pos+2] = c.b;
		this.data[pos+3] = c.a;
	}
	
	this.render = function() {
		canvas.putImageData(this.data, 0, 0);
	}
}

function Color(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	if(a != undefined) {
		this.a = a;
	}
}

function Vector(x, y) {
	this.x = x;
	this.y = y;
	this.set = function(_x, _y) {
		this.x = _x;
		this.y = _y;
		return this;
	}
}

function Func(name, code) {
	this.name = name;
	this.code = code;
	
	//returns an array containing the transformed vector and color
	this.eval = function(vec) {
		eval("func = function(vec) {" + code + "}");
		return func(vec);
	}
}