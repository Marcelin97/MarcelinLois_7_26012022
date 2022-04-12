const Joi = require("joi");

const strongPasswordRegex = new RegExp(
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
);

module.exports.inputValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(1).max(30),
    lastName: Joi.string().alphanum().min(1).max(30),
    username: Joi.string().alphanum().min(1).max(30),
    birthday: Joi.string(),
    email: Joi.string().trim().email().min(6),
    newPassword: Joi.string()
      .min(8)
      .max(16)
      .pattern(strongPasswordRegex)
      .trim(),
  });
  try {
    const { error } = schema.validate({ ...req.body });
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};