const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');

const User = require('../../models/user');
const Group = require('../../models/group');
const Perk = require('../../models/perk');
const Content = require('../../models/content');
const Action = require('../../models/action');
const Search = require('../../models/search');
const Message = require('../../models/message');

const { transformMessage} = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');

const { PubSub } = require ('graphql-subscriptions');
const pubsub = new PubSub();
// export const pubsub = new PubSub();

console.log("message resolver pubsub instance" + JSON.stringify(pubsub));
const MESSAGE_SENT = 'sentMessage';

module.exports = {
  messages: async (args,req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log("args..." + JSON.stringify(args));
    try {
      const messages = await Message.find()
      .populate('sender')
      .populate('receiver');

      return messages.map(message => {
        return transformMessage(message);
      });
    } catch (err) {
      throw err;
    }
  },
  deleteMessage: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log("args..." + JSON.stringify(args));
    try {
      const message = await Message.findByIdAndRemove(args.messageId)
      .populate('sender')
      .populate('receiver');

        return {
          ...message._doc,
          _id: message.id,
          title: message.title,
          date: message.date,
          type: message.type,
          sender: message.sender,
          receiver: message.receiver,
          body: message.body,
          tags: message.tags
        };
    } catch (err) {
      throw err;
    }
  },
  sendMessage: async (args,req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    console.log("send message args..." + JSON.stringify(args));
    try {
    //   const existingPerk = await Perk.findOne({ name: args.perkInput.name });
    //   if (existingPerk) {
    //     throw new Error('perk name exists already.');
    //   }

    const sender = await User.findById({_id:args.userId});
    const receiver = await User.findById({_id:args.receiverId});

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;

      const message = new Message({
        title: args.messageInput.title,
        date: dateTime,
        type: args.messageInput.type,
        sender: sender,
        receiver: receiver,
        body: args.messageInput.body,
        tags: args.messageInput.tags
      });

      const result = await message.save();

      const messageToReceiver = await User.findOneAndUpdate({_id:args.receiverId},{$addToSet: {messages: message}},{new: true})
      console.log("messageToReceiver..." + messageToReceiver);

      pubsub.publish(MESSAGE_SENT, { messageSent: message });  // publish to a topic

      return {
        ...message._doc,
        _id: message.id,
        title: message.title,
        date: message.date,
        type: message.type,
        sender: message.sender,
        receiver: message.receiver,
        body: message.body,
        tags: message.tags
      };


    } catch (err) {
      throw err;
    }
  },
  messageSent: {  // create a channelAdded subscription resolver function.

      subscribe: () => pubsub.asyncIterator(MESSAGE_SENT)  // subscribe to changes in a topic
    }
};
