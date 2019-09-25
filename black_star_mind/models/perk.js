const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const perkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  updatedAt: {
    type: String,
    required: true
  },
  description: {
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
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Group'
    }
  ],
  content: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Content'
    }
  ]
});

module.exports = mongoose.model('Perk', perkSchema);
