const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');

const numberX = parseFloat(process.argv[2]);
const numberY = parseFloat(process.argv[4]);

if (process.argv[3] === 'plus') {
  console.log('result:', add(numberX, numberY));
} else if (process.argv[3] === 'minus') {
  console.log('result:', subtract(numberX, numberY));
} else if (process.argv[3] === 'times') {
  console.log('result:', multiply(numberX, numberY));
} else if (process.argv[3] === 'over') {
  console.log('result:', divide(numberX, numberY));
}
