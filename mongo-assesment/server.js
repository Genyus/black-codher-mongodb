// server.js

const express = require("express");
const server = express();

const body_parser = require("body-parser");

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = 4000;

// << db setup >>
const db = require("./db");
const { query } = require("express");
const dbName = "movie";
const collectionName = "film";

// << db init >>
// << db init >>
db.initialize(
  dbName,
  collectionName,
  function (dbCollection) {
    // successCallback
    // get all items
    dbCollection.find().toArray(function (err, result) {
      if (err) {
        throw err;
      }
      if (err) {
        console.log("THERE IS AN ERROR");
      }
      // console.log(result);
    });

    // << db CRUD routes >>
    //part 3 homework
    server.get("/api/film/:pId", (request, response) => {
      const pageId = request.params.pId;
      const numItem = 10;
      // let query = {};
      // query.skip = (pageId - 1) * 10;
      // query.limit = numItem;

      dbCollection
        .find({})
        .skip((pageId - 1) * 10)
        .limit(numItem)
        .sort({ title: 1 }) // this sorts the movies by titles in ascending (A to Z) order
        .toArray((error, result) => {
          if (error) throw error;
          // ------------------------------- how to make it defensive???
          // if (pageId === 0) {
          //   console.log("wrong");
          //   result = {
          //     message: "The pagination numer is incorrect",
          //   };
          //   response.json(result);
          // } else {
          // return item
          response.json(result);
          // console.log(reults);
          // }
        });
    });
    // part 5 homework------ start work here
    server.get("/api/titles/:keyword", (request, response) => {
      let word = request.params.keyword;

      dbCollection
        .find({ $text: { $search: request.params.keyword } })
        .toArray((error, result) => {
          if (error) throw error;
          response.json(result);
          // console.log(reults);
        });
    });
    // part 6
    server.get("/api/film/actor", (request, response) => {
      let actorToFind = request.query.keyword;
      // url localhost:4000/api/film/actor?keyword=Will+Smith

      dbCollection
        .find({ actors: { $in: [actorToFind] } })
        .toArray((error, result) => {
          if (error) throw error;
          response.json(result);
          // console.log(reults);
        });
    });
  },

  function (err) {
    // failureCallback
    throw err;
  }
);

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
