const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const db = require("../models");

// root route of /auth

// register page
router.get("/register", function (req, res) {
	res.render("auth/register");
});

// create new user
router.post("/register", async function (req, res) {
	try {
		const foundUser = await db.User.findOne({
			email: req.body.email,
		});
		if (foundUser) {
			return res.send({ message: "Account is already registered" });
		}
		if (req.body.password !== req.body.confirmPassword) {
			return res.send({ message: "Passwords do not match" });
		}
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(req.body.password, salt);
		req.body.password = hash;
		const newUser = await db.User.create(req.body);
		res.redirect("/login");
	} catch (err) {
		res.send({ message: "Internal Server Error", error: err });
	}
});

// login page
router.get("/login", function (req, res) {
	res.render("auth/login");
});

// log into account
router.post("/login", async function (req, res) {
	try {
		const foundUser = await (
			await db.User.findOne({ email: req.body.email })
		).populate("user");
		if (!foundUser) {
			return res.send({ message: "Password or Email incorrect" });
		}
		const match = await bcrypt.compare(
			req.body.password,
			foundUser.password
		);
		if (!match) {
			return res.send({ message: "Password or Email incorrect" });
		}
		req.session.currentUser = {
			id: foundUser._id,
			username: foundUser.username,
		};
		const context = { user: foundUser };
		res.render("index", context);
	} catch (err) {
		console.log(err);
		res.send({ message: "Internal Server Error", error: err });
	}
});

// logout
router.delete("/logout", async function (req, res) {
	await req.session.destroy();

	res.render("index", { user: null });
});

// profile page
router.get("/profile", async function (req, res) {
	try {
		const foundUser = await db.User.findById(
			req.session.currentUser.id
		).populate("characters");
		const foundCharacters = await db.Character.find({
			user: foundUser._id,
		});
		console.log(foundCharacters);
		const context = { user: foundUser, characters: foundCharacters };
		res.render("auth/profile", context);
	} catch (err) {
		console.log(err);
		res.send({ message: "Internal Server Error", error: err });
	}
});

module.exports = router;
