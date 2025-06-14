const fs = require("fs");

// fs.readFile("file.txt", "utf8", (error, data) => {
//   if (error) {
//     console.log("Something didn't go right.", error);
//     return;
//   }
//   console.log("Here are the content from the file:", data);
// });

// const content = "[Overriden Content] Welcome to scaler.";
// fs.writeFile("file.txt", content, "utf8", (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("File has been written.");
// });

// fs.rename("random-file.txt", "file1.txt", () => {});

// fs.unlink("file1.txt", () => {});

// fs.stat("file.txt", (err, stats) => {
//   console.log("Size:", stats.size);
//   console.log("Is Directory?:", stats.isDirectory());
//   console.log(stats);
// });

// fs.mkdir("my-drectory", () => {});

// fs.rmdir("my-drectory", () => {});

// ------------------------------------------------------------------------------------
const path = require("path");

// const fullPath = path.join("folder", "subfolder", "file.txt");
// console.log(fullPath);

// const fileName = path.basename("./dir/random-folder/file.txt");
// console.log(fileName);

// const extName = path.extname("./dir/random-folder/file.txt");
// console.log(extName);