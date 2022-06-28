let counter = 3;

const countdown = setInterval(() => {

  if (counter > 0) {
    console.log(counter);
  }

  if (counter === 0) {
    console.log('Blast off!');
    clearInterval(countdown);
  }

  counter--;
}, 1000);
