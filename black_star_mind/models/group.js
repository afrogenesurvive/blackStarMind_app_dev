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
      type: Schema.Types.ObjectId,ref: 'User'
    },
    users: [
      {
        _id: String,
        username: String
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
