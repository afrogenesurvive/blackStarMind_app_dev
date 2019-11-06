const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const actionSchema = new Schema(
  {
  creator:
    {
      type: Schema.Types.ObjectId,
          ref: 'User'
    },
    type: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
    { timestamps: true }
);

module.exports = mongoose.model('Action', actionSchema);
