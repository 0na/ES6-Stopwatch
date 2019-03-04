class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }
  print() {
    this.display.innerText = this.format(this.times);
  }

  format({
    minutes,
    seconds,
    miliseconds
  }) {
    //przygotowuje tekst do wyswietlenia
    return `${pad0(minutes)}:${pad0(seconds)}:${pad0(
      Math.floor(miliseconds)
    )}`;
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


  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }


  calculate() {
    let {
      miliseconds,
      seconds,
      minutes
    } = this.times;
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
      minutes,
      seconds,
      miliseconds
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

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }
}
let stopwatch = new Stopwatch(document.querySelector(".stopwatch"));


let startButton = document.getElementById("start");
startButton.addEventListener("click", () => stopwatch.start());

let stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => stopwatch.stop());

//Funkcja pad0 przyjmuje na wejście wartość liczbową, przekształca ją na stringa, a następnie sprawdza czy długość tego przekształcenia jest mniejsza od 2 dodając tym samym zero przed tę liczbę.
function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}