/* External Modules */
const express = require("express");

/* Internal Modules */

/* Instanced Modules */
const app = express();

/* Configuration Variables */
const PORT = process.env.PORT || 4000;

/* App Configuration */
app.set("view engine", "ejs");

/* Middleware */

/* Session config */

/* root routes */
app.get("/", function (req, res) {
	res.render("index");
});
/* auth routes */

/* Bind Server to Port */
app.listen(PORT, function () {
	console.log(`Server is running on http://localhost:${PORT}`);
});
