exports.createPostValidator = (req, res, next) => {
  // TITLE
  req.check("title", "Give a title").notEmpty();
  req.check("title", "Title must be between 4 to 150 characters").isLength({
    min: 4,
    max: 150,
  });
  // DESCRIPTION
  req.check("desc", "Give a description").notEmpty();
  req
    .check("desc", "Description must be between 4 to 2000 characters")
    .isLength({
      min: 4,
      max: 2000,
    });

  // ! Check for errors
  const errors = req.validationErrors();

  // ! If error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // Proceed to next middleware
  next();
};

exports.userSignupValidator = (req, res, next) => {
  // NAME is not null and between 4-20 characters
  req.check("name", "Name is required").notEmpty();
  req.check("name", "Name must be between 3 to 20 characters").isLength({
    min: 3,
    max: 20,
  });

  // EMAIL is not null, valid and normalized
  req.check("email", "Email is required").notEmpty();
  req
    .check("email")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({ min: 6, max: 2000 })
    .withMessage("Email should contain atleast 6 characters");

  // PASSWORD
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain atleast one digit");

  // ! Check for errors
  const errors = req.validationErrors();

  // ! If error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // Proceed to next middleware
  next();
};


exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check("newPassword", "Password is required").notEmpty();
    req.check("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
        .matches(/\d/)
        .withMessage("must contain a number")
        .withMessage("Password must contain a number");

    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware or ...
    next();
};
