const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		characters: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Character",
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
