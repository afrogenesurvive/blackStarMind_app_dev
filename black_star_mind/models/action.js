const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentActionSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    subtype: {
      key: String,
      value: String
    },
    createdAt: {
      type: Date,
      required: true
    },
    target: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Content'
      }
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    description: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContentAction', contentActionSchema);
