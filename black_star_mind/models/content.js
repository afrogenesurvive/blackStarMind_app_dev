const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentSchema = new Schema({
  contentTitle: {
    type: String,
    required: true
  },
  contentDescription: {
    type: String,
    required: true
  },
  contentCategory: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  contentType: {
    medium: String,
    mediumSubtype: String
  },
  contentTags: [String],
  contentPerks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Perks'
    }
  ],
  contentData: 
},
  { timestamps: true }
);

module.exports = mongoose.model('Content', contentSchema);
