"use strict";
require('dotenv').config();
const express = require("express");
const { readUser, createUser } = require("./crud");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.post("/api/login", async (req, res) => {
  try {
    const userTmp = await readUser(req.body);
    const user = {
      name: userTmp.name,
      email: userTmp.email,
      phone: userTmp.phone,
    };
    res.status(200);
    res.json({ user });
  } catch (error) {
    res.status(200);
    res.json({ error: error.message });
  }
});

app.post("/api/register", async function (req, res) {
  try {
    const user = await createUser({ ...req.body }); //need to add id function
    res.status(200);
    res.json({ user });
  } catch (error) {
    res.status(200);
    res.json({ error: error.message });
  }
});

app.listen( process.env.PORT, () => {
  console.log("Express server listening on port 3001");
});
