const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
	name: { type: String, required: true },
	class: { type: String, required: true },
	race: { type: String, required: true },
	level: { type: Number, required: true },
	alignment: { type: String, required: false },
	armorClass: { type: Number, required: true },
	health: { type: Number, required: true },
	hitDie: { type: String, required: true },
	proficiencyBonus: { type: Number, required: true },
	speed: { type: Number, required: true },
	initiative: { type: String, required: false },
	strength: { type: Number, required: true },
	dexterity: { type: Number, required: true },
	constitution: { type: Number, required: true },
	intelligence: { type: Number, required: true },
	wisdom: { type: Number, required: true },
	charisma: { type: Number, required: true },
	copper: { type: Number, required: false },
	silver: { type: Number, required: false },
	electrum: { type: Number, required: false },
	gold: { type: Number, required: false },
	platinum: { type: Number, required: false },
	items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Item",
		},
	],
	languages: { type: String, required: false },
	proficiencies: { type: String, required: false },
	abilities: { type: String, required: false },
	traits: { type: String, required: false },
});

const Character = mongoose.model("Character", characterSchema);
module.exports = Character;
