(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }



  var Ship = Asteroids.Ship = function (objectParams) {
    Asteroids.MovingObject.call(this, objectParams);
  };

  Ship.RADIUS = 10;
  Ship.COLOR = "#ff0000"

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse) {
    console.log(impulse, this.vel);
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function () {
    console.log("adding a bullet");
    var ship = this;
    game.bullets.push(new Asteroids.Bullet({
      pos: this.pos.slice(0),
      vel: this.vel.slice(0),
      color: "#ff0000",
      radius: 1,
      game: this.game
    }));

  }

})();
