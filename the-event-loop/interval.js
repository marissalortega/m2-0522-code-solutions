let counter = 3;

const countdown = setInterval(() => {
  console.log(counter);
  counter--;
  if (counter === 0) {
    clearInterval(countdown);
    console.log('Blast off!');
  }
}, 1000);
