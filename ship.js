(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Ship = Asteroids.Ship = function Ship(pos, vel){

		Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);

	}

	Ship.inherits(Asteroids.MovingObject);

	Ship.COLOR = "white";
	Ship.RADIUS = 7;

	Ship.prototype.power = function(impulse) {
		this.vel[0] += impulse[0];
		this.vel[1] += impulse[1];
	}

	Ship.prototype.fireBullet = function(){
		if(this.vel != [0,0]){
			var bulletSpeed = Math.sqrt(
				Math.pow(this.vel[0],2) + Math.pow(this.vel[1],2)
			);
			var bulletDir = [this.vel[0] / bulletSpeed, this.vel[1] / bulletSpeed]

			var bulletVel = [7 * bulletDir[0], 7 * bulletDir[1]]

			return new Asteroids.Bullet(this.pos, bulletVel)
		}
		return null;
	}




})(this);