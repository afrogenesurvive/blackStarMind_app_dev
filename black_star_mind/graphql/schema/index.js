
const { GraphQLObjectType, GraphQLString } = require('graphql')
const {GraphQLObjectId} = require('graphql-scalar-objectid')
const { buildSchema } = require('graphql');

module.exports = buildSchema(`

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
  dob: String
  username: String
  phone: String
  description: String
  avatar: String
  address: String
  socialMedia: [String]
  demographics: [UserGraphics]
  biographics: [UserGraphics]
  psychographics: [UserGraphics]
  consumption: [UserConsumption]
  actions: [Action]
  content: [Content]
  friends: [User]
  messages: [Message]
  groups: [Group]
  searches: [Search]
  perks: [Perk]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

type Message {
  _id: ID!
  title: String
  date: String
  type: String
  sender: User
  receiver: User
  body: String
  tags: [String]
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
 key03: String,
 value03: [String]
}

type Group {
  _id: ID!
  type: String
  subtype: GroupSubtype
  name: String
  description: String
  creator: User
  users: [User]
  data: [GroupData]
  content: [Content]
  perks: [Perk]
  tags: [String]
  upvotes: Votes
  downvotes: Votes
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
 key03: String,
 value03: [String]
}

type Perk {
  _id: ID!
  name: String
  description: String
  type: String
  subtype: PerkSubtype
  data: [PerkData]
  users: [User]
  groups: [Group]
  content: [Content]
  tags: [String]
}

type Comment {
  comment: String
  user: User
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
  key07: String,
  value07: [String],
  key08: String,
  value08: [String],
  key09: String,
  value09: String,
  key10: String,
  value10: String
}

type Votes {
  users: [String]
  count: Int
}

type Content {
  _id: ID!
  title: String
  domain: String
  category: String
  contentType: ContentType
  creator: User
  description: String
  users: [User]
  data: [ContentData]
  perks: [Perk]
  tags: [String]
  comments: [Comment]
  upvotes: Votes
  downvotes: Votes
}

type Action {
  _id: ID!
  creator: User
  type: String
  body: String
}

type SearchResponse {
  title: String
  url: String
  content: String
}

type SearchQuery {
  target: String
  body: String
}

type Search {
  _id: ID!
  type: String
  user: User
  query: SearchQuery
  response: [SearchResponse]
  tags: [String]
}

input UserGraphicsInput {
  key: String
  value: String
  description: String
}

input UserConsumptionInput{
  consumptionCategory: String
  consumptionBrands: [String]
  consumptionCompanies: [String]
  consumptionMotivations: [String]
}

input UserInput {
  email: String
  password: String
  name: String
  dob: String
  username: String
  description: String
  avatar: String
  phone: String
  address: String
  socialMedia: [String]
  demographics: [UserGraphicsInput]
  biographics: [UserGraphicsInput]
  psychographics: [UserGraphicsInput]
  consumption: [UserConsumptionInput]
  actions: [String]
  content: [String]
  groups: [String]
  friends: [String]
  searches: [String]
  perks: [String]
}

input MessageInput {
  title: String
  date: String
  type: String
  sender: String
  receiver: String
  body: String
  tags: [String]
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
  key03: String,
  value03: [String]
}

input GroupInput {
  type: String
  subtype: GroupSubtypeInput
  name: String
  description: String
  creator: String
  users: [String]
  data: [GroupDataInput]
  content: [String]
  perks: [String]
  tags: [String]
  upvotes: String
  downvotes: String
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
  key03: String,
  value03: [String]
}

input PerkInput {
  name: String
  description: String
  type: String
  subtype: PerkSubtypeInput
  data: [PerkDataInput]
  users: [String]
  groups: [String]
  content: [String]
  tags: [String]
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
    key07: String,
    value07: [String],
    key08: String,
    value08: [String],
    key09: String,
    value09: String,
    key10: String,
    value10: String
}

input ContentInput {
  title: String
  domain: String
  category: String
  contentType: ContentTypeInput
  creator: String
  description: String
  users: [String]
  data: [ContentDataInput]
  perks: [String]
  tags: [String]
  comments: [String]
  upvotes: String
  downvotes: String
}

input ActionInput {
  creator: String
  type: String
  body: String
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
  user: String!
  query: SearchQueryInput!
  response: [SearchResponseInput]
  tags: [String]
}


type RootQuery {
    users(userId: ID!): [User]
    getUserId(userId: ID! otherUserId: ID!): User
    getUserUsername(userId: ID!, username: String!): User
    getUserEmail(userId: ID!, email: String!): User
    getUserDob(userId: ID!, dob: String!): User
    getUserGroup(userId: ID!, userGroupId: ID!): [User]
    getUserActionType(userId: ID!, actionId: ID!): [User]
    getUserFriend(userId: ID!, friendId: ID!): [User]
    getUserContent(userId: ID!, contentId: ID!): [User]
    getUserPerk(userId: ID!, perkId: ID!): [User]
    getUserSearchType(userId: ID!, searchType: String!): [User]
    getThisUser: User

    messages(userId: ID!): [Message]
    getMessageId(userId: ID!, chatId: ID!): Message

    groups(userId: ID!): [Group]
    getGroupId(userId: ID!, groupId: ID!): Group
    getGroupType(userId: ID!, type: String!): [Group]
    getGroupName(userId: ID!, name: String!): Group
    getGroupCreator(userId: ID!, creatorId: ID!): [Group]
    getGroupUser(userId: ID!, groupUserId: ID!): [Group]
    getGroupContent(userId: ID!, contentId: ID!): [Group]
    getGroupPerk(userId: ID!, perkId: ID!): [Group]
    getGroupUpvotes(userId: ID!, upvotes: Int!): [Group]
    getGroupDownvotes(userId: ID!, downvotes: Int!): [Group]
    getGroupTag(userId: ID!, tag: String!): [Group]

    content(userId: ID!): [Content]
    getContentId(userId: ID!, contentId: ID!): Content
    getContentTypeMedium(userId: ID!, medium: String!): [Content]
    getContentDomain(userId: ID!, domain: String!): [Content]
    getContentCategory(userId: ID!, category: String!): [Content]
    getContentTitle(userId: ID!, title: String!): Content
    getContentCreator(userId: ID!, creatorId: ID!): [Content]
    getContentUser(userId: ID!, contentUserId: ID!): [Content]
    getContentPerk(userId: ID!, perkId: ID!): [Content]
    getContentCommentCreator(userId: ID!, commentCreator: ID!): [Content]
    getContentComment(userId: ID!, comment: String!): [Content]
    getContentUpvotes(userId: ID!, upvotes: Int!): [Content]
    getContentDownvotes(userId: ID!, downvotes: Int!): [Content]
    getContentTag(userId: ID!, tag: String!): [Content]

    perks(userId: ID!): [Perk]
    getPerkId(userId: ID!, perkId: ID!): Perk
    getPerkName(userId: ID!, name: String!): Perk
    getPerkType(userId: ID!, type: String!): [Perk]
    getPerkUser(userId: ID!, perkUserId: ID!): [Perk]
    getPerkGroup(userId: ID!, groupId: ID!): [Perk]
    getPerkContent(userId: ID!, contentId: ID!): [Perk]
    getPerkTag(userId: ID!, tag: String!): [Perk]

    actions(userId: ID!): [Action!]
    getActionId(userId: ID!, actionId: ID!): Action
    getActionCreator(userId: ID!, creatorId: ID!): [Action]
    getActionType(userId: ID!, type: String!): [Action]
    getActionBody(userId: ID!, body: String!): [Action]
    getActionTag(userId: ID!, tag: String!): [Action]

    login(email: String!, password: String!): AuthData!

    searches(userId: ID!): [Search]
    getSearchId(userId: ID!, searchId: ID!): Search
    getSearchType(userId: ID!, type: String!): [Search]
    getSearchUser(userId: ID!, searchUserId: ID!): [Search]
    getSearchQuery(userId: ID!, searchQueryInput: SearchQueryInput!): [Search]
    getSearchQueryBody(userId: ID!, searchQueryInput: SearchQueryInput!): [Search]
    getSearchResponse(userId: ID!, searchResponseInput: SearchResponseInput!): [Search]
    getSearchTag(userId: ID!, tag: String!): [Search]
}

type RootMutation {
    createUser(userInput: UserInput!): User
    updateUser(userId: ID!, userInput: UserInput!): User
    updateUserSocial(userId: ID!, userSocial: [String!]): User
    updateUserDemographics(userId: ID!, userGraphicsInput: [UserGraphicsInput!]): User
    updateUserBiographics(userId: ID!, userGraphicsInput: [UserGraphicsInput!]): User
    updateUserPsychographics(userId: ID!, userGraphicsInput: [UserGraphicsInput!]): User
    updateUserConsumption(userId: ID!, userConsumptionInput: [UserConsumptionInput!]): User
    updateUserContent(userId: ID!, contentId: [ID!]): User
    updateUserGroup(userId: ID!, groupId: [ID!]): User
    updateUserFriend(userId: ID!, friendId: [ID!]): User
    updateUserAction(userId: ID!, actionId: [ID!]): User
    updateUserPerk(userId: ID!, perkId: [ID!]): User
    updateUserSearch(userId: ID!, searchId: [ID!]): User
    deleteUser(userId: ID!): User

    sendMessage(userId: ID!, receiverId: ID!, messageInput: MessageInput!): Message
    deleteMessage(userId: ID!, messageId: ID!): Message

    createGroup(userId: ID!, groupInput: GroupInput!): Group
    updateGroup(userId: ID!, groupId: ID, groupInput: GroupInput!): Group
    updateGroupSubtype(userId: ID!, groupId: ID!, groupSubtypeInput: GroupSubtypeInput!): Group
    updateGroupUser(userId: ID!, groupId: ID!, groupUserId: [ID!]): Group
    updateGroupData(userId: ID!, groupId: ID!, groupDataInput: [GroupDataInput!]): Group
    updateGroupContent(userId: ID!, groupId: ID!, contentId: [ID!]): Group
    updateGroupPerk(userId: ID!, groupId: ID!, perkId: [ID!]): Group
    updateGroupUpvotes(userId: ID!, groupId: ID!, upvotes: Int!): Group
    updateGroupDownvotes(userId: ID!, groupId: ID!, downvotes: Int!): Group
    updateGroupTag(userId: ID!, groupId: ID!, tags: [String!]): Group
    deleteGroup(userId: ID!, groupId: ID!): Group

    createContent(userId: ID!, contentInput: ContentInput!): Content
    updateContent(userId: ID!, contentId: ID!, contentInput: ContentInput!): Content
    updateContentUser(userId: ID!, contentId: ID!, contentUserId: [ID!]): Content
    updateContentData(userId: ID!, contentId: ID!, contentDataInput: [ContentDataInput!]): Content
    updateContentPerk(userId: ID!, contentId: ID!, perkId: [ID!]): Content
    updateContentComment(userId: ID!, contentId: ID!, comment: String!): Content
    updateContentUpvotes(userId: ID!, contentId: ID!): Content
    updateContentDownvotes(userId: ID!, contentId: ID!): Content
    updateContentTag(userId: ID!, contentId: ID!, tags: [String]): Content
    deleteContent(userId: ID!, contentId: ID!): Content

    createPerk(userId: ID!, perkInput: PerkInput!): Perk
    updatePerk(userId: ID!, perkId: ID!, perkInput: PerkInput!): Perk
    updatePerkSubtype(userId: ID!, perkId: ID!, perkSubtypeInput: PerkSubtypeInput!): Perk
    updatePerkData(userId: ID!, perkId: ID!, perkDataInput: [PerkDataInput!]): Perk
    updatePerkUser(userId: ID!, perkId: ID!, perkUserId: [ID!]): Perk
    updatePerkGroup(userId: ID!, perkId: ID!, groupId: [ID!]): Perk
    updatePerkContent(userId: ID!, perkId: ID!, contentId: [ID!]): Perk
    updatePerkTag(userId: ID!, perkId: ID!, tags: [String!]): Perk
    deletePerk(userId: ID!, perkId: ID!): Perk

    createAction(userId: ID!, actionInput: ActionInput!): Action
    updateAction(userId: ID!, actionId: ID!, actionInput: ActionInput!): Action
    deleteAction(userId: ID!, actionId: ID!): Action

    createSearch(userID: ID!, searchInput: SearchInput!): Search
    updateSearch(userId: ID!, searchId: ID!, searchInput: SearchInput!): Search
    updateSearchUser(userId: ID!, searchId: ID!, searchUserId: ID!): Search
    updateSearchQuery(userId: ID!, searchId: ID!, searchQueryInput: SearchQueryInput!): Search
    updateSearchResponse(userId: ID!, searchId: ID!, searchResponseInput: [SearchResponseInput!]): Search
    updateSearchTag(userId: ID!, searchId: ID!, tags: [String!]): Search
    deleteSearch(userId: ID!, searchId: ID!): Search

}

type RootSubscription {

  messageSent: Message
  messageReceived: Message

}

schema {
    query: RootQuery
    mutation: RootMutation
    subscription: RootSubscription
}
`);
