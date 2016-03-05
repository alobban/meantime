


/**
* Express App
* @author Andrew Lobban <andrewglobban@gmail.com>
**/


/** require modules **/

var express = require("express"),
	jade = require("jade"),
	connect = require("connect"),
	bodyParser = require("body-parser");

/** Initialize Express app object **/

var app = express();

/** Vaiables **/

/** Server will be browsed at http://localhost:3000 **/

var root = __dirname,
	port = 3000;

/** configure Express app **/

app.use( express.static( root + "/public" ));

app.set( "views", root + "/views" );

app.set( "view engine", "jade" );

/** Add middleware that will look for data when requests are made **/

app.use( bodyParser.urlencoded( {extended: true} ));

/** Create some Express routes **/

app.get( "/settings/profile", function editProfileCb (req, res) {

	res.render( "profile-form" );

});

app.post("/settings/profile", function postProfileCb (req, res) {

	// this callback is fired after a POST request is sent to the server

	// report to console

	console.log( "POST RECEIVED!" );

	// report post data to console

	console.log( req.body );

	// reply to browser that something has happened and close the loop

	return res.json({
		"firstName": req.body.firstNameField,
		"lastName": req.body.lastNameField,
		"bio": req.body.bioField
	});
});

app.get( "/someJSON", function someJSONCallback (req, res) {
	res.json({
		"one": {
			"so": "cool"
		},
		"two": "super cool",
		"three": ["love","json","and","JavaScript"]
	});
});

app.get( "/beginning", function beginningCallback (req, res) {
	res.send("<h1>This is the beginning</h1><p><3</p>" );
});

/** start server on port 3000 **/

app.listen( port, function listenCallback () {
	console.log( "Express server is listening on port " + port );
	console.log( "To test, browse to http://localhost:" + port );
})