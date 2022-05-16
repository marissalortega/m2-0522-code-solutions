
var counter = 4;

var timer = setInterval(function () {

  document.querySelector('.countdown-display').textContent = counter;
  counter -= 1;

  if (counter < 0) {
    clearInterval(timer);
    document.querySelector('.countdown-display').textContent = '~Earth Beeeelooowww Us~';
  }
}, 1000);
