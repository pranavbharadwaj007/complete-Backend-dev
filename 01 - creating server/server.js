const http = require("http");
const fs = require("fs"); // fs-> file system module
//http module
const server = http.createServer((req, res) => {
  console.log("request has been made from broweser to server");
  //console.log(req.method);
  //console.log(req.url);

  // respon through single html element
  res.setHeader("Content-Type", "text/html");
  //res.write("<h1> Hello, Coding Thor! </h1>");
  //res.write("<h2> one stop destination </h2>");
  //res.end();

  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      break;
    case "/about":
      path += "/about.html";
      break;
    default:
      path += "404.html";
      break;
  }

  // respon through complete html file with the help of fs
  fs.readFile(path, (err, fileData) => {
    if (err) {
      console.log(err);
    } else {
      // res.write(fileData);
      res.end(fileData); // if we have only one file
    }
  });
});

//port number, host,callback function as argumrnt
server.listen(3000, "localhost", () => {
  console.log("server is listening on port 3000");
});
