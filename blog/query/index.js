const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

const events = {
  POST_CREATED: "POST_CREATED",
  COMMENT_CREATED: "COMMENT_CREATED",
};

app.get("/posts", (request, response) => {
  response.send(posts);
});

app.post("/events", (request, response) => {
  const { type, data } = request.body;

  if (type === events.POST_CREATED) {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === events.COMMENT_CREATED) {
    const { id, content, postId } = data;
    const post = posts[postId];

    post.comments.push({ id, content });
  }

  response.send({});
});

app.listen(4002, () => {
  console.log("Running Query Service on 4002");
});
