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
			this.map[x][y] = new Color(0,0,0, 1);
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
		var v = new Vector(rand(-1, 0), rand(-1, 0));
		var c = new Color(0,0,0,1);//new Color(rand(0,0), rand(0,0), rand(0,0), rand(0,0));
		var current;
		var real;
		console.log(iterations);
		for(i = 0; i < iterations; i++) {
			fn = this.funcs[randInt(0, this.funcs.length)];
			v = fn.eval(v);
			
			real = this.getIntVector(v);			
			//real.curb(0,399,0,399);
			if(randInt(0,100) < 1) {
				//console.log(this.get(real.x, real.y).convert('255').toString());
			}
			if(real.x >= 0 && real.x < canvas.width && real.y >=0 && real.y < canvas.height) {
				current = this.get(real.x, real.y);

				var newCol = c.blend(fn.color);
				newCol.a = current.a + 1;
				if(randInt(0, 100) <1) {
					//console.log(newCol.convert("255").toString());					
				}
				this.set( real.x, real.y, newCol );	

			}
		}
	}
	
	//Transforms a unit vector to an integer vector, applying all of the appropriate transformations
	this.getIntVector = function(v) {
		return new Vector( parseInt(v.x * 500 + 200) , parseInt(v.y * 500 + 200) );
	}
	
	this.render = function() {
		for(x = 0; x < canvas.width; x++) {
			for(y = 0; y < canvas.height; y++) {
				var c = this.get(x, y)
				c.a = Math.log(c.a)/c.a;
				
				c = c.convert("255");
//				c = new Color(100,100,100,255);
				//c.a = Math.log(c.a)/c.a;

				var pos = ( canvas.width * y ) + x;
				//var pos =  ( canvas.width * (x % canvas.width) ) + y;
				pos *= 4;
				this.data[pos] = c.r;
				this.data[pos+1] = c.g;
				this.data[pos+2] = c.b;
				this.data[pos+3] = c.a;
				//ctx.fillStyle = c.toString();
				//ctx.fillRect(x, y, 1, 1);
							
			}
		}
		
		this.data[0] = 0;
		this.data[1] = 0;
		this.data[2] = 0;
		this.data[3] = 15;
		
		ctx.putImageData(this.image, 0, 0);
	}
}


function Color(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	//if(a != undefined) {
		this.a = a;
	//}
	
	this.blend = function(col) {
		c = new Color(0,0,0,0);
		c.r = parseFloat(this.r + col.r) / 2.0;
		c.g = parseFloat(this.g + col.g) / 2.0;
		c.b = parseFloat(this.b + col.b) / 2.0;
		return c;
	}
	
	this.convert = function(format) {
		if(format = "255") {
			return new Color(this.r * 255.0, this.g * 255.0, this.b * 255.0, this.a * 255.0);
		}
	}
	
	this.toString = function() {
		return "rgba(" + parseInt(this.r) + ', ' + parseInt(this.g) + ', ' + parseInt(this.b) + ', ' + parseInt(this.a) + ")";
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
	return Math.floor(Math.random()*(high-low))+low
	//return parseInt(rand(low, high));
}
