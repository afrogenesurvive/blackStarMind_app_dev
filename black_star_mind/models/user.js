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
  actions: [
    {
      _id: String,
      action: String,
      targetId: String,
      targetTitle: String
    }
  ],
  content: [
    {
      _id: String,
      title: String
    }
  ],
  groups: [
    {
      _id: String,
      name: String
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
      _id: String,
      query: {
        target: String,
        body: String
      }
    }
  ],
  perks: [
    {
      _id: String,
      name: String
    }
  ]
},
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
