/* exported Bank */
function Bank() {
  this.nextAccountNumber = 1;
  this.accounts = [];
}

Bank.prototype.openAccount = function (holder, balance) {
  if (Number.isInteger(balance) && balance > 0 && balance !== '') {
    var newAccount = new Account(this.nextAccountNumber, holder);

    newAccount.deposit(balance);

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
  return null;
};

Bank.prototype.getTotalAssets = function () {

  if (this.accounts.length === 0) {
    return 0;
  }

  var totalAssets = 0;

  for (var i = 0; i < this.accounts.length; i++) {
    var balance = this.accounts[i].getBalance();
    totalAssets += balance;
  }
  return totalAssets;
};
