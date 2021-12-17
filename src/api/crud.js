const getModels = require("../db/mongo-models");

const readUser = async ({ email, password }) => {
  try {
    const models = await getModels();
    const user = await models.User.findOne({ email }).exec();
    await user.verifyPassword(password);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUser = async (record) => {
  try {
    const models = await getModels();
    const user = new models.User(record);
    await user.save();
    return user;
  } catch (error) {
    if (error.message.includes("E11000")) {
      //Duplicate email
      throw new Error("Duplicate record");
    }
    throw new Error(error);
  }
};

module.exports = { readUser, createUser };
