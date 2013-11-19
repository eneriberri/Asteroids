(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Game = Asteroids.Game = function Game(ctx){
		this.ctx = ctx;
		this.asteroids = [];
		this.ship = new Asteroids.Ship([DIM_X/2, DIM_Y/2], [0, 0]);
		this.bullets = [];

		this.img = new Image();
		this.img.onload = function() {
			this.ctx.drawImage(this.img, 0, 0);
		};
		this.img.src = "galaxy.jpg";
	}

	Game.REFRESH_PERIOD = 30;

	Game.prototype.addAsteroids = function(numAsteroids) {
		for (var i = 0; i < numAsteroids; i++) {
			this.asteroids.push(Asteroids.Asteroid.randomAsteroid(DIM_X, DIM_Y));
		}
	}

	Game.prototype.draw = function() {
		this.ctx.clearRect(0, 0, DIM_X, DIM_Y);
		this.ctx.drawImage(this.img, 0, 0);

		var that = this;
		this.asteroids.forEach(function(asteroid) {
			asteroid.draw(that.ctx);
		});

		this.ship.draw(that.ctx);

		this.bullets.forEach(function(bullet) {
			bullet.draw(that.ctx);
		});

	}

	Game.prototype.move = function() {
		this.asteroids.forEach(function(asteroid) {
			asteroid.move();
		});

		this.ship.move();
		this.bullets.forEach(function(bullet) {
			bullet.move();
		});
	}

	Game.prototype.step = function() {
		this.move();
		this.draw();
		this.checkCollisions();
	}

	Game.prototype.start = function() {
		this.bindKeyHandlers();
		this.addAsteroids(8);
		this.intervalID = setInterval(this.step.bind(this), Game.REFRESH_PERIOD);
	}

	Game.prototype.removeAsteroid = function(asteroid){
		this.removeItem(asteroid, this.asteroids);
	}

	Game.prototype.removeBullet = function(bullet){
		this.removeItem(bullet, this.bullets);
	}

	Game.prototype.removeItem = function(item, array){
		var indexToRemove = array.indexOf(item);
		if(indexToRemove != -1){
			array.splice(indexToRemove, 1);
		}
	}


	Game.prototype.checkCollisions = function() {
		for(var i = 0; i < this.asteroids.length; i++) {
			if (this.asteroids[i].isCollidedWith(this.ship)) {
				this.stop();
				alert("Collided! Game Over, sucker.");
			}

			//check that asteroid does not collide with ANY of the bullets
			for(var j = 0; j < this.bullets.length; j++){
				var bullet = this.bullets[j];
				if(this.asteroids[i].isCollidedWith(bullet)){
					//remove the asteroid and bullet
					this.removeAsteroid(this.asteroids[i]);
					this.removeBullet(bullet);

					if(this.asteroids.length === 0)
					{
						alert("YOU WON! WELL DONE!");
					}
					break;


				}
			}
		}
	}

	Game.prototype.fireBullet = function(){
		var newBullet = this.ship.fireBullet();
		if(newBullet){
			this.bullets.push(newBullet);
		}
	}

	Game.prototype.stop = function() {
		clearInterval(this.intervalID);
	}

	Game.prototype.bindKeyHandlers = function() {
		var ship = this.ship;
		var game = this;
		key('left', function() {
			return ship.power.call(ship, [-1,0]);
		});
		key('right', function() {
			return ship.power.call(ship, [1,0]);
		});
		key('up', function() {
			return ship.power.call(ship, [0,-1]);
		});
		key('down', function() {
			return ship.power.call(ship, [0,1]);
		});

		key('space', function() {
			return game.fireBullet.call(game);
		});

	}
})(this);