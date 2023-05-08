const express = require("express");
const app = express();
const fs = require("fs");

const { users, territories } = JSON.parse(fs.readFileSync("db.json"));

app.use(express.json());

app.post("/Account/SignIn", (req, res) => {
  
});

app.get("/Territories/All", (req, res) => {
  
});



app.listen(3000);
