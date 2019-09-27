const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
    _id: ID!
    email: String!
    password: String!
    name: String!
    username: String!
    phone: String
    address: String
    socialMedia: [String]
    demographics: [String]
    biographics: [String]
    psychgraphics: [String]
    consumption: [String]
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

type Group {
    _id: ID!
    createdAt: String!
    updatedAt: String!
    type: String!
    subtype: String
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

type Content {
    _id: ID!
    createdAt: String!
    updatedAt: String!
    title: String!
    domain: String!
    category: String!
    creator: User!
    description: String
    data: [String]
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



input UserInput {
  email: String!
  password: String!
  name: String!
  username: String!
  phone: String
  address: String
  socialMedia: [String]
  demographics: [String]
  biographics: [String]
  psychgraphics: [String]
  consumption: [String]
  actions: [String]
  content: [String]
  groups: [String]
  interactions: [String]
  searches: [String]
  perks: [String]
}

input GroupInput {
  type: String!
  subtype: String
  name: String!
  description: String!
  users: [String!]
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
  users: [String!]
  description: String
  data: String
}

input InteractionInput {
  type: String!
  subtype: String
  target: String
  users: [String!]
  description: String
  data: [String]
}

input SearchInput {
  type: String!
  user: String
  query: String!
  response: [String]
  actions: [String]
}


type RootQuery {
    users: [User!]!
    getUser(username: String!): User
    groups: [Group!]!
    content: [Content!]!
    actions: [Action!]!
    interactions: [Interaction!]!
    searches: [Search!]!

    login(email: String!, password: String!): AuthData!

    getGroup(groupId: ID!): Group
    getContent(userId: ID!, contentId: ID!): Content
    getPerk(perkId: ID!): Perk
    getAction(actionId: ID!): Action
    getInteraction(interactionId: ID!): Interaction
    getSearch(searchId: ID!): Search
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
