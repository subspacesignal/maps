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

// node's util module 'util.inherits' functionality:
var EventEmitter = require('events');
var util = require('util');

function Greetr() { // function prototype
  this.greeting = 'hello world';
}
// make all event emitter available to Greetr objects
util.inherits(Greetr, EventEmitter);

Greetr.prorotype.greet = function() {
  console.log(this.greeting);
  this.emit('greet');
}

var greeter1 = new Greetr();
greeter1.on('greet', function() {
  console.log('someone greeter');
});

// won't find greet() on object but will on its prorotype
// greet itself uses emit which won't be found either but will eventually in
// the EventEmitter code
greeter1.greet();
// output will be "hello world" followed by "someone greeted"

// If you wanted to pass some data via the event emitter:
Greetr.prorotype.greet = function(data) {
  console.log(this.greeting + ': ' + data);
  this.emit('greet', data);
}
greeter1.on('greet', function(data) {
  console.log('someone greeter' + data);
});
greeter1.greet('yo');
// this is all used in node in a way that means objects can do work but also
// emit events about what they're doing

// node has 'real' ES6 it's not using babeljs or similar

// If you wanted to add EventEmitter to the root object itself rather than the
// prototype:
function Greetr() { // function prorotype for Greetr objects
  EventEmitter.call(this);
  this.greeting = 'hello';
}
// EventEmitter itself is a function constructor so by passing this via .call
// you're overriding the default this which EventEmitter would have had.
// (could have also used .apply)
// A simpler example of this:
var util = require('util');

function Person() {
  this.firstname = 'jane';
  this.lastname = 'doe';
}

Person.prototype.greet = function() {
  console.log('Hello ' + this.firstname + ' ' + this.lastname);
}

function Policeman() {

  // without this line, officer would be created with badgenumber but firstname
  // and lastname would be undefined because inherits changes the prototype
  // reference
  Person.call(this); // make sure the person portion of officer also uses the
  // same this reference as officer
  this.badgenumber = '1234';
}

util.inherits(Policeman, Person);
var officer = new Policeman();

// Inheriting from event emitter using ES6 classes (don't need to use
// util.inherits anymore):
'use strict';
class Greetr extends EventEmitter { // similar to util.inherits
  constructor() {
    super(); // similar to EventEmitter.call(this);
    this.greeting = 'hello';
  }

  greet(data) {
    console.log(this.greeting + ': ' + data); // could have used ES6 backticks
    this.emit('greet', data);
  }
}

// In a module, you can export a 'class expression':
module.exports = class Greetr extends EventEmitter {
  // ...
// then you can use this class wherever you require the module

// node does things asynchronously in C++/libuv, V8 does not, it's synchronous

// It seems likely that listeners added to the event emitter will execute
// synchronously in the order the listeners were added when an event is emitted

// libuv talks directly to the OS and deals with events coming from the OS e.g.
// open a file or download something from the internet, the OS sends events to
// libuv's event queue
// libuv has an event loop which is constantly checking the event queue for
// work
// note that on each libuv event loop check of the queue it may find more than
// one new event
// when libuv sees things in the queue, it calls their javascript callback back
// into V8
// when you see node's tagline "event driven non-blocking I/O in V8 javascript"
// event driven refers to this node events and callbacks
// non-blocking I/O refers to the OS events and how .js continues to execute in
// V8 regardless, V8 will synchronously get around to libuv events when it can.
// this is why node can't block, it's synchronous execution
// libuv is a C library written primarily for node but has no dependency on node

// node's Buffer object, the buffer is managed on the C++ side of node and made
// avaliable to V8
// it stores binary data, converts between buffers and javascript strings etc.
// Buffer is a global core module, don't need to require it
var buf = new Buffer('Hello', 'utf8'); // utf8 is default
console.log(buf); // prints out <Buffer 48 ....> (hex representation of Hello)
console.log(buf.toString()); // prints Hello because it knows the encoding
// can convert buffer to json
console.log(buf.toJSON); // prints out json representation
// you can use it like an array
buf[2];
buf.write('wo'); // results in wollo because buffers are fixed size and writing
// wo wrote it into the first two slots in the buffer
// buffers supposedly exist in node because JS didn't have good ways of dealing
// with binary data, however ES6 has improvements now

// node filesystem module:
var fs = require('fs');
// __dirname is provided by node's wrapping function and is the directory where
// the code currently executing exists so greet.txt would have to be at the
// readFileSync reads the whole file into a node Buffer object
// sync does mean synchronous so this blocks until the entire file is read.
var greet = fs.readFileSync(__dirname + '/greet.txt'); // also add , 'utf8'
// if you were doing this for multiple users with large files they'd all be
// blocked.
// parameter but utf8 is default
console.log(greet);

// async with callback:
// err will be null if there's no error
// this is a common pattern in node called 'error first callbacks'
// data is a node binary Buffer, you could do data.toString() or tell readFile
// that it's utf8
var greet2 = fs.readFile(__dirname + '/greet.txt', function(err, data) {
  console.log(data.toString());
});
// or
var greet2 = fs.readFile(__dirname + '/greet.txt', 'utf8', function(err, data) {
  console.log(data);
});
// again note this is async so code after fs.readFile continues to execute
// remember that while fs.readFile is async it's also storing an entire file in
// a node Buffer on V8's heap so if it's a huge file...

// streams:
// node streams are also event emitters, so as they operate they emit events
// node has multiple types of streams - readable, writable, duplex (read and
// write), transform (modify data as it passes through), passthrough
// readable (for example) inherits from stream which inherits from event emitter
// streams are essentially a base/abstract class (never used directly)
// you can implement your own custom streams too
// readable means node can read data from a streams
// writable means node can write data to a streams
// in http comms, from node's perspective, requests from the browser are
// readable streams and responses sent to the browser are writable streams

var fs = require('fs');
var readable = fs.createReadStream(__dirname + '/greet.txt');
readable.on('data', function(chunk) {
  console.log(chunk); // prints binary
});
// the 'data' event is emitted by the stream when the internal buffer is full,
// if the file was smaller than the buffer then you'd get the entire file
// backticks in one event.
var fs = require('fs');
var readable = fs.createReadStream(__dirname + '/greet.txt',
 { encoding: 'utf8' });
readable.on('data', function(chunk) {
  console.log(chunk); // prints text
});
// You can set the internal buffer size using the highWaterMark: 1024 option

var writable = fs.createWriteStream(__dirname + '/greet-copy.txt');
readable.on('data', function(chunk) {
  writable.write(chunk);
});
// obviously the smaller the buffer, the less memory you use per stream

// pipes - used to connect two streams e.g. readable to a writable stream
// you can chain multiple streams together using multiple pipes in between but
// remember that you'd have to be connecting a readable stream to a stream which
// is both writable and readable always to do this
// readable streams have a pipe function which takes a destination
// pipe returns the destination after it's completed
readable.pipe(writable); // instead of the readable.on above
readable.pipe(duplexStream).pipe(...) // due to pipe returning destination
var zlib = require('zlib'); // creates .gz files rather than .zip
var gzip = zlib.createGzip(); // duplex stream
readable.pipe(gzip).pipe(compressed) // compressed is a writable stream
// this is 'method chaining'

// node encourages the use of async/streams/pipes as much as possible

// networking:
// remember IP (internet protocol) establishes a socket between machines
// TCP figures out how to reliably send data in that socket (using packets)
// node treats TCP as streams
// when you talk about websockets you're talking about keeping that IP socket
// open for a long time
var http = require('http');

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('hello world\n');
}).listen(1337, '127.0.0.1');

// by default you need to restart node to see changes you make in the running
// JavaScript

// you could do:
res.writeHead(200, { 'Content-Type': 'text/html' });
var html = fs.readFileSync(__dirname + '/index.html');
res.end(html); // passed as binary Buffer but you can pass a string too

// async version:
fs.createReadStream(__dirname + '/index.html').pipe(res);
// streaming data to the response aligns well with how tcp is working anyway..
// it's sending chunks to the browser so if it has enough bytes to send another
// chunk given to it by node..

// writing JSON
res.writeHead(200, { 'Content-Type': 'application/json' });
var obj = {
  firstname: 'jane',
  lastname: 'doe'
};
res.end(JSON.stringify(obj));
// if it was JavaScript in the browser which made this request to node it could
// very easily convert the JSON back to an object (serialization/
// deserialization) and vice versa (json sent from browser to node)

// (basic) routing:
if (req.url === '/') {

} else if (req.url === '/api') {

} else {
  // 404
}
