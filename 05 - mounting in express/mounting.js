const express = require("express");

const app = express();
// middleware function
app.use(express.json());
app.listen(3000);

let users = [];

const userRouter = express.Router();
app.use("/user", userRouter);

// mini app whose base route is /user
userRouter
  .route("/") //   .../user/
  .get(getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);
userRouter.route("/:id").get(getUserById);

function getUser(req, res) {
  res.send(users);
}

function postUser(req, res) {
  console.log(req.body);
  users = req.body;
  res.json({
    message: "data received successfully",
    user: req.body,
  });
}
function updateUser(req, res) {
  let dataToBeUpdated = req.body;
  for (key in req.body) {
    users[key] = dataToBeUpdated;
  }
  res.json({
    message: "data updated successfully",
  });
}

function deleteUser(req, res) {
  users = {};
  res.json({
    message: "data has been deleted",
  });
}

function getUserById(req, res) {
  res.send("user id is", req.params);
  console.log(req.params.id);
}
