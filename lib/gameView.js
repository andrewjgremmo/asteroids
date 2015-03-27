(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    window.setInterval(function () { 
      this.game.step();
      this.game.draw(this.ctx); }, 20);

    window.setInterval(function () { moveCallback(); }, 40);
    window.setInterval(function() { fireCallback();}, 200);
  };

  var moveCallback = function () {
    if(key.isPressed("up")) this.game.ship.power();
    if(key.isPressed("left")) this.game.ship.turnLeft();
    if(key.isPressed("right")) this.game.ship.turnRight();
    if(key.isPressed("down")) this.game.ship.stop();
  };

  var fireCallback = function () {
    if(key.isPressed("space")) this.game.ship.fireBullet();
  };

  GameView.prototype.bindKeyHandlers = function(){
    gameView = this;
    key('space', function(){ gameView.game.ship.fireBullet(); });
  };


})();
