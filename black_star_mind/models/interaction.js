const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const interactionSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    subtype: {
      key: String,
      value: String
    },
    date: {
      type: Date,
      required: true
    },
    description: String,
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
        value03: String,
        key04: [String],
        value04: [String],
        key05: [String],
        value05: [String]
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Interaction', interactionSchema);
