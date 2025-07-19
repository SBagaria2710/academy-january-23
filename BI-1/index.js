// console.log(global);
// console.log("File name", __filename);

// const http = require("http");
// const server = http.createServer();

// server.on("request", (req, res) => {
//   // Set Response Content
//   res.write("Hello World!");

//   // End of the res
//   res.end();
// });

// server.listen(3000, () => {
//   console.log("Server started on 3000");
// });

// console.log(process.pid);

// Generating Radom text:
// const content = Math.random().toString(36).repeat(10000000); // 130 MB

// Write content to file
const fs = require("fs");
// fs.writeFileSync("/Users/shashwatb/Documents/personal/academy-january-23/BI-1/big-file.txt", content);

const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
  fs.readFile("./big-file.txt", (err, data) => {
    if (err) throw err;
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log("Server started at 3000");
});