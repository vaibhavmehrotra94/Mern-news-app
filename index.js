"use strict";
const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  axios = require("axios"),
  PORT = process.env.PORT || 5050;

const Feed = require("./models/newsFeed");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Connect to MongoDB
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://localhost:27017/challenge", {
  useNewUrlParser: true
});

// Feed.create(abc, (err, tempNews) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(tempNews);
//   }
// });

// Function for Updating the db.
const initiateDbUpdate = () => {
  console.log("DB Update Started");
  axios.get("https://newsapi.org/v1/sources").then(res => {
    let article;
    res.data.sources.forEach(data => {
      article = {
        name: data.name,
        desc: data.description,
        url: data.url,
        category: data.category,
        imgUrl: data.urlsToLogos.large
      };
      Feed.updateOne(article, article, { upsert: true }, (err, tempNews) => {
        //upsert creates a new document if searched element is not found.
        if (err) {
          console.log(err);
        } /*else {
          console.log(tempNews);
        }*/
      });
    });
  });
};

// For initiating the first DataBase Update
initiateDbUpdate();

let dbTimer = setInterval(initiateDbUpdate, 1000 * 60 * 60);

// For Getting all Data and query execution Part
// *********************************************
app.get("/api/v1/news", (req, res) => {
  const tempQuery = req.query.query;
  if (tempQuery) {
    //   Query execution part
    Feed.find(
      {
        $or: [
          {
            name: {
              $regex: tempQuery,
              $options: "i"
            }
          },
          {
            desc: {
              $regex: tempQuery,
              $options: "i"
            }
          }
        ]
      },
      (err, Feeds) => res.json(Feeds)
    );

    // res.send(req.query.query);
  } else {
    Feed.find({}, (err, Feeds) => res.json(Feeds));
  }
});

// For searching using categoryName
// ********************************
app.get("/api/v1/news/categories/:categoryName", (req, res) => {
  Feed.find({ category: req.params.categoryName }, (err, Feeds) =>
    res.json(Feeds)
  );
});

// For starting Server on port 5000
app.listen(PORT, (err, a) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
