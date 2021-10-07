const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("./views/index.html", { root: __dirname }); // root -> dirname
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

// redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404 page
// always put last
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
app.listen(3000);
