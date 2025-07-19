const os = require("os");

console.log("arch", os.arch()); // Shows architechture of the CPU
console.log("cpus", os.cpus()); // Lists details about each CPU core.
console.log("freemem", os.freemem()); // Indicates the about of free system memory in bytes
console.log("platform", os.platform()); // Displays the os platform
console.log("release", os.release()); // Shows the OS release version
