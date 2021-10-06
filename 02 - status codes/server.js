const http = require("http");
const fs = require("fs"); // fs-> file system module
//http module
const server = http.createServer((req, res) => {
  console.log("request has been made from broweser to server");
  res.setHeader("Content-Type", "text/html");
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "/about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about"); // redirect
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404; // put status code 404
      break;
  }
  fs.readFile(path, (err, fileData) => {
    if (err) {
      console.log(err);
    } else {
      res.end(fileData);
    }
  });
});
server.listen(3000, "localhost", () => {
  console.log("server is listening on port 3000");
});
