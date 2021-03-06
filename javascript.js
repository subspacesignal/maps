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
// don't (but I think may still work if you wrap the name in ''? possibly even
// ""?)

// ES6 has its own modules, similar to node modules i.e. V8 itself supports
// modules

// you can use .push on arrays (ES6 only?)
var arr = [];
arr.push(1);

// arrays have forEach
arr.forEach(function(item) {
  item(); // if it was an array of functions
});

// Every prototype has its own prototype?
// many objects can point to the same prototype, this is inheritance in JS
// In ES6 there are 'class' and 'extend' keywords which hook up prototype refs
// Alternative to function constructors and class/extend is Object.create():
var person = {
  firstname: '',
  lastname: 'Doe',
  greet: function() {
    return this.firstname + ' ' + this.lastname;
  }
}
var jane = Object.create(person); // create jane from/out of the person object
// this makes jane's prototype be the person object
// you can overwrite the prototype's values:
jane.firstname = 'override';
jane.greet(); // prints Jane Doe

// ES6 is ecmascript 2015
// babeljs.io converts ES6 to older javascript

// ES6 backticks:
var name 'jane';
var greet = `Hello ${ name }`;

// .call and .apply let you change what the this reference points to in an
// object.
// .call:
var obj = {
  name: "jane doe",
  greet: function() {
    console.log(`Hello ${ this.name }`);
  }
}
// You normally:
obj.greet();
// but you can pass an object to override things via .call:
obj.greet.call({ name: 'doe jane'});
// if you needed to pass params to the greet function too:
obj.greet.call({ name: 'doe jane'}, data1, data2);
// .apply is very similar
obj.greet.apply({ name: 'doe jane'});
// but if you needed to pass params to the greet function too:
obj.greet.call({ name: 'doe jane'}, [data1, data2]); // pass params as array

// the this keyword in a function constructor represents the object being
// created when you use the 'new' keyword

// Always make the JS engine be more strict and give more errors
// Some new JS features cannot be used unless strict mode is on e.g. for ES6
// classes.
'use strict';

// ES6 classes:
// it's syntactic sugar rather than doing anything very differently
// important to remember that when you see the class keyword, it's just not the
// same as classes from other languages, it's just a short way of doing the same
// prototypal inheritance internally
'use strict';

class Person {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  greet() { // automatically put on the prototype
    console.log('hello' + this.firstname + this.lastname);
  }
}
var jane = new Person('jane', 'doe');

// javascript is synchronous

// ES6 typed arrays
var buffer = new ArrayBuffer(8); // size is in bytes, so 64 bits
var view = new Int32Array(buffer); // int 32 so 32 bits per number
view[0] = 5;
view[1] = 15;
console.log(view);

// remember that browsers provide functionality which doesn't exist natively in
// JavaScript e.g. the DOM
// remember the DOM is likely implemented in C/C++, JavaScript is just given
// access
// when the browser loads a HTML document it just reads it once and it's kinda
// throwaway from there, the browser has a DOM tree in memory

// Array.prototype.filter():
// Filters the entire array based on a criteria and returns an array of only
// the items which matched the criteria
const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1643, passed: 1727 }
];

// tip:
// you can do:
console.table(inventors);
// and chrome will show the array as a table instead of [Object, Object]

// inventors born in the 1500's
// verbose form:
const fifteen = inventors.filter(function(inventor) {
  if (inventor.year >= 1500 && inventor.year < 1600) {
    return true;
  } else {
    return false;
  }
});
// doesn't need the else
const fifteen = inventors.filter(function(inventor) {
  if (inventor.year >= 1500 && inventor.year < 1600) {
    return true;
  }
});
// can you arrow function
const fifteen = inventors.filter(inventor => {
  if (inventor.year >= 1500 && inventor.year < 1600) {
    return true;
  }
});
// inline
const fifteen = inventors.filter(inventor => {
  return inventor.year >= 1500 && inventor.year < 1600;
});
// more
const fifteen = inventors.filter(inventor => (inventor.year >= 1500 &&
  inventor.year < 1600));
// more
const fifteen = inventors.filter(inventor => inventor.year >= 1500 &&
  inventor.year < 1600);

// Array.prototype.map()
// Takes an array, does something to each item in the array and returns an array
// of the exact same length, it's like a tranformation pipe
const fullNames = inventors.map(inventors => inventor.firstname
  + ' ' + inventor.lastname);
//(could have used a template string)

// Array.prototype.sort()
// you get two items at a time and you're asked to sort just those 2 items by
// returning 1 and -1
const ordered = inventors.sort(function(firstPerson, secondPerson) {
  if (firstPerson.year > secondPerson.year) {
    return 1;
  } else {
    return -1;
  }
});
// shorter:
const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);

// Array.prototype.reduce()
// If you have logic like:
var totalYears = 0;
for (var i = 0; i < inventors.length; i++) {
  totalYears += (inventors[i].passed - inventors[i].year);
}
console.log(totalYears);
// you can use reduce instead
// it kinda collects a running total as it iterates through a year
const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventors.passed - inventor.year;
}, 0);
// the 0 at the end is because on the first iteration there won't be a total
// yet and when it's passed to use it will be equal to undefined, so we're
// telling it to use 0 as an initial value.

// sort inventors by years lived:
const oldest = inventors.sort(function(a, b) {
  const lastGuy = a.passed - a.year;
  const nextGuy = b.passed - b.year;
  // could have used ternary operator ? :
  if (lastGuy > nextGuy) {
    return -1;
  } else {
    return 1;
  }
});

// create a list of boulevards in paris that contain 'de' anywhere in the name
// you can use document.querySelector but you can also call querySelector on
// DOM elements:
// query selector returns a NodeList, not an Array
// could do:
const links = document.querySelector('.mw-category a');
// but also could do:
const categories = document.querySelector('.mw-category');
const links = categories.querySelectorAll('a');
// querySelectorAll gets all matches, not just the first?
const de = links.map(link => link.textContent); // NodeList won't have .map
// could do:
const de = Array.from(links.map(link => link.textContent));
// could also have used ES6 spread instead:
// a spread will take every item out of an iterable and put it into an array
// containing all iterable items
const links = [...categories.querySelectorAll('a')];
// filter:
const de = links
            .map(link => link.textContent)
            .filter(streetName => streetName.includes('de'));

// Sort the people alphabetically by last name:
const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel'];
const alpha = people.sort(function(lastOne, nextOne)) {
  // 'destructure'
  // gives you proper variable names instead of parts[0] and parts[1]
  const [aLast, aFirst] = lastOne.split(', ');
  console.log(aLast, aFirst);
  const [bLast, bFirst] = nextOne.split(', ');
  return aLast > bLast ? 1 : -1;
  // note that destructuring didn't modify the original array in any way, sort
  // still returns the exact same array, just in a different order
}

// sum up the instances of each of these
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car'];
// use reduce
const transportation = data.reduce(function(obj, item) {

}, {
  car: 0,
  walk: 0,
  truck: 0
  // isn't really practical because you don't know every possible value ahead of
  // time so instead:
});

const transportation = data.reduce(function(obj, item) {
  // obj is our empty object below, can treat it like an array, one entry for
  // each type
  // if it doesn't already exist (first iteration for this type):
  if (!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++; // increment number of types this particular type was seen
  return obj; // return the object which contains all counts of all types
}, {); // empty object here and handle it ourselves above
