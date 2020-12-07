const express = require("express");
require("dotenv/config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
// example of middlewares (function that will run everthyime we execute a route)
// app.use('/posts', () => {
// console.log("middleware is being executing")
// })

// CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("Connected to db!!!!!")
);
// ROUTES
// importing routes
const filmsRoutes = require("./routes/films");
app.use("/films", filmsRoutes); // THIS IS SO THAT WE ONT TYPE /FILMS IN EACH ROTER FROM FILMS.JS IN ROUTES

app.get("/", (req, res) => {
  res.json({
    message: "we are at home",
  });
});

app.get("/api/titles/:keyword", (request, response) => {
  let word = request.params.keyword;

  dbCollection
    .find({ $text: { $search: request.params.keyword } })
    .toArray((error, result) => {
      if (error) throw error;
      response.json(result);
      // console.log(reults);
    });
});

app.listen(7000, () => {
  console.log(`--------- Server listening at 7000`);
});
