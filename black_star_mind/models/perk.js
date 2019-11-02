const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const perkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: String,
    required: true
  },
  subtype: {
    key: String,
    value: String
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
  ],
  tags: [String]
});

module.exports = mongoose.model('Perk', perkSchema);
