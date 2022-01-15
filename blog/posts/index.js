const express = require("express");
const { randomBytes } = require("crypto");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const posts = {};

app.get("/posts", (request, response) => {
  response.status(200).send(posts);
});

app.post("/posts", async (request, response) => {
  const id = randomBytes(4).toString("hex");
  const { title } = request.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "POST_CREATED",
    data: {
      id,
      title,
    },
  });

  response.status(201).send(posts[id]);
});

app.post("/events", (request, response) => {
  console.log("Event Received:", request.body);

  response.send({});
});

app.listen(4000, () => {
  console.log("Running Posts Service on 4000");
});
