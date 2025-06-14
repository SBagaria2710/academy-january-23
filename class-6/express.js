const express = require("express");
const app = express();

// Defined root route
app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.get("/about", (req, res) => {
  res.send("This is About route");
});

// Dynamic Routes
const posts = [
  { id: 1, noOfLikes: 10 },
  { id: 2, noOfLikes: 2000 },
];

app.get("/posts/:id/likes", (req, res) => {
  const postId = req.params.id;
  const post = posts.find((post) => post.id == postId);

  if (!post) {
    return res.status(404).json({ message: "Post does not exist." });
  }

  res.status(200).json({ likes: post.noOfLikes });
});

// Start Server
const port = 8082;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
