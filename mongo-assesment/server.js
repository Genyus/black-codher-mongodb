// server.js

const express = require("express");
const server = express();

const body_parser = require("body-parser");

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = 9000;

// << db setup >>
const db = require("./db");
const { query } = require("express");
const dbName = "movie";
const collectionName = "film";

// attempt query parameter
const http = require("http");
const url = require("url");

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
          response.json(result);
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
    server.get("/api/film/actor", async (request, response) => {
      console.log("get request");
      let actorToFind = request.query.keyword;
      // url: localhost:4000/api/film/actor?keyword=Will+Smith
      // const queryObject = url.parse(req.url, true).query;
      // const actorToFind = queryObject.keyword;
      // these console's does't get printed somehow
      console.log(actorToFind);
      console.log("hello");
      let actorString = `'${actorToFind}'`;
      console.log(actorString);
      dbCollection
        .find({
          actors: {
            $in: [{ $regex: "/" + actorToFind + ".?/", $options: "i" }],
          },
        })
        // .find({ actors: { $in: [{ $text: { $search: actorString } }] } })
        .toArray((error, result) => {
          if (error) throw error;
          response.json(result);
        });
      // --------OTHER ATTEMPTS
      // const toFind = dbCollection.find({
      //   actors: { $regex: "/" + actorToFind + ".?/", $options: "i" },
      // });
      // dbCollection
      //   .find({ actors: { $in: [toFind] } })
      //   .toArray((error, result) => {
      //     if (error) throw error;
      //     response.json(result);
      //     // console.log(reults);
      //   });

      // dbCollection
      //   // .find({ actors: { $regex: "/" + actorToFind + ".?/", $options: "i" } })
      //   ,
      //   })
      //   // .find({ actors: { $in: [actorToFind] } })
      //   .toArray((error, result) => {
      //     if (error) throw error;
      //     response.json(result);
      //     // console.log(reults);
      //   });
    });

    // part 6 --------OTHER ATTEMPTS
    server.get("/api/film/actors", async (request, response) => {
      console.log("get request");
      var actorToFind = request.query.keyword;
      var regex = { $regex: new RegExp(req.query.query, "i") };
      dbCollection
        // .find({ actors: { $in: [`'${actorToFind}'`] } })
        .find({ actors: { $in: [new RegExp(actorToFind, "i")] } })
        .toArray((error, result) => {
          if (error) throw error;
          response.json(result);
          // console.log(reults);
        });

      // ------------------
      // let actorToFind = request.query.keyword;
      // // url: localhost:4000/api/film/actor?keyword=Will+Smith
      // // const queryObject = url.parse(req.url, true).query;
      // // const actorToFind = queryObject.keyword;
      // // these console's does't get printed somehow
      // console.log(actorToFind);
      // console.log("hello");
      // // let actorString = `'${actorToFind}'`;
      // console.log(actorString);
      // dbCollection
      //   // .find({ actors: { $in: [`'${actorToFind}'`] } })
      //   .find({ actors: { $in: [{ $text: { $search: actorString } }] } })
      //   .toArray((error, result) => {
      //     if (error) throw error;
      //     response.json(result);
      //     // console.log(reults);
      //   });
    });

    // server.post("watch", (request, response) => {

    //   db.createCollection('watch');
    //   db.film.insertOne(
    //     {
    //     film_id : "Maya",
    //     title : "Angelou",

    //     }
    //     );

    //   dbCollection
    //     .find({ actors: { $regex: '/'+ actorToFind.? + '/', $options: "i" } })
    //     // .find({ actors: { $in: [actorToFind] } })
    //     .toArray((error, result) => {
    //       if (error) throw error;
    //       response.json(result);
    //       // console.log(reults);
    //     });
    // });
  },

  function (err) {
    // failureCallback
    throw err;
  }
);

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
