const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
	name: { type: String, required: true },
	wieght: { type: Number, required: false },
	character: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Character",
		},
	],
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
