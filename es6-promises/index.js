const takeAChance = require('./take-a-chance');

const promise = takeAChance('Marissa')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error.message);
  });
