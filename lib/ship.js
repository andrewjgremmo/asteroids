(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }



  var Ship = Asteroids.Ship = function (objectParams) {
    Asteroids.MovingObject.call(this, objectParams);
  }

  Ship.RADIUS = 10;
  Ship.COLOR = "#ff0000"

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  }

})();
