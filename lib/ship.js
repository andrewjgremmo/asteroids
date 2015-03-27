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
    this.image = new Image();
    this.image.src = "images/spaceship.png";
    this.imageWidth = 350;
    this.imageHeight = 350;
  };

  Ship.RADIUS = 15;
  Ship.COLOR = "#FFF";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function (ctx) {
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(Math.atan2(this.direction[1] * -1, this.direction[0]));
    // ctx.drawImage(
    //   this.image,
    //   0,
    //   0,
    //   this.imageWidth,
    //   this.imageHeight,
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius * 2.5,
    //   this.radius * 2.5
    // );
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

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomShipPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function () {
    var mult = 0.75;
    this.vel[0] += this.direction[0] * mult;
    this.vel[1] += this.direction[1] * mult * -1;
    this.burner = true;
  };

  Ship.prototype.stop = function () {
    var stoppingMult = 0.90;
    this.vel[0] *= stoppingMult;
    this.vel[1] *= stoppingMult;
  };

  Ship.prototype.turnLeft = function () {
    var theta = (Math.PI / 30);
    this.angle -= theta;
    this.direction[0] = Math.sin(this.angle);
    this.direction[1] = Math.cos(this.angle);
  };

  Ship.prototype.turnRight = function () {
    var theta = (Math.PI / 30);
    this.angle += theta;
    this.direction[0] = Math.sin(this.angle);
    this.direction[1] = Math.cos(this.angle); 
  };

  Ship.prototype.fireBullet = function () {
    game.bullets.push(new Asteroids.Bullet({
      pos: this.pos.slice(0),
      vel: [this.direction[0] * 8, this.direction[1] * -8],
      radius: 7.5,
      game: this.game
    }));
  };

})();
