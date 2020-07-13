// bring in router
const express = require("express");
const router = express.Router();

const db = require("../models");

// base root route /characters

//index - all characters
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

// new character
router.get("/new", function (req, res) {
	res.render("characters/new");
});

// create character
router.post("/", function (req, res) {
	db.Character.create(req.body, function (err, createdCharacter) {
		if (err) {
			console.log(err);
			res.send({ message: "Internal Server Error" });
		} else {
			db.User.findById(req.session.currentUser.id, function (
				err,
				foundUser
			) {
				if (err) {
					console.log(err);
					res.send({ message: "Internal Server Error" });
				} else {
					foundUser.characters.push(createdCharacter);
					foundUser.save();
					createdCharacter.user = foundUser._id;
					res.redirect(`/characters/${createdCharacter._id}`);
				}
			});
		}
	});
});

// show character
router.get("/:id", function (req, res) {
	db.Character.findById(req.params.id)
		.populate("items user")
		.exec(function (err, foundCharacter) {
			if (err) {
				console.log(err);
				res.send({ message: "Internal Server error." });
			} else {
				const context = {
					character: foundCharacter,
					items: foundCharacter.items,
				};
				res.render("characters/show", context);
			}
		});
});

// edit character
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

// update character
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

// delete character
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

// new item page
router.get("/:id/new-item", function (req, res) {
	db.Character.findById(req.params.id, function (err, foundCharacter) {
		if (err) {
			console.log(err);
			res.send({ message: "Internal Server Error" });
		} else {
			const context = { character: foundCharacter };
			res.render("items/new", context);
		}
	});
});

// create new item
router.post("/:id", async function (req, res) {
	try {
		const createdItem = await db.Item.create(req.body);
		const foundCharacter = await db.Character.findById(req.params.id);
		foundCharacter.items.push(createdItem);
		foundCharacter.save();
		console.log(createdItem);
		console.log(foundCharacter.items);
		res.redirect(`/characters/${foundCharacter._id}`);
	} catch (err) {
		console.log(err);
		res.send({ message: "Internal Server Error" });
	}
});

// item edit page
router.get("/:id/:itemId", async function (req, res) {
	try {
		foundCharacter = await db.Character.findById(req.params.id);
		foundItem = await db.Item.findById(req.params.itemId);

		const context = { item: foundItem, character: foundCharacter };
		res.render("items/edit", context);
	} catch (err) {
		console.log(err);
		res.send({ message: "Internal Server Error" });
	}
});

// update item
router.put("/:id/:itemId", async function (req, res) {
	try {
		updatedItem = await db.Item.findByIdAndUpdate(
			req.params.itemId,
			req.body,
			{
				new: true,
			}
		);
		res.redirect(`/characters/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send({ message: "Internal Server Error" });
	}
});

// delete item
router.delete("/:id/:itemId", async function (req, res) {
	try {
		const deletedItem = await db.Item.findByIdAndDelete(req.params.itemId);

		const foundCharacter = await db.Character.findById(req.params.id);
		foundCharacter.items.remove(deletedItem._id);
		await foundCharacter.save();

		res.redirect(`/characters/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send({ message: "Internal Server Error" });
	}
});

module.exports = router;
