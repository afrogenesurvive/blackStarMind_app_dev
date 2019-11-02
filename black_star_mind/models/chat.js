const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: false
  },
  sender:
    {
      type: Schema.Types.ObjectId,
          ref: 'User'
    },
  receiver:
    {
      type: Schema.Types.ObjectId,
          ref: 'User'
    },
    message:{
      type: String,
      required: true
    },
  tags: [String]
});

module.exports = mongoose.model('Chat', chatSchema);
