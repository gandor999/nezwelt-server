const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const fs = require("fs");

const { users, territories } = JSON.parse(fs.readFileSync("db.json"));

app.use(express.json());

app.post("/Account/SignIn", (req, res) => {
  
});

app.get("/Territories/All", (req, res) => {
  
});

const findUser = (res, { reqUsername, reqPassword, users }) => {
  const foundUser = users.find((user) => user.username === reqUsername);

  if (foundUser.password !== reqPassword) res.sendStatus(401); // TODO: put hashing?
  if (foundUser)
    return { username: foundUser.username, roles: foundUser.roles };
};

const generateAccessToken = (userAuth) => {
  return jwt.sign(userAuth, "mockSecret", {
    expiresIn: "1h",
  });
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) res.sendStatus(401);

  jwt.verify(token, "mockSecret", (err, userAuth) => {
    if (err) res.sendStatus(403);
    req.user = userAuth;
    next();
  });
}

app.listen(3000);
