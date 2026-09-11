// imports http and save in variable
let http = require("http");
console.log("HTTP:", http);

// creates server -> accepts callback
let server = http.createServer((req, res) => {
  console.log("Hello I'm server");

  // sends response from server
  res.end("I have listened you....");
});

// starts server -> listen (needs port)
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// In browser -> http://localhost:3000/
