const db = require("./models");

const character = {
	name: "Lumpy2",
	class: "Jester",
	race: "Elf",
	level: 14,
	alignment: "Chaotic Neutral",
	armorClass: 20,
	health: 129,
	hitDie: "14d8",
	proficiencyBonus: 5,
	speed: 30,
	initiative: "5",
	strength: 8,
	dexterity: 20,
	constitution: 19,
	intelligence: 13,
	wisdom: 15,
	charisma: 20,
	gold: 400,
};

//.create(data, function(error,db object))
db.Character.create(character, function (error, createdCharacter) {
	if (error) {
		console.log(error.errmsg);
	} else {
		console.log(createdCharacter);
	}
});

// .find(search, function(error, db objects))
// db.Character.find({}, function (error, allCharacters) {
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log(allCharacters);
// 	}
// });

// findByIdAndDelete(id, function(error, deletedObject))
// db.Fruit.findByIdAndDelete("", function (error, deletedObject) {
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log(deletedObject);
// 	}
// });

// findByIdAndUpdate(id, dataToUpdate, {new:true}, function(error, updatedObj){})
// const updateData = {
//     $set: {
//         color: 'blue'
//     }
// }

// db.Fruit.findByIdAndUpdate("5ec8186b6895c65d603b635e", updateData, { new: true }, function (error, updatedFruit) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(updatedFruit);
//     }
// });
