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
      type: String
    },
    users: [
      {
        _id: String,
        username: String
      }
    ],
    data: [
      {
        key01: String,
        value01: String,
        key02: String,
        value02: String,
        key03: [String],
        value03: [String]
      }
    ],
    // users: [
    //   {
    //     _id: {
    //       type: Schema.Types.ObjectId,
    //       ref: 'User'
    //     },
    //     username: String
    //   }
    // ],
    actions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Action'
      }
    ],
    content: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Content'
      }
    ],
    interactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Interaction'
      }
    ],
    tags: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Group', groupSchema);
