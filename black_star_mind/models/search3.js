const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const searchSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    user: {
      _id: String,
      username: String
    },
    query: {
      target: String,
      body: String
    },
    response: [
      {
        title: String,
        url: String,
        content: String
      }
    ],
    tags: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Search', searchSchema);
