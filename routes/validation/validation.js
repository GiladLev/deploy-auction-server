const UsersSchema = require("./UserSchema");

const UsersPostValidation = (req, res, next) => {
  const { body } = req;
  const result = UsersSchema.validate(body);

  const { value, error } = result;
  const valid = error == null;
  console.log(error);

  if (!valid) {
    res.status(422).json({
      message: "Invalid Request",
      data: value,
      error: `This is your error ${error}`,
    });
  } else {
    next();
  }
};

module.exports = UsersPostValidation;
