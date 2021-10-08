const express = require("express");

const app = express();
// middleware function
app.use(express.json());
app.listen(3000);

let users = {};

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  console.log(req.body);
  res.json({
    message: "Data received successfully",
    user: req.body,
  });
});

//update -> patch

app.patch("/user", (req, res) => {
  console.log("req.body", req.body);
  let dataToBeUpdated = req.body;
  for (key in req.body) {
    users[key] = dataToBeUpdated;
  }
  res.json({
    message: "data updated successfully",
  });
});

// to delete

app.delete("/user", (req, res) => {
  users = {};
  res.json({
    message: "data has been deleted",
  });
});

app.get("/user/:id", (req, res) => {
  res.send("user id is", req.params);
  console.log(req.params.id);
});
