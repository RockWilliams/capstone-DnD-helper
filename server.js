/* External Modules */
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const mongoose = require("mongoose");

/* Internal Modules */
const controllers = require("./controllers");
const authRequired = require("./middleware/authRequired");
const db = require("./models");

/* Instanced Modules */
const app = express();

/* Configuration Variables */
const PORT = process.env.PORT || 4000;

/* App Configuration */
app.set("view engine", "ejs");

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

/* Session config */
app.use(
	session({
		store: new MongoStore({
			url:
				process.env.MONGODB_URI || "mongodb://localhost:27017/capstone",
		}),
		secret: "Secret password yo",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
		},
	})
);

/* serve public */
app.use(express.static(__dirname + "/public"));

/* root routes */
app.get("/", function (req, res) {
	/* db.Character.find({}, function (err, allCharacters) {
		if (err) {
			console.log(err);
			res.send({ message: "Internal Server Error" });
		} else {
			res.send(allCharacters);
		}
	}); */
	if (req.session.currentUser) {
		db.User.findById(req.session.currentUser._id)
			.populate("user")
			.exec(function (err, foundUser) {
				const context = { user: foundUser };
				res.render("index", context);
			});
	} else {
		const context = { user: null };
		res.render("index", context);
	}
});

/* auth routes */
app.use("/", controllers.auth);

// character routes
app.use("/characters", controllers.character);

/* Bind Server to Port */
app.listen(PORT, function () {
	console.log(`Server is running on http://localhost:${PORT}`);
});
