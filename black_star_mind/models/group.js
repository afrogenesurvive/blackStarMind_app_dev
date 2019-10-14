const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    type: {
      type: String,
      required: false
    },
    subtype: {
      key: String,
      value: String
    },
    name: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    creator: {
      type: Schema.Types.ObjectId,
          ref: 'User'
    },
    users: [
      {
        type: Schema.Types.ObjectId,
            ref: 'User'
      }
    ],
    data: [
      {
        key01: String,
        value01: String,
        key02: String,
        value02: String,
        key03: String,
        value03: [String]
      }
    ],
    content: [
      {
        type: Schema.Types.ObjectId,
            ref: 'Content'
      }
    ],
    perks: [
      {
        type: Schema.Types.ObjectId,
            ref: 'Perk'
      }
    ],
    tags: [String],
    upvotes: Number,
    downvotes: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model('Group', groupSchema);
