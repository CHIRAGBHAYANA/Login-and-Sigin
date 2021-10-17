const { request, response } = require("express");
const router = require("express").Router();
const signUpTemplateCopy = require("../models/SignUpModels");
const { registrationValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (request, response) => {
  // Validation the data
  const { error } = registrationValidation(request.body);
  if (error) {
    return response.status(400).send(error.details[0].message);
  }

  // Checking if the user is already in the database
  const emailExist = await signUpTemplateCopy.findOne({
    email: request.body.email,
  });
  if (emailExist) return response.status(400).send("Email is already exist");

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(request.body.password, salt);

  // Create the new user
  const signedUpUser = new signUpTemplateCopy({
    fullName: request.body.fullName,
    username: request.body.username,
    email: request.body.email,
    password: hashedPassword,
  });
  signedUpUser
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json(error);
    });
});

router.post("/login", async (request, response) => {
  const { error } = loginValidation(request.body);
  if (error) {
    return response.status(400).send(error.details[0].message);
  }
  // Checking if the email exist
  const user = await signUpTemplateCopy.findOne({ email: request.body.email });
  if (!user)
    return response.status(400).send("Email and PassWord is incorrect");
  // Password
  const validPassword = await bcrypt.compare(
    request.body.password,
    user.password
  );
  if (!validPassword) return response.status(400).send("Invalid PassWord");

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  response.header("auth-token", token).send("Logged in!");
});

module.exports = router;
