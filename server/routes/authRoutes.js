const express = require("express");
const { validationResult } = require('express-validator');
const AuthController = require("../controllers/auth.controller");
const { loginValidation } = require("../middlewares/validation");
const router = express.Router();

// Validation error handler middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

router.post("/login", loginValidation, handleValidationErrors, AuthController.login);

module.exports = router;