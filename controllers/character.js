// bring in router
const express = require("express");
const router = express.Router();

const db = require("../models");

// base root route /characters

//index
router.get("/", function (req, res) {
	db.Character.find({}, function (err, allCharacters) {
		if (err) {
			console.log(err);
			res.send({ message: "Internal Server error." });
		} else {
			const context = { characters: allCharacters };
			res.render("characters/index", context);
		}
	});
});

// show
router.get("/:id", function (req, res) {
	db.Character.findById(req.params.id, function (err, foundCharacter) {
		if (err) {
			console.log(err);
			res.send({ message: "Internal Server error." });
		} else {
			const context = { character: foundCharacter };
			res.render("characters/show", context);
		}
	});
});

module.exports = router;
