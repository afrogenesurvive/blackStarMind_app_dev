const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const actionSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    subtype: {
      key: String,
      value: String
    },
    target: {
      _id: String,
      user: {
        type: Schema.Types.ObjectId,
            ref: 'User'
      },
      name: String,
      title: String
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
    description: {
      type: String,
      required: false
    },
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
    tags: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Action', actionSchema);
