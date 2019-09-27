const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  type: {
    medium: String,
    mediumSubtype: String
  },
  description: {
    type: String,
    required: true
  },
  data: [
    {
      key01: String,
      value01: String,
      key02: String,
      value02: String,
      key03: String,
      value03: String,
      key04: String,
      value04: String,
      key05: String,
      value05: String,
      key06: String,
      value06: String,
      key07: [String],
      value07: [String],
      key08: [String],
      value08: [String],
      key09: String,
      value09: String,
      key10: String,
      value10: String
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
  perks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Perks'
    }
  ],
  tags: [String]
},
  { timestamps: true }
);

module.exports = mongoose.model('Content', contentSchema);
