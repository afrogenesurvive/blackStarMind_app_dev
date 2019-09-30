const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type UserGraphics {
  key: String!
  value: String!
  description: String
}

type UserConsumption{
  consumptionCategory: String,
  consumptionBrands: [String],
  consumptionCompanies: [String],
  consumptionMotivations: [String]
}

type UserRef {
  _id: String
  username: String
}

type User {
  _id: ID!
  email: String!
  password: String!
  name: String!
  username: String!
  phone: String
  address: String
  socialMedia: [String]
  demographics: [UserGraphics]
  biographics: [String]
  psychographics: [String]
  consumption: [UserConsumption]
  actions: [Action]
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

type GroupSubtype {
  key: String
  Value: String
}

type Group {
  _id: ID!
  createdAt: String!
  updatedAt: String!
  type: String!
  subtype: GroupSubtype
  name: String!
  description: String!
  users: [User!]
  actions: [Action]
  interactions: [Interaction]
  tags: [String]
}

type Perk {
  _id: ID!
  name: String!
  createdAt: String!
  updatedAt: String!
  description: String!
  type: String!
  subtype: String
  data: [String]
  users: [User]
  groups: [Group]
  content: [Content]
}

type ContentData {
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

type Content {
  _id: ID!
  createdAt: String!
  updatedAt: String!
  title: String!
  domain: String!
  category: String!
  creator: User!
  description: String
  data: [ContentData]
  actions: [Action]
  interactions: [Interaction]
  perks: [Perk]
  tags: [String]
}

type Action {
  _id: ID!
  type: String!
  subtype: String
  createdAt: String!
  target: Content!
  users: [User!]
  description: String
  data: [String]
}

type Interaction {
  _id: ID!
  type: String!
  subtype: String
  createdAt: String!
  target: Content!
  users: [User]
  description: String
  data: String
}

type Search {
  createdAt: String!
  type: String!
  user: User!
  query: String!
  response: [String]
  actions: [Action]
}

input UserGraphicsInput {
  key: String!
  value: String!
  description: String
}

input UserConsumptionInput{
  consumptionCategory: String,
  consumptionBrands: [String],
  consumptionCompanies: [String],
  consumptionMotivations: [String]
}

input UserInput {
  email: String
  password: String
  name: String
  username: String
  phone: String
  address: String
  socialMedia: [String]
  demographics: [UserGraphicsInput]
  biographics: [String]
  psychographics: [String]
  consumption: [String]
  actions: [String]
  content: [String]
  groups: [String]
  interactions: [String]
  searches: [String]
  perks: [String]
}

input GroupSubtypeInput {
  key: String!
  value: String!
}

input UserRefInput {
  _id: String!
  username: String!
}

input GroupInput {
  type: String!
  subtype: String
  name: String!
  description: String!
  users: [UserRefInput]
  actions: [String]
  interactions: [String]
  tags: [String]
}

input PerkInput {
  name: String!
  description: String!
  type: String!
  subtype: String
  data: [String]
  users: [String]
  groups: [String]
  content: [String]
}

input ContentDataInput {
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

input ContentInput {
  title: String!
  domain: String!
  category: String!
  creator: String
  description: String
  data: [String]
  actions: [String]
  interactions: [String]
  perks: [String]
  tags: [String]
}

input ActionInput {
  type: String!
  subtype: String
  target: String
  users: [UserRefInput!]
  description: String
  data: String
}

input InteractionInput {
  type: String!
  subtype: String
  target: String
  users: [UserRefInput!]
  description: String
  data: [String]
}

input SearchInput {
  type: String!
  user: UserRefInput
  query: String!
  response: [String]
  actions: [String]
}


type RootQuery {
    users: [User!]!
    getUserId(_id: ID!): User
    getUserUsername(username: String!): User
    getThisUser: User

    groups: [Group!]!
    getGroupId(groupId: ID!,userId: ID): Group
    getGroupName(groupId: ID, groupName: String!): Group
    getGroupUserId(groupId: ID, userRefInput: UserRefInput!): Group
    getGroupUsername(groupId: ID, groupUsername: String!): Group

    content: [Content!]!
    getContentId(contentId: ID!,userId: ID): Content
    getContentDomain(contentId: ID, contentDomain: String!): Content
    getContentCategory(contentId: ID, contentCategory: String!): Content
    getContentTitle(contentId: ID, contentTitle: String!): Content

    actions: [Action!]!
    interactions: [Interaction!]!
    searches: [Search!]!

    login(email: String!, password: String!): AuthData!

    getPerk(perkId: ID!): Perk
    getAction(actionId: ID!): Action
    getInteraction(interactionId: ID!): Interaction
    getSearch(searchId: ID!): Search
}

type RootMutation {
    createUser(userInput: UserInput): User
    createUserGraphics(userId: ID!, userGraphicsInput: UserGraphicsInput): User
    createUserConsumption(userId: ID!, userConsumptionInput: UserConsumptionInput): User
    updateUser(userId: ID!, userInput: UserInput): User
    updateUserGraphics(userId: ID!, userGraphicsInput: UserGraphicsInput): User
    updateUserConsumption(userId: ID!, userConsumptionInput: UserConsumptionInput): User
    deleteUser(userId: ID!): User

    createGroup(userId: ID!, groupInput: GroupInput): Group
    createGroupUsers(groupId: ID!, userRefInput: UserRefInput): Group
    updateGroup(groupId: ID, groupInput: GroupInput): Group
    updateGroupSubtype(groupId: ID!, groupSubtypeInput: GroupSubtypeInput): Group
    deleteGroup(groupId: ID!): Group

    createContent(userId: ID!, contentInput: ContentInput): Content
    createContentData(contentId: ID!, contentDataInput: ContentDataInput): Content
    updateContentData(contentId: ID!, contentDataInput: ContentDataInput): Content
    updateContent(contentId: ID!, userId: ID!, contentInput: ContentInput): Content
    deleteContent(contentId: ID!, userId: ID!): Content

    createPerk(perkInput: PerkInput): Perk
    updatePerk(perkId: ID!, perkInput: PerkInput): Perk
    deletePerk(perkId: ID!): Perk

    createSearch(userID: ID!, searchInput: SearchInput): Search
    deleteSearch(searchId: ID!): Search

    createAction(userID: ID!, contentId: ID!, actionInput: ActionInput): Action
    deleteAction(actionId: ID!): Action

    createInteraction(userID: ID!, interactionInput: InteractionInput): Interaction
    deleteInteraction(interactionId: ID!): Interaction
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
