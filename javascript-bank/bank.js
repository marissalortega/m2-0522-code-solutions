/* exported Bank */
function Bank() {
  this.nextAccountNumber = 1;
  this.accounts = [];
}

Bank.prototype.openAccount = function (holder, balance) {
  if (Number.isInteger(balance) && balance > 0 && balance !== '') {
    var newAccount = new Account(this.nextAccountNumber, holder);

    newAccount.transactions = [{ type: 'deposit', amount: balance }];

    this.accounts.push(newAccount);

    this.nextAccountNumber++;

    return newAccount.number;
  } else {
    return null;
  }
};

Bank.prototype.getAccount = function (number) {
  for (var i = 0; i < this.accounts.length; i++) {
    if (Number.isInteger(number) && this.accounts[i].number === number) {
      return this.accounts[i];
    }
  }
  if (number >= this.accounts.length + 1) {
    return null;
  }
};

Bank.prototype.getTotalAssets = function () {

  if (this.accounts.length === 0) {
    return 0;
  }

  var totalAssets = 0;

  for (var i = 0; i < this.accounts.length; i++) {
    for (var j = 0; j < this.accounts[i].transactions.length; j++) {

      if (this.accounts[i].transactions[j].type === 'deposit' && totalAssets >= 0) {
        totalAssets += this.accounts[i].transactions[j].amount;
      } else if (this.accounts[i].transactions[j].type === 'deposit' && totalAssets <= 0) {
        totalAssets += this.accounts[i].transactions[j].amount;
      } else if (this.accounts[i].transactions[j].type === 'withdrawal' && totalAssets >= 0) {
        totalAssets -= this.accounts[i].transactions[j].amount;
      } else if (this.accounts[i].transactions[j].type === 'withdrawal' && totalAssets <= 0) {
        totalAssets -= this.accounts[i].transactions[j].amount;
      }
    }
  }
  return totalAssets;
};
