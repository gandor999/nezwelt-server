require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require("cors");

const { users, territories } = JSON.parse(fs.readFileSync("db.json"));

app.use(express.json());
app.use(cors());

app.post("/Account/SignIn", (req, res) => {
  const { username, password } = req.body;

  const userAuth = findUser(res, {
    reqUsername: username,
    reqPassword: password,
    users,
  });

  if (!userAuth) res.sendStatus(404);

  const token = generateAccessToken(userAuth);
  res.json({ token, ...userAuth });
});

app.get("/Territories/All", authenticateToken, (req, res) => {
  res.json({ territories });
});

const findUser = (res, { reqUsername, reqPassword, users }) => {
  const foundUser = users.find((user) => user.username === reqUsername);

  if (!foundUser) res.sendStatus(404);
  if (foundUser.password !== reqPassword) res.sendStatus(401); // TODO: put hashing?
  if (foundUser) {
    delete foundUser.password;
    return foundUser;
  }
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

app.listen(process.env.PORT);
