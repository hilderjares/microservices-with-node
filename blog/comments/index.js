const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (request, response) => {
  response.status(200).send(commentsByPostId[request.params.id] || []);
});

app.post("/posts/:id/comments", async (request, response) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = request.body;
  const comments = commentsByPostId[request.params.id] || [];

  comments.push({ id: commentId, content: content });

  commentsByPostId[request.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "COMMENT_CREATED",
    data: {
      id: commentId,
      content,
      postId: request.params.id
    },
  });

  response.status(201).send(comments);
});

app.post("/events", (request, response) => {
  console.log("Event Received:", request.body);

  response.send({});
});

app.listen(4001, () => {
  console.log("Running Comments Service on 4001");
});
