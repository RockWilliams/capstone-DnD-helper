const db = require("./models");

const character = {
	name: "Lumpy",
	class: "Jester",
	race: "Elf",
	level: 14,
	alignment: "Chaotic Neutral",
	armorClass: 20,
    health: 129,
    hitDie: "14d8",
    proficiencyBonus: 5,
    speed: 30,
    intiative: 
};

// .create(data, function(error,db object))
// db.Fruit.create(raspberry, function(error, createdFruit){
//   if(error){
//     console.log(error.errmsg);
//   } else {
//     console.log(createdFruit);
//   }
// });

// .find(search, function(error, db objects))
// db.Fruit.find({},function(error, allFruit){
//   if(error){
//     console.log(error);
//   } else {
//     console.log(allFruit);
//   }
// });

// findByIdAndDelete(id, function(error, deletedObject))
// db.Fruit.findByIdAndDelete("5ec816af629dc859910e17df", function(error, deletedObject){
//   if(error){
//     console.log(error);
//   } else {
//     console.log(deletedObject);
//   }
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
