function Fractal(name) {
	this.name = name;
	
	this.image = ctx.getImageData(0, 0, canvas.width, canvas.height);
	this.data = this.image.data;
	this.funcs = new Array();
	
	//init the density map
	this.map = new Array(canvas.width);
	for(x = 0; x < canvas.width; x++) {
		this.map[x] = new Array(canvas.height);
		for(y = 0; y < canvas.height; y++) {
			this.map[x][y] = new Color(1, 1, 1, 1);
		}
	}
	
	this.addFunc = function(func) {
		this.funcs.push(func);
	}
	
	this.set = function(x, y, c) {
		this.map[x][y] = c;
	}
	
	this.get = function(x, y) {
		return this.map[x][y];
	}
	
	this.compute = function(iterations) {
		var v = new Vector(rand(-1, 1), rand(1, -1));
		var current;
		for(i = 0; i < iterations; i++) {
			fn = this.funcs[randInt(0, this.funcs.length - 1)];
			v = fn.eval(v);
			
			real = this.getIntVector(v);			
			real.curb(0,399,0,399);
			
			current = this.get(real.x, real.y);
			
			var newCol = current.blend(fn.color);
			newCol.a = current.a + 1;
			this.set(real.x, real.y, new Color(2,3,4,51));
		}
	}
	
	this.getIntVector = function(v) {
		return new Vector( parseInt(v.x * (canvas.width/2) + (canvas.width/2) ) , parseInt(v.y * (canvas.height/2) + (canvas.height/2)) );
	}
	
	this.render = function() {
		for(x = 0; x < canvas.width; x++) {
			for(y = 0; y < canvas.height; y++) {
				var c = this.get(x, y).convert("255");
				var pos =  ( canvas.width * (x % canvas.width) ) + y;
				pos *= 4;
				this.data[pos] = c.r;
				this.data[pos+1] = c.g;
				this.data[pos+2] = c.b;
				this.data[pos+3] = c.a;			}
		}
		ctx.putImageData(this.image, 0, 0);
	}
}


function Color(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	if(a != undefined) {
		this.a = a;
	}
	
	this.blend = function(col) {
		c = new Color(0,0,0,0);
		c.r = (this.r + col.r) / 2;
		c.g = (this.g + col.g) / 2;
		c.b = (this.b + col.b) / 2;
		return c;
	}
	
	this.convert = function(format) {
		if(format = "255") {
			return new Color(this.r * 255, this.g * 255, this.b * 255, this.a * 255);
		}
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
	
	this.curb = function(xlow, xhigh, ylow, yhigh) {
		if(this.x < xlow) this.x = xlow;
		if(this.x > xhigh) this.x = xhigh;
		if(this.y < ylow) this.y = ylow;
		if(this.y > yhigh) this.y = yhigh;	
	}
}


function Func(name, func, color) {
	this.name = name;
	this.func = func;
	this.color = color;
	
	//returns an array containing the transformed vector and color
	this.eval = function(vec) {
		//eval("func = function(vec) {" + code + "}");
		return this.func(vec);
	}
}

function rand(low, high) {
	return Math.random() * (high+1-low) + low;
}

function randInt(low, high) {
	return parseInt(rand(low, high));
}
