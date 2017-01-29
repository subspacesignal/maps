// If you declare a variable in a .js file e.g.
var filename = "1.txt";
// you're doing it in the global namespace so your own code or 3rd party
// libraries can easily collide. To counteract this, one pattern is
var myUniqueAppName = {}; myUniqueAppName.filename = "1.txt";
// The same is true of functions e.g.
myUniqueAppName.sayHello = function() { console.log("hi"); }
// (invoked using
myUniqueAppName.sayHello();)

// Declaring an "object"?
var Person = function(firstname, lastname) {
  this.firstname = firstname;
  this.lastname=lastname;
}
var demo = new Person("foo", "bar");

// If you console.log a function name without invoking it e.g.
console.log(hi);
// rather than
console.log(hi());
// I think it'll print out the source code of the function. Same with
var temp = hi.toString();

// Somehow in javascript:
$scope.temp = $filter('uppercase')($scope.name);
// is passing the variable name to a uppercase function and temp will end up
// with the uppercase string version of name. Potentially,
functionName(temp)(temp2, temp3)
// doesn't pass temp2 and temp3 directly to temp but instead passes a single
// parameter which contains temp2 and temp3?

// In JavaScript everything is a function?

// Arrays can be declared like:
var things = [1, 2, 3];
// but the types don't need to match e.g.
var things2 = [1, '2', 3];
// Not only different types of variables but even (unnamed?) functions e.g.
var things3 = [1, '2', function() {}];
// and invoke e.g.
things3[2]();

// You can always do
document.getElementById("nameId");

// DOM elements are always emitting events, you just have to listen for them
var nameElement = document.getElementById("nameId");
nameElement.addEventListener("keypress", function(event){
  console.log("a key was pressed")
});

// JavaScript seems to always have an event loop running which is how, for
// example, DOM elements emitting events happens and how addEventListener can
// work.

// You can do
setTimeout(function() {
  console.log('blah');
}, 3000);

// != can work but !== compares values and also that they're both of the same
// type? and is considered better?

// === is also a thing, unsure if this is similar

// XHR means XMLHttpRequest, its name is misleading as it can use
// XML/JSON/HTML/plaintext and can use protocols other than HTTP. Ajax relies on
// this to work.
// XMLHttpRequest is fundamental - basically any web framework is built on it.

$scope.num = $routeParams.num || 1; // means if $routeParams.num exists return
// that or else return 1

// In JavaScript functions... using this from inside a function refers to the
// function when often you might want to refer to the 'parent this'
// assinging it to something like a self var is a common pattern to work around
myApp.service('nameService', function() {
  // all functions and properties you want in your service
  this.name = 'John Doe';
  var self = this;
  this.nameLength = function() {
    return self.name.length;
  };
});

// ECMASCRIPT is pronounced ek-mah-script

// Remember that concepts like the DOM and AJAX etc. are not part of the
// JavaScript language even though they appear to be when you write JavaScript
// code. These are extensions to the language provided by the browser.

// javascript has first-class functions. This means functions can be referenced,
// assigned, passed around just like any other type such as a string or int.

// Doing
var temp = function() { blah; };
// is just how you do an assignment expression for a function e.g. it's similar
// to
var temp = 'hi';
// or
var temp = 3;
// (you're assigning an anonymous function to a variable)
// You could pass your temp function to another function e.g. doIt(temp) where
// doIt calls temp(); or you could avoid using a variable at all and pass your
// function anonymously e.g. doIt(function() { blah; });

// In JavaScript every object is only a collection of name/value pairs

// You can define an object literal:
var myObject = {
  temp: 'hi',
  temp2: 'hi2',
  temp3: // This is another object
  {
    floor: 3,
    another: 5
  },
  greet: function() {
    console.log('hi ' + this.temp2);
  }
}
myObject.greet();
// You can access an object's properties without using . also:
myObject['temp2'];
// is also valid and useful when you want to dynamically choose which property
// to access on an object

// inheritance in javascript is 'prototypal inheritance'
// every object has a refernce to another object which is the prototype
// properties in a prototype can be accessed as if they're on the root object
// properties in a prototype can even be prototypes themselves and those too can
// be accessed as if they're on the root object

// ES6 has a 'class' keyword, there's also something (non-ES6?) called
// object.create

// node creates objects via 'function constructors', these are normal functions
// with the purpose of constructing objects:

function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}
var jane = new Person('John', 'Doe');
// the 'new' keyword invoked on a function constructor causes the this reference
// to automatically point to a new object and this also returns that new object
// so that it can be saved on a var reference

// To use the prototype:
Person.prototype.greet = function() {
  console.log('hello ' + this.firstname + ' ' + this.lastname);
}
// this means that this is the prototype of any object you create using the
// function constructor i.e. jane has this prototype with greet in it now.
// when you run jane.greet(); it'll first look for the function on jane and then
// check jane's prototype for it.
// so whenever you see a prototype like above you're making it so that anything
// in there is available to all objects created using the function constructor.
// you can print an object's prototype using
console.log(jane.__proto__);
// all instances have the same prototype

// in JS, primtives are pass by value and objects are pass by reference

// immediately invoked function expressions:
// you can do:
function() {
  var firstname = 'jane';
  console.log(firstname);
}
// then:
(function() {
  var firstname = 'jane';
  console.log(firstname);
});
// then:
(function() {
  var firstname = 'jane';
  console.log(firstname);
}());
// that will immediately invoke, so:

var firstname = 'jane2';
(function() {
  var firstname = 'jane';
  console.log(firstname);
}());
console.log(firstname);
// will print jane and then jane2
// JS developers use this to scope code so that it doesn't unintentionally
// collide/affect anything outside of it i.e. setting firstname inside the IIFE
// didn't interfere with what had been set in the previous code.
// You can also pass params:
(function(lastname) {
  var firstname = 'jane';
  console.log(firstname);
  console.log(lastname);
}('Doe'));

// JSON was inspired by javascript's object literals
// JSON's name/value pairs have the name wrapped in "" whereas object literals
// don't

// ES6 has its own modules, similar to node modules i.e. V8 itself supports
// modules

// you can use .push on arrays (ES6 only?)
var arr = [];
arr.push(1);

// arrays have forEach
arr.forEach(function(item) {
  item(); // if it was an array of functions
});
