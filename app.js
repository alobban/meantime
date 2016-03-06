


/**
* Express App
* @author Andrew Lobban <andrewglobban@gmail.com>
**/


/** require modules **/

var express = require("express"),
	jade = require("jade"),
	connect = require("connect"),
	bodyParser = require("body-parser"),
	fs = require("fs");

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

	// Write JSON with POST data

	// // Core Node method

	// // ** Asynchronously ** writes data to a file

	fs.writeFile("data.json", JSON.stringify( req.body, null, 2 ), function writeCb ( err ) {

		// Error handling

		if ( err ) {

			res.json({ err: true, msg: err.msg });

			return console.log( err );

		}

		// Report to console

		console.log( "Post Data Saved", req.body );

		// reply to browser with a redirect directive

		res.redirect( "/profile" );

		// end writeCb

	});

	// end app.post

});

// GET profile

app.get( "/profile", function profileCb (req, res) {
	
	fs.readFile( "data.json", function readCallback ( err, data ) {

		// Error handling

		if ( err ) {

			res.json({ err: true, msg: err.msg });

			return console.log( err );

		}

		// No error, continue

		// Convert JSON string to JavaScript Object

		var profileData = JSON.parse( data );

		// Report to console

		console.log( "Data read from file: ", profileData );

		// Render Jade view, and send data as options

		res.render( "profile", {
			firstname: profileData.firstNameField,
			lastname: profileData.lastNameField,
			bio: profileData.bioField
		});

		// end readCallback

	});

	// end app.get
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