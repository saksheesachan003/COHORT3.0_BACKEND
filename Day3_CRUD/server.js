const express = require("express");

const app = express();

let port = 3000;

// created users array
let users = [];

// Middleware -> to know to accept json data
app.use(express.json());

// POST -> Create
app.post("/create", (req, res) => {
  // send exact body data which pass from json frontend
  let body = req.body;

  users.push(body);

  // res.send(users);

  res.send("User Saved Successfully!");
});

// GET -> Read
app.get("/", (req, res) => {
  res.send(users);
});

// UPDATE -> updates users
app.put("/update/:id", (req, res) => {
  let { id } = req.params;
  let { name } = req.body;

  let updatedUser = users.map((val) =>
    val.id === id ? { ...val, name } : val,
  );
  res.send(updatedUser);
});

// DELETE -> always should be unique id -> dynamic id
app.delete("/delete/:id", (req, res) => {
  let { id } = req.params;

  let userData = users.filter((val) => val.id !== id);
  console.log(userData);
  users = userData;
  res.send(userData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
