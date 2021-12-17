const mongoose = require("mongoose");
const userSchema = require("./schema/user-schema");
// mongodb+srv://theMyth333:<password>@skylark.fk5wz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const getMongoConnection = async (modelName) => {
  const mongoConnection = await mongoose.createConnection(
    "mongodb+srv://theMyth333:Myth_333@skylark.fk5wz.mongodb.net/loginFlow?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );

  if (mongoConnection.readyState === 1) {
    const User = mongoConnection.model("user", userSchema, "users"); //3rd collection name
    console.log("Connected to mongoDB");
    return { User };
  }
};

module.exports = getMongoConnection;
