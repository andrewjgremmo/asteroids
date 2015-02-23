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

  };

  GameView.prototype.bindKeyHandlers = function(){
    gameView = this;
    key('up', function(){gameView.game.ship.power([0,-1])});
    key('down', function(){gameView.game.ship.power([0,1])});
    key('right', function(){gameView.game.ship.power([1,0])});
    key('left', function(){gameView.game.ship.power([-1,0])});
    key('space', function(){gameView.game.ship.fireBullet()})
  }

})();
