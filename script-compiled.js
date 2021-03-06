"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
  function Stopwatch(display) {
    _classCallCheck(this, Stopwatch);

    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  _createClass(Stopwatch, [{
    key: "reset",
    value: function reset() {
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
    }
  }, {
    key: "print",
    value: function print() {
      this.display.innerText = this.format(this.times);
    }
  }, {
    key: "format",
    value: function format(_ref) {
      var minutes = _ref.minutes,
          seconds = _ref.seconds,
          miliseconds = _ref.miliseconds;

      //przygotowuje tekst do wyswietlenia
      return pad0(minutes) + ":" + pad0(seconds) + ":" + pad0(Math.floor(miliseconds));
    }

    // format(times) {
    //   return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(
    //     Math.floor(times.miliseconds)
    //   )}`;
    // } //wynik to 02:04:23 (2 min, 4 s, 10 ms)


    // start() {
    //   let {
    //     running,
    //     watch,
    //     step
    //   } = this;

    //   if (!running) {
    //     running = true;
    //     watch = setInterval(() => step(), 10);
    //   }
    // }


  }, {
    key: "start",
    value: function start() {
      var _this = this;

      if (!this.running) {
        this.running = true;
        this.watch = setInterval(function () {
          return _this.step();
        }, 10);
      }
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.running) return;
      this.calculate();
      this.print();
    }
  }, {
    key: "calculate",
    value: function calculate() {
      var _times = this.times,
          miliseconds = _times.miliseconds,
          seconds = _times.seconds,
          minutes = _times.minutes;

      miliseconds += 1;
      if (miliseconds >= 100) {
        seconds += 1;
        miliseconds = 0;
      }
      if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
      }
      this.times = {
        minutes: minutes,
        seconds: seconds,
        miliseconds: miliseconds
      };
    }
    // calculate() {
    //   this.times.miliseconds += 1;
    //   if (this.times.miliseconds >= 100) {
    //     this.times.seconds += 1;
    //     this.times.miliseconds = 0;
    //   }
    //   if (this.times.seconds >= 60) {
    //     this.times.minutes += 1;
    //     this.times.seconds = 0;
    //   }
    // }

  }, {
    key: "stop",
    value: function stop() {
      this.running = false;
      clearInterval(this.watch);
    }
  }]);

  return Stopwatch;
}();

var stopwatch = new Stopwatch(document.querySelector(".stopwatch"));

var startButton = document.getElementById("start");
startButton.addEventListener("click", function () {
  return stopwatch.start();
});

var stopButton = document.getElementById("stop");
stopButton.addEventListener("click", function () {
  return stopwatch.stop();
});

//Funkcja pad0 przyjmuje na wejście wartość liczbową, przekształca ją na stringa, a następnie sprawdza czy długość tego przekształcenia jest mniejsza od 2 dodając tym samym zero przed tę liczbę.
function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}
