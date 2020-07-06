const mongoose = require("mongoose");
const { encrypt, verifyPassword, checkUserAvailable } = require("../mongo-middlewares");

const userSchema = new mongoose.Schema({
	// _id: { type: Number, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	createdOn: { type: Date, default: Date.now },
});

userSchema.pre("save", encrypt);
userSchema.post("findOne", checkUserAvailable );
userSchema.methods.verifyPassword = verifyPassword;

module.exports = userSchema;
