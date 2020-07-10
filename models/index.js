// bring in mongoose
const mongoose = require("mongoose");

const connectionString =
	process.env.MONGODB_URI || "mongodb://localhost:27017/store";
mongoose
	.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(function () {
		console.log("Mongodb connected...");
	})
	.catch(function (err) {
		console.log("Mongodb Error", err);
	});

module.exports = {
	Character: require("./Character"),
	Item: require("./Item"),
};
