const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    createdAt: {
      type: String,
      required: true
    },
    updatedAt: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    subtype: {
      key: String,
      value: String
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    actions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Action'
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
