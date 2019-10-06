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
      title: String
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
    // users: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    //   }
    // ],
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
        key03: [String],
        value03: [String]
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Action', actionSchema);
