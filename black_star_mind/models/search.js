const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const searchSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    query: {
      target: String,
      body: String
    },
    response: [
      {
        title: String,
        url: String,
        content: {
          type: Schema.Types.ObjectId,
          ref: 'Content'
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Search', searchSchema);
