const bcrypt = require("bcrypt");

const encrypt = async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    throw new Error(error);
  }
  next();
};

const checkUserAvailable = function (user, next) {
  if (!user) {
    throw new Error("User not Found");
  }
  next();
};

const verifyPassword = async function (rawPass) {
  try {
    if (!(await bcrypt.compare(rawPass, this.password))) {
      throw new Error("Invalid Password");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { encrypt, verifyPassword, checkUserAvailable };
