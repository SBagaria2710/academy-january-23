const http = require("http");

// const server = http.createServer((request, response) => {
//   // Handle incoming requests here

//   // Set Response Header
//   response.setHeader("Content-Type", "text/html");

//   // Set Response Content
//   response.write("<html><head><title>Scaler</title></head><body>Welcome to Scaler!</body></html>");

//   // End of the Response
//   response.end();
// });

const server = http.createServer((request, response) => {
  // Handle incoming requests here

  // Set Response Header
  response.setHeader("Content-Type", "application/json");

  const jsonData = {
    message: "Hello, World!",
    date: new Date()
  };

  const jsonResponse = JSON.stringify(jsonData);

  // Set Response Content
  response.write(jsonResponse);

  // End of the Response
  response.end();
});

const port = 3000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server is listening on http://${host}:${port}`);
});
