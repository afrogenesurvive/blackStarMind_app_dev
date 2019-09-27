const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  socialMedia: [String],
  demographics: [
    {key:String,value:String,description:String}
  ],
  biographics: [
    {key:String,value:String,description:String}
  ],
  psychgraphics: [
    {key:String,value:String,description:String}
  ],
  consumption: [
    {
      consumptionCategory: String,
      consumptionBrands: [String],
      consumptionCompanies: [String],
      consumptionMotivations: [String]
    }
  ],
  contentActions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Action'
    }
  ],
  content: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Content'
    }
  ],
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Group'
    }
  ],
  interactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Interaction'
    }
  ],
  searches: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Search'
    }
  ],
  perks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Perk'
    }
  ]
},
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
