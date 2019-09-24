const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userEmail: {
    type: String,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userPhone: {
    type: String,
    required: true
  },
  userAddress: String,
  userSocialMedia: [String],
  userDemographics: [
    {key:String,value:String}
  ],
  userBiographics: [
    {key:String,value:String}
  ],
  userPsychgraphics: [
    {key:String,value:String}
  ],
  userConsumption: [
    {
      consumptionCategory: Sting,
      consumptionBrands: [String],
      consumptionCompanies: [String],
      consumptionMotivations: [String],
    }
  ],
  userContentActions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ContentAction'
    }
  ],
  userContent: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Content'
    }
  ],
  userMarketActions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'MarketAction'
    }
  ],
  userProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  userGroups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Group'
    }
  ],
  userInteractions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Interaction'
    }
  ],
  userTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }
  ],
  userSearches: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Search'
    }
  ],
  userPerks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Perk'
    }
  ]
},
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
