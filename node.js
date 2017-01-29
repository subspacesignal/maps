// Remember that V8 is written in C++ and so are node and its modules (rather
// than in .js). node.js is a C++ app which has V8 embedded in it. node isn't
// all C++ though, it comes with JavaScript code too, some to provide wrappers
// on the C++ but also other util code

// V8 has hooks which allow you to write C++ code which can be used by .js

// By extending V8 via its hooks you can make it look like there's functions
// built into the .js language which aren't in the spec

// node provides extensions to JavaScript to help organise code in separate
// pieces, deal with file IO, ability to communicate over the internet etc.

// installing node also installs npm

// nodejs implements the commonjs standard which results in the modules feature
// modules allow you to write code which is isolated and can't collide with
// other modules

// You can create an app.js and greet.js in the same directory
// in app.js:
require('./greet.js');
// this is node's built-in requirejs extension to JavaScript
// requiring greet.js will actually execute any code in it e.g. in greet.js:
var greet = function() {
  console.log('hi');
}
greet();
// then running "node app.js" will actually print hi

// however, must remember that node modules are designed to avoid code
// collisions, so you cannot just call greet(); from app.js, it won't know that
// function yet.
// If you want it to be available you must make it 'public' available, in
// greet.js:
module.exports = greet;
// To use it in app.js you must save the result of the require statement,
// calling require returns the module.exports of whatever you required:
var greet = require('./greet.js');
// You can then execute the greet function from app.js using:
greet();

// the .js part of the filename in require is optional, this works:
var greet = require('./greet');

// require appears to be able to also load .json and .node files but you must
// specify the file extension as .js is the default

// internally require loads the referenced file and wraps it in an immediately
// invoked function expression (IIFE) which prevents is from colliding with
// other code before passing it to V8 i.e. when you write a module you're
// actually writing the body of a function
// splitting module code into separate files:
// you can create a folder containing an index.js so when you call require you
// pass the folder name
// in for example, english.js:
var greet = function() {
  console.log('Hello');
}
module.exports = greet;
// in for example, spanish.js:
var greet = function() {
  console.log('Hola');
}
module.exports = greet;

// add your seperate files into the module folder, then in the index.js:
var english = require('./english');
var spanish = require('./spanish');
module.exports = {
  english: english,
  spanish: spanish
}
// so when you require this you'll have:
var greet = require('./greet')
greet.english();
greet.spanish();
// reading json, add a greetings.json to the module:
{
  "en": "Hello",
  "es": "Hola"
}
// In english.js:
var greetings = require('./greetings.json');
console.log(greetings.en);

// you can require specific things:
var greet2 = require('./greet2').greet;

// modules can also have function constructors and do:
module.exports = new Greeter();
// then from app.js or wherever you used require:
var greet3 = require('./greet3'); // greet3 is the new object
greet3.greet(); // (function constructor described an object with a greet
// function)
// unintuitively, this is not actually creating a new object each time you use
// require on the module, this is because node's require code caches the module
// meaning if you call require on a module all over your project you get the
// same object
// if you really do want a new object each time your module should:
module.exports = Greeter;
// and the calling code:
var greet4 = require(...)
var temp = new greet4(); // because greet4 is a function constructor

// to have public private access on module code:
var greeting = 'hello'; // remains inaccessible/private

function greet() { // public
  console.log(greeting);
}

module.exports = {
  greet: greet
  // list everything here that you want exposed 'publicly'
}
// from calling code:
var temp = require('./greet5').greet;

// to avoid complications it's best to always refer to exports as module.exports
// there's some weird quirk in javascript where even though exports and
// module.exports are both the same and both available (due to node's require
// wrapping your module code as a function body) - doing module.exports = is
// fine but doing exports = will break it by ending up pointing to a different
// object because of the equals. just pretend exports doesn't exist, but you'll
// probably see code out there that does use it.

// node core modules are built-in:
var util = require('util');
// note you don't need the ./ in the path
// you could still have your own module named util because you'd use:
var util = require('./util');
// and it would be found before the core module but it's easier to just avoid
// using the same name

// node has 2 types of events, but they're often thought of as one
// one type is system events which is from the C++ core and libuv
// second type is custom events from the javascript core's event emitter
// libuv is sending events from C++ but it often generates a javascript event
// making it look like a custom event
// the javascript event side is faking it, it's not real events, javascript
// doesn't have an eventing concept,

// build your own event emitter:
// listeners will not be invoked simultaneously, one after another (same as
// node's event emitter?)
// create a new module emitter.js:
function Emitter() { // function constructor
  this.events = {
  };
}
Emitter.prototype.on = function(type, listener) { // listener will be a function
  // if it exists already great, otherwise create empty array
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
}
// so you're building an Emitter object containing an array of events and each
// array entry is an event type e.g. onSomething and it maps to a list of
// functions which are the 'listeners' which should be invoked if the event
// triggers

Emitter.prototype.emit = function(type) {
  if (this.events[type]) {
    this.events[type].forEach(function(listener) {
      listener();
    });
  }
}
module.exports = Emitter;

// in app.js
var Emitter = require('./emitter');
var emtr = new Emitter();
emit.on('greet', function() {
  console.log('hi');
});

emit.on('greet', function() {
  console.log('hi 2');
});

console.log('hello');
emtr.emit('greet');

// using node's event emitter:
var Emitter = require('events');
var emtr = new Emitter();
// and the same code adding listeners and emitting an event from above works

// defining constants in an config file: create a new module config.js:
module.exports = {
  events: {
    GREET: 'greet'
  }
}
// then in app.js:
var config = require('./config');
// or
var eventConfig = require('./config').events;
// now you can use:
eventConfig.GREET
