/* exported Account */
function Account(number, holder) {
  this.number = number;
  this.holder = holder;
  this.transactions = [];
}

Account.prototype.deposit = function (amount) {
  if (Number.isInteger(amount) && amount > 0 && amount !== '') {
    var newTransaction = new Transaction('deposit', amount);
    this.transactions.push(newTransaction);
    return true;
  } else {
    return false;
  }
};

Account.prototype.withdraw = function (amount) {
  if (Number.isInteger(amount) && amount > 0 && amount !== '') {
    var newTransaction = new Transaction('withdrawal', amount);
    this.transactions.push(newTransaction);
    return true;
  } else {
    return false;
  }
};

Account.prototype.getBalance = function () {

  var balance = 0;

  for (var i = 0; i < this.transactions.length; i++) {
    if (this.transactions[i].type === 'deposit' && balance === 0) {
      balance += this.transactions[i].amount;
    } else if (this.transactions[i].type === 'withdrawal' && balance !== 0) {
      balance -= this.transactions[i].amount;
    } else if (this.transactions[i].type === 'deposit' && balance !== 0) {
      balance += this.transactions[i].amount;
    }
  }
  return balance;
};
