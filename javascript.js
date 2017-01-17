    If you declare a variable in a .js file e.g. var filename = "1.txt"; you're doing it in the global namespace so your own code or 3rd party libraries can easily collide. To counteract this, one pattern is var myUniqueAppName = {}; myUniqueAppName.filename = "1.txt"; The same is true of functions e.g. myUniqueAppName.sayHello = function() { console.log("hi"); } (invoked using myUniqueAppName.sayHello();)

    Declaring an "object"? var Person = function(firstname, lastname) { this.firstname = firstname; this.lastname=lastname; } var demo = new Person("foo", "bar");

    If you console.log a function name without invoking it e.g. console.log(hi); rather than console.log(hi()); I think it'll print out the source code of the function. Same with var temp = hi.toString();

    Somehow in javascript: $scope.temp = $filter('uppercase')($scope.name); is passing the variable name to a uppercase function and temp will end up with the uppercase string version of name. Potentially, functionName(temp)(temp2, temp3) doesn't pass temp2 and temp3 directly to temp but instead passes a single parameter which contains temp2 and temp3?

    In JavaScript everything is a function?

    Arrays can be declared like: var things = [1, 2, 3]; but the types don't need to match e.g. var things2 = [1, '2', 3];. Not only different types of variables but even (unnamed?) functions e.g. var things3 = [1, '2', function() {}]; and invoke e.g. things3[2]();

    You can always do document.getElementById("nameId");

    DOM elements are always emitting events, you just have to listen for them e.g. var nameElement = document.getElementById("nameId"); nameElement.addEventListener("keypress", function(event){console.log('a key was pressed)});

    JavaScript seems to always have an event loop running which is how, for example, DOM elements emitting events happens and how addEventListener can work.

    You can do setTimeout(function() { console.log('blah'); }, 3000);

    != can work but !== compares values and also that they're both of the same type? and is considered better?

    === is also a thing, unsure if this is similar

    XHR means XMLHttpRequest, its name is misleading as it can use XML/JSON/HTML/plaintext and can use protocols other than HTTP. Ajax relies on this to work. 
