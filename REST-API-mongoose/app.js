const express = require("express");

const app = express();
// example of middlewares (function that will run everthyime we execute a route)
// app.use('/posts', () => {
// console.log("middleware is being executing")
// })

// ROUTES
app.get("/", (req, res) => {
  res.json({
    message: "we are at home",
  });
});

app.listen(3000);
