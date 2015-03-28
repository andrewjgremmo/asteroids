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

    this.image = new Image();
    this.image.src = "images/ship.png";
    this.imageWidth = 100;
    this.imageHeight = 100;
    
  };

  Asteroids.Util.inherits(MirrorShip, Asteroids.MovingObject);

  //overwrites isCollidedWith function to prevent collision on wrap
  MirrorShip.prototype.isCollidedWith = function (otherObject) {
    if (this.pos[0] > 0 && this.pos[0] < Asteroids.DIM_X) {
      var dist = Math.sqrt(Math.pow(this.pos[0] - otherObject.pos[0], 2) +
                        Math.pow(this.pos[1] - otherObject.pos[1], 2));
      return (dist < (this.radius));
    } else {
      return false;
    }
  };

  MirrorShip.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };

  //overwrites move function to mirror movements of player
  MirrorShip.prototype.move = function () {
    this.pos[0] = -this.game.ship.pos[0] - this.radius * 2;
    this.pos[1] = this.game.ship.pos[1];
    this.pos = game.wrap(this.pos, this);
  };

  MirrorShip.prototype.destroy = function () {
    this.game.remove(this);
    this.game.mirrorShip = undefined;
  };

})();
