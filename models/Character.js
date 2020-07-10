const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
	name: { type: String, required: true },
	class: { type: String, required: true },
	race: { type: String, required: true },
	level: { type: Number, required: true },
	alignment: { type: String, required: true },
	armorClass: { type: Number, required: true },
	health: { type: Number, required: true },
	hitDie: { type: String, required: true },
	proficiencyBonus: { type: Number, required: true },
	speed: { type: Number, required: true },
	intitiative: { type: String, required: true },
	abilityScore: [
		{
			strength: { type: Number, required: true },
			dexterity: { type: Number, required: true },
			constitution: { type: Number, required: true },
			intelligence: { type: Number, required: true },
			wisdom: { type: Number, required: true },
			charisma: { type: Number, required: true },
		},
	],
	money: [
		{
			copper: { type: Number, required: false },
			silver: { type: Number, required: false },
			electrum: { type: Number, required: false },
			gold: { type: Number, required: false },
			platinum: { type: Number, required: false },
		},
	],
	items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Item",
		},
	],
	languages: { type: String, required: true },
	proficiencies: { type: String, required: true },
	abilities: { type: String, required: true },
	traits: { type: String, required: true },
});

const Character = mongoose.model("Character", CharacterSchema);
module.exports = Character;
