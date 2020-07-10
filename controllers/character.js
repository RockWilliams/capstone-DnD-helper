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

// new
router.get("/new", function (req, res) {
	res.render("characters/new");
});

// create
router.post("/", function (req, res) {
	db.Character.create(req.body, function (err, createdCharacter) {
		if (err) {
			console.log(err);
			res.send({ message: "Internal Server Error" });
		} else {
			res.redirect(`/characters/${createdCharacter._id}`);
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

// edit
router.get("/:id/edit", function (req, res) {
	db.Character.findById(req.params.id, function (err, foundCharacter) {
		if (err) {
			console.log(err);
			res.send({ message: "Internal Server error." });
		} else {
			const context = { character: foundCharacter };
			res.render("characters/edit", context);
		}
	});
});

// update
router.put("/:id", function (req, res) {
	db.Character.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		function (err, updatedCharacter) {
			if (err) {
				console.log(err);
				res.send({ message: "Internal Server Error" });
			} else {
				res.redirect(`/characters/${updatedCharacter._id}`);
			}
		}
	);
});

// delete
router.delete("/:id", async function (req, res) {
	try {
		const deletedCharacter = await db.Character.findByIdAndDelete(
			req.params.id
		);
		const deletedItems = await db.Character.remove({
			character: deletedCharacter._id,
		});
		res.redirect("/characters");
	} catch (err) {
		console.log(err);
		res.send({ message: "Internal Server Error" });
	}
});

module.exports = router;
