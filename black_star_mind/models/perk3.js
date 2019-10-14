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
      key03: String,
      value03: [String]
    }
  ],
  // users: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User'
  //   }
  // ],
  groups: [
    {
      _id: String,
      name: String
    }
  ],
  content: [
    {
      _id: String,
      title: String
    }
  ],
  tags: [String]
});

module.exports = mongoose.model('Perk', perkSchema);
