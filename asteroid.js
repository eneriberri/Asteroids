Function.prototype.inherits = function(parentObj) {
	function Surrogate() {};
	Surrogate.prototype = parentObj.prototype;
	this.prototype = new Surrogate();
};

(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Asteroid = Asteroids.Asteroid = function Asteroid(pos, vel, radius, color){

		Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);

	}
	Asteroid.inherits(Asteroids.MovingObject);

	Asteroid.COLOR = "orange";
	Asteroid.RADIUS = 40;

	Asteroid.randomAsteroid = function(dimX, dimY){
		var randX = Math.floor(Math.random() * dimX);
		var randY = Math.floor(Math.random() * dimY);

		return new Asteroid([randX, randY], Asteroid.randomVec(), Asteroid.RADIUS, Asteroid.COLOR);
	}

	Asteroid.randomVec = function() {
		var randX = (Math.floor(Math.random() * 3) - 1) * 2;
		var randY = (Math.floor(Math.random() * 3) - 1) * 2;
		return [randX, randY];
	}

})(this);

