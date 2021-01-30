const { check, validationResult } = require("express-validator");

const asyncHandler = (hanlder) => (req, res, next) =>
  hanlder(req, res, next).catch(next);

const tweetNotFoundError = (id) => {
  const err = Error(`The tweet with id ${id} could not be found`);
  err.tite = "Tweet not found.";
  err.status = 404;

  return err;
};

const validateTweet = [
    check("message")
      .exists({checkFalsy: true})
      .withMessage("Message cannot be empty."),

    check("message")
      .isLength({ max: 280 })
      .withMessage("Message must be under 280 characters.")
]

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);

    const err = Error("Bad Request");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad Request";
    return next(err);
  } else {
    next();
  }
};

module.exports = { asyncHandler, tweetNotFoundError, validateTweet, handleValidationErrors };
