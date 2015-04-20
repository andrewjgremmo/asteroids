(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MirrorShip = Asteroids.MirrorShip = function(objectParams){
    Asteroids.MovingObject.call(this, {
      pos: objectParams.pos,
      vel: objectParams.vel,
      radius: Asteroids.EnemyShip.RADIUS,
      game: objectParams.game,
      srcX: 100,
      srcY: 0
     });

    this.color = "#F00";
  };


  Asteroids.Util.inherits(MirrorShip, Asteroids.MovingObject);

  //overwrites movingObject.draw to draw ship with rotation
  MirrorShip.prototype.draw = function (ctx) {
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(Math.atan2(this.game.ship.direction[1] * -1, 
      this.game.ship.direction[0] * -1));
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(-15, 15);
    ctx.bezierCurveTo(-8, 15, -8, -15, -15, -15);
    ctx.fill();
    if (this.game.ship.burner) {
      ctx.fillStyle = "#ff8300";
      ctx.beginPath();
      ctx.moveTo(-23, 0);
      ctx.lineTo(-16, 12);
      ctx.bezierCurveTo(-10, 12, -10, -12, -16, -12);
      ctx.fill();
    }
  };


  //overwrites isCollidedWith function to prevent collision on wrap
  MirrorShip.prototype.isCollidedWith = function (otherObject) {
    if (this.pos[0] > 0 + this.radius &&
        this.pos[0] < Asteroids.DIM_X - this.radius) {
      var dist = Math.sqrt(Math.pow(this.pos[0] - otherObject.pos[0], 2) +
                        Math.pow(this.pos[1] - otherObject.pos[1], 2));
      return (dist < (this.radius + otherObject.radius));
    } else {
      return false;
    }
  };

  MirrorShip.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      this.game.lives -= 1;
      otherObject.relocate();
    }
  };

  //overwrites move function to mirror movements of player
  MirrorShip.prototype.move = function () {
    this.pos[0] = -this.game.ship.pos[0] - this.radius * 2;
    this.pos[1] = this.game.ship.pos[1];
    this.pos = this.game.wrap(this.pos, this);
  };

  MirrorShip.prototype.destroy = function () {
    this.game.points += 1;
    this.game.remove(this);
    this.game.mirrorShip = undefined;
  };

})();
