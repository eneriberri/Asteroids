(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var MovingObject = Asteroids.MovingObject = function MovingObject(pos, vel, radius, color) {
		this.pos    = pos;
		this.vel    = vel;
		this.radius = radius;
		this.color  = color;
	}

	MovingObject.prototype.draw = function(ctx) {
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.arc(
			this.pos[0],
			this.pos[1],
			this.radius,
			0,
			2 * Math.PI
			);
		ctx.stroke();
	}

	MovingObject.prototype.isCollidedWith = function(otherObject){
		var xDiff =(otherObject.pos[0] - this.pos[0]);
		var yDiff =(otherObject.pos[1] - this.pos[1]);
		var distance = Math.sqrt(Math.pow(xDiff,2) +  Math.pow(yDiff, 2));
		return (otherObject.radius + this.radius) >= distance;
	}

	MovingObject.prototype.move = function() {
		var newPosX = this.pos[0] + this.vel[0];
		var newPosY = this.pos[1] + this.vel[1];


		this.pos = MovingObject.wrapPosition(newPosX, newPosY);

	}

	MovingObject.wrapPosition = function(coordX, coordY){
		if(coordX >= DIM_X){
			coordX = 0;
		}
		else if(coordX < 0){
			coordX = DIM_X - 1;
		}
		if(coordY >= DIM_Y){
			coordY = 0;
		}
		else if(coordY < 0){
			coordY = DIM_Y - 1;
		}
		return [coordX, coordY];
	}

})(this);

