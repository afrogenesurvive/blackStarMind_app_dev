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
  dob:{
    type: Date
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
  psychographics: [
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
  friends: [
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
