const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    groupType: {
      type: String,
      required: true
    },
    groupName: {
      type: String,
      required: true
    },
    groupDescription: {
      type: String,
      required: true
    },
    groupUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    date: {
      type: Date,
      required: true
    },
    groupTags: [String],
    groupActions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ContentAction'
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Group', groupSchema);
