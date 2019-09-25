const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Content {
    _id: ID!
    createdAt: String!
    updatedAt: String!
    title: String!
    domain: String!
    category: String!
    creator: User!
    description: String
    data: [{
    key01: String
    value01: String
    key02: String
    value02: String
    key03: String
    value03: String
    key04: String
    value04: String
    key05: String
    value05: String
    key06: String
    value06: String
    key07: [String]
    value07: [String]
    key08: [String]
    value08: [String]
    key09: String
    value09: String
    key10: String
    value10: String
      }]
    actions: [ContentAction]
    interactions: [Interaction]
    perks: [Perk]
    tags: [String]
}

type ContentAction {
    _id: ID!
    type: String!
    subtype: {key: String value: String}!
    createdAt: String!
    target: Content!
    users: [User!]
    description: String
}

type Interaction {
    _id: ID!
    type: String!
    subtype: {key: String value: String}!
    createdAt: String!
    target: Content!
    users: [User]
    description: String
    data: [{
    key01: String
    value01: String
    key02: String
    value02: String
    key03: String
    value03: String
    key04: [String]
    value04: [String]
    key05: [String]
    value05: [String]
      }]
}

type Group {
    _id: ID!
    createdAt: String!
    updatedAt: String!
    type: String!
    subtype: {key: String value: String}!
    name: String!
    description: String!
    users: [User!]
    actions: [ContentAction]
    interactions: [Interaction]
    tags: [String]
}

type Perk {
  _id: ID!
  name:
  createdAt: String!
  updatedAt: String!
  description: String!
  type: String!
  subtype: {key: String value: String}!
  data: [{
  key01: String
  value01: String
  key02: String
  value02: String
  key03: [String]
  value03: [String]
    }]
  users: [User]
  groups: [Group]
  content: [Content]
}

type Search {
  createdAt: String!
  user: User!
  query: String!
  response: [{title:String! url: String content: Content}]
  actions: [ContentAction]
}

type User {
  _id: ID!
  email: String!
  password: String!
  name: String!
  phone: String
  address: String
  socialMedia: [String]
  demographics: [{key:String,value:String,description:String}]
  biographics: [{key:String,value:String,description:String}]
  psychgraphics: [{key:String,value:String,description:String}]
  consumption: [{consumptionCategory: Sting,consumptionBrands: [String],consumptionCompanies: [String],consumptionMotivations: [String]}]
  actions: [ContentAction]
  content: [Content]
  groups: [Group]
  interactions: [Interaction]
  searches: [Search]
  perks: [Perk]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input UserInput {
  email: String!
  password: String!
}
input ContentInput {
  email: String!
  password: String!
}
input GroupInput {
  email: String!
  password: String!
}
input PerkInput {
  email: String!
  password: String!
}
input SearchInput {
  email: String!
  password: String!
}
input ContentActionInput {
  email: String!
  password: String!
}
input InteractionInput {
  email: String!
  password: String!
}

type RootQuery {
    users: [Event!]!
    groups: [Booking!]!
    content: [Booking!]!
    actions: [Booking!]!
    interactions: [Booking!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createUser(userInput: UserInput): User
    updateUser(userId: ID!, userInput: UserInput): User
    deleteUser(userId: ID!): User

    createGroup(groupInput: GroupInput): Group
    updateGroup(groupId: ID!, groupInput: GroupInput): Group
    deleteGroup(groupId: ID!): Group

    createContent(userId: ID!, contentInput: ContentInput): Content
    updateContent(userId: ID!, contentId: ID!, contentInput: ContentInput): Content
    deleteContent(userId: ID!, contentId: ID!): Content

    createPerk(perkInput: PerkInput): Perk
    updatePerk(perkId: ID!, perkInput: PerkInput): Perk
    deletePerk(perkId: ID!): Perk

    createSearch(userID: ID!, searchInput: SearchInput): Search
    deleteSearch(searchId: ID!): Search

    createContentAction(userID: ID!, contentId: ID!, contentActionInput: ContentActionInput): ContentAction
    deleteContentAction(contentActionId: ID!): ContentAction

    createInteraction(userID: ID!, interactionInput: InteractionInput): Interaction
    deleteInteraction(interactionId: ID!): Interaction
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
