(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {

    inherits: function (ChildClass, ParentClass) {
      var Surrogate = function () {};
      Surrogate.prototype = ParentClass.prototype;
      ChildClass.prototype = new Surrogate();
    },

    randomVec: function (length) {
      var x = Math.floor(Math.sqrt(length * length * Math.random()));
      var y = Math.floor(Math.sqrt(length * length - x * x));

      var signFlagX = Math.floor(Math.random() * 2);
      var signFlagY = Math.floor(Math.random() * 2);

      if (signFlagX === 1) {
        x *= -1;
      }

      if (signFlagY === 1) {
        y *= -1;
      }

      return [x, y];
    }
  };

})();
