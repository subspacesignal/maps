// JQuery reads the DOM and writes the DOM - Angular lets you update one and the
// other automatically updates.

// Angular uses custom HTML attributes with ng- prefix (data- attributes are
// officially supported in HTML5 but it doesn't use them). If you go 'official'
// and use data-ng- Angular will tolerate this and still work.

// Importing angular.js (or angular.min.js) in a <script src= tag IS enabling
// all of angular

// Angular helps you to not pollute/collide the javascript global namespace by
// only getting you to create one JavaScript variable for it e.g. in your app.js
var myApp = angular.module('myApp', []);
// (1st param is app name, 2nd param is array of dependencies)

// You must tell Angular which part of the view you want it to control, one
// option is at the highest level e.g.
<html lang="en-us" ng-app="myApp">
//This way Angular knows to look for your app's name.

// You start in your app.js after the angular variable declaration with e.g.
myApp.controller('mainController', function() { });
// In your corresponding html, on any element you can do e.g.
<div class="container"><div ng-controller="mainController"></div></div>
// to connect them.

// In your
myApp.controller('mainController', function() { });
// you can introduce
myApp.controller('mainController', function($scope) { });
// (the $ doesn't mean anything special, just part of the name of the param).
// This is angular doing dependency injection.

// $scope is actually an angular service (and all angular services start with $
// in their name)

// You can add variables and functions to the $scope e.g.
$scope.filename = "1.txt";
// If you inspect $scope in the javascript console you'll see filename added to
// it. e.g. in global namespace:
console.log($scope);
// (I think this is a way to see it in the console, need to experiment)

// $scope is the middleground between view and controller

// Because in JavaScript you can
console.log(functionName)
// to see the source code of a function or
var temp = functionName.toString();
// 3rd party libs like Angular can parse the source code and thus, parameter
// names of a function and manipulate. Angular is working this way. This is how
// it does dependency injection, in fact you can simulate:
console.log(angular.injector().annotate(functionName));

// $log is another example of a built in angular service which you can get
// injected to your controller and use it e.g.
$log.info("hi");

// $filter is another service e.g.
$scope.temp = $filter('uppercase')($scope.name);

// Typically your source imports the angular.min.js file first, lastly your own
// app.js and in between any additional services you want e.g.
// angular-messages.min.js. You also must tell Angular that you want to use it,
// in your var myApp = angular.module('myApp', []); this is where the array of
// dependencies is used e.g.
var myApp = angular.module('myApp', ['ngMessages']);
// From then on things like
<div ng-messages="myForm.myField.$error">
// are available ($error is a service)

// Due to the way Angular relies on introspecting on the source code of
// functions and searching for it's own keywords e.g. $scope to do dependency
// injection, JavaScript minifiers can potentially cause problems by obfuscating
// $scope to something shorter. Angular has another way of doing DI which gets
// around this (and is the recommended way?): myApp.controller('mainController',
function($scope, $log) {
  $log.info($scope);
});
// becomes: instead of passing a controller name and a function containing all
// the controller code to the controller as params, change to passing a
// controller name param and an array param e.g.
myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {
  $log.info($scope);
}]);
// (Remember that in JavaScript arrays can contain mixed types and even
// functions)(Remember that for Angular, the last element of the array must be
// the function) The array elements before the function must match the
// parameters in the function itself which was passed as the final array
// element. This works because a minifier will never change the values of
// strings e.g. '$scope' and the Angular dependency injector is clever enough to
// spot this pattern and realise that it's attempting DI and whatever the
// shortened variable name set by the minifier is should be assigned the $scope.
// Remember that in a debugger if you're debugging minified JavaScript you're
// going to see a strange object called 'a' or 'xy' or whatever which is
// actually $scope in disguise. Remember it's vital that the order matches
// between the string array elements and the function parameters, otherwise
// Angular will set $scope to the wrong variable and vice versa.

// Angular errors which mention an injector seem to tend to relate to dependency
// injection failures.

// If you do $scope.name = 'Jane'; in a controller which is hooked up to an
// element in the index.html allows you to do string interpolation e.g.
<h1>hello {{ name }}</h1>
// (i.e. $scope is implicit in the view) you can even do
{{ name + '. How are you?' }}
// Remember that the html which is downloaded by the browser is
<h1>hello {{ name }}</h1>
// it's Angular's JavaScript running after download that is modifying the DOM,
// when you inspect it later in the browser you'd see hello Jane as it's
// inspecting the DOM's current state, not initial state. Remember that Angular
// runs live all the time, not just once when the page is initially loaded e.g.
// if a controller had a timer to change a $scope variable after 5 seconds, the
// page itself would actually live update after 5 seconds to the new value.
// Angular's $timeout service can demo this.

// A directive is a command sent to Angular to manipulate a piece of the DOM
// e.g. add a class, hide something, create something etc. (directive naming
// comes from directing some change in the app, changing the state its in).
// ng-controller and ng-app were actually directives, so one of the ways to use
// directives is via custom HTML attributes.

// From the view to the controller direction, you tell angular you want to bind
// something to a variable in the $scope using the ng-model directive e.g.
<input type="text" ng-model="filename"/>
// will be bound to $scope.filename in the controller code. This is 2-way
// binding so typing into the input form will populate $scope.filename in the
// controller code but if it's modified by the controller it'll also be
// reflected in the view. In that same view you might also show the current
// value for filename elsewhere on the page using string interpolation e.g.
{{ filename }}
// you could then uppercase the $scope.filename value in the controller so as
// you type in the form it'll come out live elsewhere on the page as uppercase.

// $filter is an Angular service which can do things like uppercase/lowercase
// strings

// If you add a function to $scope you can invoke it from the view using
{{ myFunction() }}

// MV* or MVW is thrown around in relation to Angular meaning
// Model-View-Whatever (a play on MVC)

// Angular is adding event listeners for you and extending the event loop in
// order to keep the model and view constantly in sync. It has something called
// the 'Angular Context' which is Angular's state/view/tracking of everything
// going on. Angular Context contains 'watchers' which watch for changes on
// things it knows are bound via the $scope. Angular has its own form of event
// loop called the 'digest loop' which goes through all the watchers checking
// for changes. When it finds a change it can figure out anything which is
// connected to it which needs to be updated (both in the DOM and in code) after
// this it runs one more digest cycle to find out if making its updates actually
// caused another watcher to change and so on until no watchers are found
// changed. Watchers contain a copy of old values so they can be compared with
// the current value to know if a change has occurred.

// You can manually add something to the 'watch list' (list of watchers in the
// angular context) e.g.
$scope.temp = "blah"; $scope.$watch('temp', function(newValue, oldValue) {});

// One danger is modifying scope variables in something like a different thread?
// e.g. using setTimeout and somehow this doesn't get seen as a change by
// Angular's digest loop. You can manually tell Angular that it should trigger a
// digest cycle by using $scope.apply e.g.
setTimeout(function() {
  $scope.apply(function() {
    $scope.temp = "hi";
  })
}, 3000);
// Generally Angular is wrapping all your code in $scope.apply by default but
// there are exceptions with setTimeout or some 3rd party libraries. This is one
// reason for Angular having its own $timeout service if you really need timers
// to trigger code. This is another good reason to go all in on Angular if
// you're using it and stay within it rather than trying to mix it with other
// frameworks etc.

// Another directive is ng-if which allows or completely removes entire pieces
// of the DOM. It takes a javascript expression or a call to a function,
// anything which returns a true/false e.g.
<div class="alert" ng-if="name.length !== 5">MUST be exactly 5 characters.</div>

// Another directive is ng-show which sounds the same as ng-if but instead of
// completely removing the element from the DOM it instead adds a class of
// ng-hide e.g.
<div class="alert ng-hide" ng-show="name.length !== 5"></div>
// ng-hide is built into Angular and changes the style to have
'display: none !important;'
// So it just hides the element via CSS.

// ng-hide directive is the inverse of ng-show i.e. always hide it until it's 5
// characters long
<div class="alert" ng-hide="name.length !== 5"></div>
// (or to create same as previous example's behavior change to name.length === 5

// ng-class directive can decide which class to apply to an element. It takes a
// json object with embedded javascript expressions e.g.
<div class="alert" ng-class="{ 'alert-warning': name.length < 5, 'alert-danger':
name.length > 10 }"

// ng-repeat directive e.g. you can do
$scope.rules = [
  { rulename: "Must be 5 chars" },
  { rulename: "Must not be used elsewhere" },
  { rulename: "Must be cool" }
];
// (this is a json object and would look like one if logged to the console e.g.
// inspectable as if you're looking at an object in the debugger). Then
<ul> <li ng-repeat="rule in rules"> {{ rule.rulename }} </li> </ul>

// Angular can be used to build both single page apps and 'round trip apps'
// round trip refers to doing a request/response to the server to get the next
// page each time whereas single page apps tend to change 'pages' entirely
// client side and only request/respond with the server when they need to
// read/write data. Angular apps are usually single page apps and it has built
// in support for the browser's history, back/forward buttons and bookmarks so
// that they should have all the same benefits of a round trip app.

// ng-app directive takes a parameter which is a module name e.g.
<html ng-app="projectModule"
// which activates the projectModule in your JavaScript for this part of the
// DOM. It seems that because of this you can have multiple modules in your app,
// each operating on different parts of your page (in that scenario each ng-app
// would be on a div or something rather than on the root html element)

// ng-view directive seems to mark an element as the place where the view will
// change a lot (kinda like sub pages inside a rect in the page, or app within
// your app) while the rest of the page remains static?

// You can define hard-coded data in a custom .js file like this
angular.module('project').value('projectListValue', [ { name: 'AngularJS' },
{ name: 'React' } ] )

// ng-repeat can do more logic than just loop e.g.
<tr ng-repeat="project in projectList.projects | filter:projectList.search
| orderBy:'name'">

// ng-click can be used to invoke methods directly in the .js controller, not
// just on button elements e.g. on a href link

// An example of routing an app to another 'screen' would be
<a href="#/new"><i class="icon-plus-sign"></i></a>
// You can also pass uri params e.g.
<a ng-href="#/edit/{{project.$id}}"><i class="icon-pencil"></i></a>
// (project is from
<tr ng-repeat="project in projectList.projects>

// You can do form validation e.g.
<input type="text" name="name" ng-model="editProject.project.name" required>

// There is built in url validation e.g.
<input type="url" name="site" ng-model="editProject.project.site" required>
// (the type=url part)

// ng-disabled can disable buttons etc.

// ng-cloak hides an element in the DOM until angular has worked on it e.g.
// you can use this to stop users from seeing "{{ temp }}" show up as temp for a
// flickering millisecond until angular has interpolated it and updated the DOM.

// $http is a service which can be injected. You can do
$http.get('/api')
  .success(function(result){
    $scope.temp = result;
  })
  .error(function (data, status) {
    console.log(data);
  });
// which assumes you're requesting on the same domain as the page was served.

// there's $http.post too
$http.post('/api', { temp: $scope.temp }) // json straight into the post
  .success(...)

// Each controller gets its own $scope!! they are not automatically shared

// Angular's routing (using # in urls) has origins in # links in HTML which let
// you jump down to a position (anchor tag/fragment identifier) in a page.
// There's an event for this which .js can bind to
window.addEventListener('hashchange', function() {

})
// the anchor location doesn't actually need to exist for the event to fire -
// Angular exploits this..
// the location can even include / characters e.g. index.html#/bookmark/2
// if (window.location.hash === 'index.html#/bookmark/2') get my DOM to show...
// mimicing what a normal browser url does... and using AJAX to go fetch the
// right "page" info.. arrive at single page applications
// the #temp is a fragment identifier
// the # tag in markup is an anchor tag
// This all works because when you click an anchor link in the browser it
// doesn't refresh the page, it jumps.. hence js can intercept and manipulate
// the dom without any browser page refresh happening.

// $location service gives you control over routing
$log.info($location.path());
// would show you the fragment identifier e.g. angular knows 'where' you are

// angular-route.js gives you more control, is IS a router, it checks the
// location and knows which code should execute based on it
// remember
var myApp = angular.module('myApp', []);
// is how you tell it which modules you want, so
var myApp = angular.module('myApp', ['ngRoute']);
// route providers, $routeProvider below is available because of including
// the ngRoute module. $routeProvider lets you specify routes i.e. what should
// I do when I see a particular path OR pattern..
myApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'pages/main.html',
    controller: 'mainController'
  })
  .when('/second', {
    templateUrl: 'pages/second.html',
    controller: 'secondController'
  })
});

// When the router decides based on path which controller/template should be
// used, it decides where to inject the resulting markup based on ng-view e.g.
<div class="container">
  <div ng-view></div> // Does ng-view not need a value?
</div>
// remember when angular goes to render the template it is requesting in the
// browser over http to get the template file on the fly

// pattern matching/getting values from routes/uri paths
$routeProvider
.when('/second/:num'), {

})
// automatically makes num available to controller code when you inject
// $routeParams to the controller e.g.
myApp.controller('secondController', ['$scope]', '$log', '$routeParams',
function($scope, $log, $routeParams) {
  $scope.num = $routeParams.num; // make it available to the view
}]);

// there's lots of other routers out there, this is just the default

// Angular encourages a download the 'app' once and from there it's minimal so
// speed is better instead of round trip apps

// Angular services are implemented as singletons
// $scope is an exception to the rule, it's actually a child scope..
// the real scope is the parent; the root scope, passing the root scope service
// to a controller results in a new child scope being created which is named
// $scope
// when you create your own custom service it should/will be a singleton

// custom services
myApp.service('nameService', function() {
  // all functions and properties you want in your service
  this.name = 'John Doe';

  var self = this;
  this.nameLength = function() {
    return self.name.length;
  };
});

// to use your own custom service you inject the service into the controller in
// the same way you do the built in services but without a $ prefix

// given that services are (normally) singletons, they can be stateful and be
// used to share data between controllers that they're injected on.

// One pattern is to put a manual watch on a value and pump its new value into
// a service upon changes so that it's available everywhere

// factories and providers are other constructs available to use in Angular
// which are similar to services
