const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type UserRef {
  _id: String
  username: String
}


type UserGraphics {
  key: String
  value: String
  description: String
}

type UserConsumption{
  consumptionCategory: String,
  consumptionBrands: [String],
  consumptionCompanies: [String],
  consumptionMotivations: [String]
}

type User {
  _id: ID!
  email: String
  password: String
  name: String
  username: String
  phone: String
  address: String
  socialMedia: [String]
  demographics: [UserGraphics]
  biographics: [UserGraphics]
  psychographics: [UserGraphics]
  consumption: [UserConsumption]
  actions: [ActionRef]
  content: [ContentRef]
  groups: [GroupRef]
  interactions: [Interaction]
  searches: [Search]
  perks: [PerkRef]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

type GroupRef {
  _id: String!
  name: String
}

type GroupSubtype {
  key: String
  value: String
}

type GroupData {
 key01: String,
 value01: String,
 key02: String,
 value02: String,
 key03: [String],
 value03: [String]
}

type Group {
  _id: ID!
  type: String
  subtype: GroupSubtype
  name: String
  description: String
  creator: String
  users: [UserRef]
  data: [GroupData]
  actions: [ActionRef!]
  content: [ContentRef]
  interactions: [Interaction]
  tags: [String]
}

type PerkRef {
  _id: String!
  name: String
}

type PerkSubtype {
  key: String
  value: String
}

type PerkData {
 key01: String,
 value01: String,
 key02: String,
 value02: String,
 key03: [String],
 value03: [String]
}

type Perk {
  _id: ID!
  name: String
  description: String
  type: String
  subtype: PerkSubtype
  data: [PerkData]
  users: [UserRef]
  groups: [GroupRef]
  content: [ContentRef]
  tags: [String]
}

type ContentRef {
  _id: String
  title: String
}

type ContentType {
  medium: String,
  mediumSubtype: String
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
  title: String
  domain: String
  category: String
  ContentType: ContentType
  creator: String
  description: String
  users: [UserRef]
  data: [ContentData]
  actions: [ActionRef]
  interactions: [Interaction]
  perks: [PerkRef]
  tags: [String]
}

type ActionRef {
  _id: String,
  action: String,
  targetId: String,
  targetTitle: String
}

type ActionSubtype {
  key: String
  value: String
}

 type ActionData {
  key01: String,
  value01: String,
  key02: String,
  value02: String,
  key03: [String],
  value03: [String]
}

type Action {
  _id: ID!
  type: String
  subtype: ActionSubtype
  target: ContentRef
  creator: String
  users: [UserRef]
  description: String
  data: [ActionData]
  tags: [String]
}

type Interaction {
  _id: ID!
  type: String
  subtype: String
  target: ContentRef
  users: [UserRef]
  description: String
  data: String
  tags: [String]
}

type SearchRef {
  _id: String
  query: SearchQuery
}

type SearchQuery {
  target: String
  body: String
}

type SearchResponse {
  title: String
  url: String
  content: String
}

type Search {
  _id: ID!
  type: String!
  user: UserRef!
  query: SearchQuery
  response: [SearchResponse]
  actions: [ActionRef]
  tags: [String]
}

input UserRefInput {
  _id: String
  username: String
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
  biographics: [UserGraphicsInput]
  psychographics: [UserGraphicsInput]
  consumption: [UserConsumptionInput]
  actions: [ActionRefInput]
  content: [ContentRefInput]
  groups: [GroupRefInput]
  interactions: [String]
  searches: [String]
  perks: [PerkRefInput]
}

input GroupRefInput {
  _id: String!
  name: String!
}

input GroupSubtypeInput {
  key: String!
  value: String!
}
input GroupDataInput {
  key01: String,
  value01: String,
  key02: String,
  value02: String,
  key03: [String],
  value03: [String]
}

input GroupInput {
  type: String
  subtype: GroupSubtypeInput
  name: String
  description: String
  creator: String
  users: [UserRefInput]
  data: [GroupDataInput]
  actions: [ActionRefInput]
  content: [ContentRefInput]
  interactions: [String]
  tags: [String]
}

input PerkRefInput {
  _id: String!
  name: String!
}

input PerkSubtypeInput {
  key: String!
  value: String!
}

input PerkDataInput {
  key01: String,
  value01: String,
  key02: String,
  value02: String,
  key03: [String],
  value03: [String]
}

input PerkInput {
  name: String
  description: String
  type: String
  subtype: PerkSubtypeInput
  data: [PerkDataInput]
  users: [UserRefInput]
  groups: [GroupRefInput]
  content: [ContentRefInput]
  tags: [String]
}

input ContentRefInput {
  _id: String
  title: String
}

input ContentTypeInput{
  medium: String,
  mediumSubtype: String
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
  ContentType: ContentTypeInput
  creator: String
  description: String
  users: [UserRefInput]
  data: [ContentDataInput]
  actions: [ActionRefInput]
  interactions: [String]
  perks: [PerkRefInput]
  tags: [String]
}

input ActionRefInput {
  _id: String,
  action: String,
  targetId: String,
  targetTitle: String
}

input ActionSubtypeInput {
  key: String!
  value: String
}

input ActionDataInput {
  key01: String,
  value01: String,
  key02: String,
  value02: String,
  key03: [String],
  value03: [String]
}

input ActionInput {
  type: String
  subtype: ActionSubtypeInput
  target: ContentRefInput
  creator: String
  users: [UserRefInput]
  description: String
  data: [ActionDataInput]
}

input InteractionInput {
  type: String!
  subtype: String
  target: String
  users: [UserRefInput]
  description: String
  data: [String]
}

input SearchRefInput {
  _id: String
  query: SearchQueryInput
}

input SearchQueryInput {
  target: String
  body: String
}

input SearchResponseInput {
  title: String
  url: String
  content: String
}

input SearchInput {
  type: String
  user: UserRefInput
  query: SearchQueryInput
  response: [SearchResponseInput]
  actions: [ActionRefInput]
  tags: [String]
}


type RootQuery {
    users: [User]
    getUserId(userId: ID!): User
    getUserUsername(username: String!): User
    getUserEmail(email: String!): User
    getThisUser: User

    groups: [Group]
    getGroupId(groupId: ID!,userId: ID): Group
    getGroupName(name: String!): Group
    getGroupCreator(groupId: ID, creator: String!): Group
    getGroupUser(groupId: ID, userRefInput: UserRefInput!): [Group]
    getGroupTag(groupId: ID, tag: String): [Group]

    contents: [Content]
    getContentId(contentId: ID!,userId: ID): Content
    getContentDomain(contentId: ID, domain: String!): [Content]
    getContentCategory(contentId: ID, category: String!): [Content]
    getContentTitle(contentId: ID, title: String!): Content
    getContentCreator(contentId: ID, creator: String!): [Content]
    getContentUser(contentId: ID, userRefInput: UserRefInput!): [Content]
    getContentTag(contentId: ID, tag: String): [Content]

    actions: [Action!]
    getActionId(actionId: ID!): Action
    getActionCreator(groupId: ID, creator: String!): [Action]
    getActionType(actionId: ID, type: String!): [Action]
    getActionTarget(actionId: ID, contentRefInput: ContentRefInput!): [Action]
    getActionUser(actionId: ID, userRefInput: UserRefInput!): [Action]
    getActionTag(actionId: ID, tag: String): [Action]

    interactions: [Interaction!]!

    login(email: String!, password: String!): AuthData!

    perks: [Perk]
    getPerkId(perkId: ID, userId: ID): Perk
    getPerkName(perkId: ID, name: String): Perk
    getPerkType(perkId: ID, type: String): [Perk]
    getPerkUser(perkId: ID, userRefInput: UserRefInput!): [Perk]
    getPerkGroup(perkId: ID, groupRefInput: GroupRefInput!): [Perk]
    getPerkTag(perkId: ID, tag: String): [Perk]

    getInteraction(interactionId: ID!): Interaction

    searches: [Search]
    getSearchId(searchId: ID!): Search
    getSearchType(searchId: ID, type: String): [Search]
    getSearchUser(searchId: ID, userRefInput: UserRefInput!): [Search]
    getSearchQuery(searchId: ID, searchQueryInput: SearchQueryInput!): [Search]
    getSearchQueryTarget(searchId: ID, searchQueryInput: SearchQueryInput!): [Search]
    getSearchQueryBody(searchId: ID, searchQueryInput: SearchQueryInput!): [Search]
    getSearchResponse(searchId: ID, searchResponseInput: SearchResponseInput!): [Search]
    getSearchAction(searchId: ID, actionRefInput: ActionRefInput!): [Search]
    getSearchTag(searchId: ID, tag: String): [Search]
}

type RootMutation {
    createUser(userInput: UserInput): User
    updateUser(userId: ID!, userInput: UserInput): User
    updateUserSocial(userId: ID!, userSocial: [String]): User
    updateUserDemographics(userId: ID!, userGraphicsInput: [UserGraphicsInput]): User
    updateUserBiographics(userId: ID!, userGraphicsInput: [UserGraphicsInput]): User
    updateUserPsychographics(userId: ID!, userGraphicsInput: [UserGraphicsInput]): User
    updateUserConsumption(userId: ID!, userConsumptionInput: [UserConsumptionInput]): User
    updateUserContent(userId: ID!, contentRefInput: [ContentRefInput]): User
    updateUserGroup(userId: ID!, groupRefInput: [GroupRefInput]): User
    updateUserAction(userId: ID!, actionRefInput: [ActionRefInput]): User
    deleteUser(userId: ID!): User

    createGroup(userId: ID!, groupInput: GroupInput): Group
    updateGroup(groupId: ID, groupInput: GroupInput): Group
    updateGroupSubtype(groupId: ID!, groupSubtypeInput: GroupSubtypeInput): Group
    updateGroupUser(groupId: ID!, userRefInput: [UserRefInput]): Group
    updateGroupData(groupId: ID!, groupDataInput: [GroupDataInput]): Group
    updateGroupContent(groupId: ID!, contentRefInput: [ContentRefInput]): Group
    updateGroupAction(groupId: ID!, actionRefInput: [ActionRefInput]): Group
    updateGroupTag(groupId: ID!, tags: [String]): Group
    deleteGroup(groupId: ID!): Group

    createContent(userId: ID!, userRefInput: UserRefInput, contentInput: ContentInput): Content
    updateContent(contentId: ID!, userId: ID!, contentInput: ContentInput): Content
    updateContentUser(contentId: ID!, userRefInput: [UserRefInput]): Content
    updateContentData(contentId: ID!, contentDataInput: [ContentDataInput]): Content
    updateContentAction(contentId: ID!, actionRefInput: [ActionRefInput]): Content
    updateContentTag(contentId: ID!, tags: [String]): Content
    deleteContent(contentId: ID!, userId: ID): Content

    createPerk(perkInput: PerkInput): Perk
    updatePerk(perkId: ID!, perkInput: PerkInput): Perk
    updatePerkSubtype(perkId: ID!, perkSubtypeInput: PerkSubtypeInput): Perk
    updatePerkData(perkId: ID!, perkDataInput: [PerkDataInput]): Perk
    updatePerkUser(perkId: ID!, userId: ID, userRefInput: [UserRefInput]): Perk
    updatePerkGroup(perkId: ID!, userId: ID, groupRefInput: [GroupRefInput]): Perk
    updatePerkContent(perkId: ID!, userId: ID, contentRefInput: [ContentRefInput]): Perk
    updatePerkTag(perkId: ID!, tags: [String]): Perk
    deletePerk(perkId: ID!): Perk

    createSearch(userID: ID, searchInput: SearchInput): Search
    updateSearch(searchId: ID!, userID: ID, searchInput: SearchInput): Search
    updateSearchUser(searchId: ID!, userRefInput: UserRefInput): Search
    updateSearchQuery(searchId: ID!, searchQueryInput: SearchQueryInput): Search
    updateSearchResponse(searchId: ID!, searchResponseInput: [SearchResponseInput]): Search
    updateSearchAction(searchId: ID!, actionRefInput: [ActionRefInput]): Search
    updateSearchTag(searchId: ID!, tags: [String]): Search
    deleteSearch(searchId: ID!): Search

    createAction(userId: ID!, actionInput: ActionInput): Action
    updateAction(actionId: ID!, userId: ID!, , actionInput: ActionInput): Action
    updateActionSubtype(actionId: ID!, actionSubtypeInput: ActionSubtypeInput): Action
    updateActionTarget(actionId: ID!, contentRefInput: ContentRefInput): Action
    updateActionUser(actionId: ID!, userRefInput: [UserRefInput]): Action
    updateActionData(actionId: ID!, userId: ID!, , actionDataInput: [ActionDataInput]): Action
    updateActionTag(actionId: ID!, userId: ID!, tags:[String]): Action
    deleteAction(actionId: ID!): Action

    createInteraction(userID: ID!, interactionInput: InteractionInput): Interaction
    deleteInteraction(interactionId: ID!): Interaction
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
