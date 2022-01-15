const axios = require("axios");
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/events", (request, response) => {
  const event = request.body;

  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });

  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });

  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  response.status(200).send("ok");
});

app.listen(4005, () => {
  console.log("Event bus listening on 4005");
});
