(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (objectParams) {
    this.direction = [0, 1];
    this.angle = 0;
    this.color = Ship.COLOR;
    Asteroids.MovingObject.call(this, objectParams);
    this.burner = false;
    this.maxSpeed = 10;
  };

  Ship.RADIUS = 15;
  Ship.COLOR = "#FFF";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  //overwrites movingObject.draw to draw ship with rotation
  Ship.prototype.draw = function (ctx) {
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(Math.atan2(this.direction[1] * -1, this.direction[0]));
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(-15, 15);
    ctx.bezierCurveTo(-8, 15, -8, -15, -15, -15);
    ctx.fill();
    if (this.burner) {
      ctx.fillStyle = "#ff8300";
      ctx.beginPath();
      ctx.moveTo(-23, 0);
      ctx.lineTo(-16, 12);
      ctx.bezierCurveTo(-10, 12, -10, -12, -16, -12);
      ctx.fill();
      this.burner = false;
    }
  };

  Ship.prototype.collideWith = function (otherObject) {
  };

  //resets ship
  Ship.prototype.relocate = function () {
    this.pos = this.game.randomShipPosition();
    this.vel[0] = 0;
    this.vel[1] = 0;
  };

  //increases velocity of ship, throttles at maxSpeed
  Ship.prototype.power = function () {
    var mult = 0.75;
    this.vel[0] += this.direction[0] * mult;
    if (this.vel[0] > this.maxSpeed) {
      this.vel[0] = this.maxSpeed;
    } else if (this.vel[0] < -this.maxSpeed) {
      this.vel[0] = -this.maxSpeed;
    }
    this.vel[1] += this.direction[1] * mult * -1;
    if (this.vel[1] > this.maxSpeed) {
      this.vel[1] = this.maxSpeed;
    } else if (this.vel[1] < -this.maxSpeed) {
      this.vel[1] = -this.maxSpeed;
    }
    this.burner = true;
  };

  //decreases velocity
  Ship.prototype.stop = function () {
    var stoppingMult = 0.90;
    this.vel[0] *= stoppingMult;
    this.vel[1] *= stoppingMult;
  };

  //changes angle of ship
  Ship.prototype.turn = function (direction) {
    var theta = (Math.PI / 20);
    if (direction === "left") {
      this.angle -= theta;
    } else {
      this.angle += theta;
    }
    this.direction[0] = Math.sin(this.angle);
    this.direction[1] = Math.cos(this.angle);
  };

  Ship.prototype.fireBullet = function () {
    this.game.bullets.push(new Asteroids.Bullet({
      pos: this.pos.slice(0),
      vel: [this.direction[0] * 12, this.direction[1] * -12],
      radius: 7.5,
      game: this.game
    }));
  };

})();
