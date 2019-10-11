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
  friends: [UserRef]
  groups: [GroupRef]
  interactions: [Interaction]
  searches: [SearchRef]
  perks: [PerkRef]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

type GroupRef {
  _id: String
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
  creator: UserRef
  users: [UserRef]
  data: [GroupData]
  content: [ContentRef]
  interactions: [Interaction]
  perks: [PerkRef]
  tags: [String]
  upvotes: Int
  downvotes: Int
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

type Comment {
  comment: String
  user: UserRef
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
  creator: UserRef
  description: String
  users: [UserRef]
  data: [ContentData]
  interactions: [Interaction]
  perks: [PerkRef]
  tags: [String]
  comments: [Comment]
  upvotes: Int
  downvotes: Int
}

type ActionRef {
  _id: String
  action: String
  targetId: String
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
  creator: UserRef
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
  description: String!
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
  type: String
  user: UserRef
  query: SearchQuery
  response: [SearchResponse]
  actions: [ActionRef]
  tags: [String]
}

input UserRefInput {
  _id: String!
  username: String!
}

input UserGraphicsInput {
  key: String!
  value: String!
  description: String
}

input UserConsumptionInput{
  consumptionCategory: String!
  consumptionBrands: [String]!
  consumptionCompanies: [String]!
  consumptionMotivations: [String]!
}

input UserInput {
  email: String!
  password: String!
  name: String!
  username: String!
  phone: String!
  address: String!
  socialMedia: [String]
  demographics: [UserGraphicsInput]
  biographics: [UserGraphicsInput]
  psychographics: [UserGraphicsInput]
  consumption: [UserConsumptionInput]
  actions: [ActionRefInput]
  content: [ContentRefInput]
  groups: [GroupRefInput]
  friends: [UserRefInput]
  interactions: [String]
  searches: [SearchRefInput]
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
  type: String!
  subtype: GroupSubtypeInput!
  name: String!
  description: String!
  creator: UserRefInput
  users: [UserRefInput]
  data: [GroupDataInput]
  content: [ContentRefInput]
  interactions: [String]
  perks: [PerkRefInput]
  tags: [String]
  upvotes: Int
  downvotes: Int
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
  name: String!
  description: String!
  type: String!
  subtype: PerkSubtypeInput!
  data: [PerkDataInput]
  users: [UserRefInput]
  groups: [GroupRefInput]
  content: [ContentRefInput]
  tags: [String]
}

input CommentInput {
  comment: String!
  user: UserRefInput!
}

input ContentRefInput {
  _id: String!
  title: String!
}

input ContentTypeInput{
  medium: String!
  mediumSubtype: String!
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
  ContentType: ContentTypeInput!
  creator: UserRefInput
  description: String
  users: [UserRefInput]
  data: [ContentDataInput]
  interactions: [String]
  perks: [PerkRefInput]
  tags: [String]
  comments: [CommentInput]
  upvotes: Int
  downvotes: Int
}

input ActionRefInput {
  _id: String!
  action: String!
  targetId: String!
  targetTitle: String!
}

input ActionSubtypeInput {
  key: String!
  value: String!
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
  type: String!
  subtype: ActionSubtypeInput!
  target: ContentRefInput!
  creator: UserRefInput
  users: [UserRefInput]
  description: String
  data: [ActionDataInput]
}

input InteractionInput {
  type: String
  subtype: String
  target: String
  users: [UserRefInput]
  description: String
  data: [String]
}

input SearchRefInput {
  _id: String!
  query: SearchQueryInput!
}

input SearchQueryInput {
  target: String!
  body: String!
}

input SearchResponseInput {
  title: String!
  url: String!
  content: String!
}

input SearchInput {
  type: String!
  user: UserRefInput!
  query: SearchQueryInput!
  response: [SearchResponseInput]
  actions: [ActionRefInput]
  tags: [String]
}


type RootQuery {
    users(userId: ID!): [User]
    getUserId(userId: ID!): User
    getUserUsername(userId: ID!, username: String!): User
    getUserEmail(userId: ID!, email: String!): User
    getUserGroup(userId: ID!, groupRefInput: GroupRefInput!): [User]
    getUserActionType(userId: ID!, actionRefInput: ActionRefInput): [User]
    getUserFriend(userId: ID!, userRefInput: UserRefInput): [User]
    getUserContent(userId: ID!, contentRefInput: ContentRefInput): [User]
    getUserPerk(userId: ID!, perkRefInput: PerkRefInput): [User]
    getUserSearchType(userId: ID!, searchRefInput: SearchRefInput): [User]
    getThisUser: User

    groups(userId: ID!): [Group]
    getGroupId(userId: ID!, groupId: ID!): Group
    getGroupName(userId: ID!, name: String!): Group
    getGroupCreator(userId: ID!, userRefInput: UserRefInput!): [Group]
    getGroupUser(userId: ID!, userRefInput: UserRefInput!): [Group]
    getGroupContent(userId: ID!, contentRefInput: ContentRefInput!): [Group]
    getGroupPerk(userId: ID!, perkRefInput: PerkRefInput!): [Group]
    getGroupUpvote(userId: ID!, upvotes: Int): [Group]
    getGroupDownvote(userId: ID!, downvotes: Int): [Group]
    getGroupTag(userId: ID!, tag: String): [Group]

    contents: [Content]
    getContentId(userId: ID!, contentId: ID!): Content
    getContentDomain(userId: ID!, domain: String!): [Content]
    getContentCategory(userId: ID!, category: String!): [Content]
    getContentTitle(userId: ID!, title: String!): Content
    getContentCreator(userId: ID!, userRefInput: UserRefInput!): [Content]
    getContentUser(userId: ID!, userRefInput: UserRefInput!): [Content]
    getContentPerk(userId: ID!, perkRefInput: PerkRefInput!): [Content]
    getContentComment(userId: ID!, comment: CommentInput!): [Content]
    getContentUpvote(userId: ID!, upvotes: Int): [Content]
    getContentDownvote(userId: ID!, downvotes: Int): [Content]
    getContentTag(userId: ID!, tag: String): [Content]

    actions(userId: ID!): [Action!]
    getActionId(userId: ID!, actionId: ID!): Action
    getActionCreator(userId: ID!, userRefInput: UserRefInput!): [Action]
    getActionType(userId: ID!, type: String!): [Action]
    getActionTarget(userId: ID!, contentRefInput: ContentRefInput!): [Action]
    getActionUser(userId: ID!, userRefInput: UserRefInput!): [Action]
    getActionTag(userId: ID!, tag: String): [Action]

    interactions: [Interaction!]!

    login(email: String!, password: String!): AuthData!

    perks(userId: ID!): [Perk]
    getPerkId(userId: ID!, perkId: ID): Perk
    getPerkName(userId: ID!, name: String): Perk
    getPerkType(userId: ID!, type: String): [Perk]
    getPerkUser(userId: ID!, userRefInput: UserRefInput!): [Perk]
    getPerkGroup(userId: ID!, groupRefInput: GroupRefInput!): [Perk]
    getPerkContent(userId: ID!, contentRefInput: ContentRefInput!): [Perk]
    getPerkTag(userId: ID!, tag: String): [Perk]

    getInteraction(interactionId: ID!): Interaction

    searches(userId: ID!): [Search]
    getSearchId(userId: ID!, searchId: ID!): Search
    getSearchType(userId: ID!, type: String): [Search]
    getSearchUser(userId: ID!, userRefInput: UserRefInput!): [Search]
    getSearchQuery(userId: ID!, searchQueryInput: SearchQueryInput!): [Search]
    getSearchQueryTarget(userId: ID!, searchQueryInput: SearchQueryInput!): [Search]
    getSearchQueryBody(userId: ID!, searchQueryInput: SearchQueryInput!): [Search]
    getSearchResponse(userId: ID!, searchResponseInput: SearchResponseInput!): [Search]
    getSearchAction(userId: ID!, actionRefInput: ActionRefInput!): [Search]
    getSearchTag(userId: ID!, tag: String): [Search]
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
    updateUserFriend(userId: ID!, userRefInput: [UserRefInput]): User
    updateUserAction(userId: ID!, actionRefInput: [ActionRefInput]): User
    updateUserPerk(userId: ID!, perkRefInput: [PerkRefInput]): User
    updateUserSearch(userId: ID!, searchRefInput: [SearchRefInput]): User
    deleteUser(userId: ID!): User

    createGroup(userId: ID!, groupInput: GroupInput): Group
    updateGroup(userId: ID!, groupId: ID, groupInput: GroupInput): Group
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
