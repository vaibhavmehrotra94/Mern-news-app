"use strict";
const mongoose = require("mongoose");
const newsSchema = new mongoose.Schema({
  name: String,
  desc: String,
  url: String,
  category: String,
  imgUrl: String
});

newsSchema.index({
  name: 1,
  desc: 1
});

module.exports = mongoose.model("news", newsSchema);
