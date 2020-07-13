/* External Modules */
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

/* Internal Modules */
const controllers = require("./controllers");
const authRequired = require("./middleware/authRequired");

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
	res.render("index");
});

/* auth routes */
app.use("/", controllers.auth);

// character routes
app.use("/characters", controllers.character);

/* Bind Server to Port */
app.listen(PORT, function () {
	console.log(`Server is running on http://localhost:${PORT}`);
});
