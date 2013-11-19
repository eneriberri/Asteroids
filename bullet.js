(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Bullet = Asteroids.Bullet = function Bullet(pos, vel){

		Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);

	}

	Bullet.inherits(Asteroids.MovingObject);

	Bullet.COLOR = "red";
	Bullet.RADIUS = 2;


})(this);