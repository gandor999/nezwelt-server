const express = require("express");
const app = express();
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



app.listen(3000);
