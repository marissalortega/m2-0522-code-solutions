function ExampleConstructor() {

}

console.log('value of the ExampleConstructor.prototype:', ExampleConstructor.prototype);
console.log('typeof ExampleConstructor.prototype:', typeof ExampleConstructor.prototype);

var newExample = new ExampleConstructor();
console.log('value of newExample:', newExample);

var instOf = newExample instanceof ExampleConstructor;
console.log('value of instOf:', instOf);
