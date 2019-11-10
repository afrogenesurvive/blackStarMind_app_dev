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

const { transformPerk } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');
const util = require('util');

function isAuth () {

  let decodedToken;
  try {
    decodedToken = jwt.verify(pocketVariables.token, '5CleanStream');
    pocketVariables.isAuth = true;
    pocketVariables.userId = decodedToken.userId;
    console.log("pocketVariables.userId..." + pocketVariables.userId);
    console.log("pocketVariables.isAuth..." + pocketVariables.isAuth);
  } catch (err) {
    console.log(err);
    pocketVariables.isAuth = false;
  }
  if (!decodedToken) {
    pocketVariables.isAuth = false;
    console.log("no decodedToken..." + JSON.stringify(pocketVariables));
  }
  if (!pocketVariables.isAuth) {
    throw new Error('Unauthenticated!');
  }

}

module.exports = {
  perks: async (args,req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }

    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const perks = await Perk.find()
      .populate('users')
      .populate('groups')
      .populate('content');

      return perks.map(perk => {
        return transformPerk(perk);
      });
    } catch (err) {
      throw err;
    }
  },
  getPerkId: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const perk = await Perk.findById(args.perkId)
      .populate('users')
      .populate('groups')
      .populate('content');

        return {
          ...perk._doc,
          _id: perk.id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content,
          tags: perk.tags
        };
    } catch (err) {
      throw err;
    }
  },
  getPerkName: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const perk = await Perk.findOne({name: args.name})
      .populate('users')
      .populate('groups')
      .populate('content');

        return {
          ...perk._doc,
          _id: perk.id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content,
          tags: perk.tags
        };
    } catch (err) {
      throw err;
    }
  },
  getPerkType: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const perks = await Perk.find({type: args.type})
      .populate('users')
      .populate('groups')
      .populate('content');

      return perks.map(perk => {
        return transformPerk(perk);
      });
        // {
        // ...perk._doc,
        // _id: perk._id,
        // name: perk.name,
        // description: perk.description,
        // type: perk.type,
        // subtype: perk.subtype,
        // data: perk.data,
        // users: perk.users,
        // groups: perk.groups,
        // content: perk.content,
        // tags: perk.tags
        // };
    } catch (err) {
      throw err;
    }
  },
  getPerkUser: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const perkUser = await User.findById({_id:args.perkUserId})
      .populate('groups')
      .populate('friends')
      .populate('content')
      .populate('actions')
      .populate('perks')
      .populate('searches');

      console.log("perk user... " + perkUser);

      const perks = await Perk.find({'users': perkUser})
      .populate('users')
      .populate('groups')
      .populate('content');

      return perks.map(perk => {
        return transformPerk(perk);
      });
      // {
      // ...perk._doc,
      // _id: perk._id,
      // name: perk.name,
      // description: perk.description,
      // type: perk.type,
      // subtype: perk.subtype,
      // data: perk.data,
      // users: perk.users,
      // groups: perk.groups,
      // content: perk.content,
      // tags: perk.tags
      // };
    } catch (err) {
      throw err;
    }
  },
  getPerkGroup: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const perkGroup = await Group.findById({_id:args.groupId})
      .populate('users')
      .populate('creator')
      .populate('content')
      .populate('perks');

      console.log("perk group... " + perkGroup);

      const perks = await Perk.find({'groups': perkGroup})
      .populate('users')
      .populate('groups')
      .populate('content');

      return perks.map(perk => {
        return transformPerk(perk);
      });
      // {
      // ...perk._doc,
      // _id: perk._id,
      // name: perk.name,
      // description: perk.description,
      // type: perk.type,
      // subtype: perk.subtype,
      // data: perk.data,
      // users: perk.users,
      // groups: perk.groups,
      // content: perk.content,
      // tags: perk.tags
      // };
    } catch (err) {
      throw err;
    }
  },
  getPerkContent: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const perkContent = await Content.findById({_id:args.contentId})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

      console.log("perk content... " + perkContent);

      const perks = await Perk.find({'content': perkContent})
      .populate('users')
      .populate('groups')
      .populate('content');

      return perks.map(perk => {
        return transformPerk(perk);
      });
      // {
      // ...perk._doc,
      // _id: perk._id,
      // name: perk.name,
      // description: perk.description,
      // type: perk.type,
      // subtype: perk.subtype,
      // data: perk.data,
      // users: perk.users,
      // groups: perk.groups,
      // content: perk.content,
      // tags: perk.tags
      // };
    } catch (err) {
      throw err;
    }
  },
  getPerkTag: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const perks = await Perk.find({tags: args.tag})
      .populate('users')
      .populate('groups')
      .populate('content');

      return perks.map(perk => {
        return transformPerk(perk);
      });
      // {
      // ...perk._doc,
      // _id: perk._id,
      // name: perk.name,
      // description: perk.description,
      // type: perk.type,
      // subtype: perk.subtype,
      // data: perk.data,
      // users: perk.users,
      // groups: perk.groups,
      // content: perk.content,
      // tags: perk.tags
      // };
    } catch (err) {
      throw err;
    }
  },
  updatePerk: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    // check if admin
    try {
      const perk = await Perk.findOneAndUpdate({_id:args.perkId},{
        name: args.perkInput.name,
        description: args.perkInput.description,
        type: args.perkInput.type,
        subtype: args.perkInput.subtype,
        data: args.perkInput.data,
        users: args.perkInput.users,
        groups: args.perkInput.groups,
        content: args.perkInput.content,
        tags: args.perkInput.tags
      },{new: true})
      .populate('users')
      .populate('groups')
      .populate('content');

        return {
          ...perk._doc,
          _id: perk.id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content,
          tags: perk.tags
        };
    } catch (err) {
      throw err;
    }
  },
  updatePerkSubtype: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const perk = await Perk.findOneAndUpdate({_id:args.perkId},{subtype:args.perkSubtypeInput},{new: true})
      .populate('users')
      .populate('groups')
      .populate('content');

        return {
          ...perk._doc,
          _id: perk.id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content,
          tags: perk.tags
        };
    } catch (err) {
      throw err;
    }
  },
  updatePerkUser: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const perkUser = await User.findById({_id:args.perkUserId})
      .populate('groups')
      .populate('friends')
      .populate('content')
      .populate('actions')
      .populate('perks')
      .populate('searches');

      console.log("perk user... " + perkUser);

      const perk= await Perk.findOneAndUpdate({_id:args.perkId},{$addToSet: {users:perkUser}},{new: true})
      .populate('users')
      .populate('groups')
      .populate('content');

        return {
          ...perk._doc,
          _id: perk.id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content,
          tags: perk.tags
        };
    } catch (err) {
      throw err;
    }
  },
  updatePerkData: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const perk = await Perk.findOneAndUpdate({_id:args.perkId},{$addToSet: {data:args.perkDataInput}},{new: true})
      .populate('users')
      .populate('groups')
      .populate('content');

        return {
          ...perk._doc,
          _id: perk.id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content,
          tags: perk.tags
        };
    } catch (err) {
      throw err;
    }
  },
  updatePerkContent: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const perkContent = await Content.findById({_id:args.contentId})
      .populate('creator')
      .populate('users')
      .populate('perks')
      .populate('actions')
      .populate('comments.user');

      console.log("perk content... " + perkContent);

      const perk = await Perk.findOneAndUpdate({_id:args.perkId},{$addToSet: {content:perkContent}},{new: true})
      .populate('users')
      .populate('groups')
      .populate('content');

        return {
          ...perk._doc,
          _id: perk.id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content,
          tags: perk.tags
        };
    } catch (err) {
      throw err;
    }
  },
  updatePerkGroup: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {

      const perkGroup = await Group.findById({_id:args.groupId})
      .populate('users')
      .populate('creator')
      .populate('content')
      .populate('perks');

      console.log("perk group... " + perkGroup);

      const perk = await Perk.findOneAndUpdate({_id:args.perkId},{$addToSet: {groups:perkGroup}},{new: true})
      .populate('users')
      .populate('groups')
      .populate('content');

        return {
          ...perk._doc,
          _id: perk.id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content,
          tags: perk.tags
        };
    } catch (err) {
      throw err;
    }
  },
  updatePerkTag: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const perk = await Perk.findOneAndUpdate({_id:args.perkId},{$addToSet: {tags:args.tags}},{new: true})
      .populate('users')
      .populate('groups')
      .populate('content');

        return {
          ...perk._doc,
          _id: perk.id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content,
          tags: perk.tags
        };
    } catch (err) {
      throw err;
    }
  },
  deletePerk: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const perk = await Perk.findByIdAndRemove(args.perkId)
      .populate('users')
      .populate('groups')
      .populate('content');

        return {
          ...perk._doc,
          _id: perk.id,
          name: perk.name,
          description: perk.description,
          type: perk.type,
          subtype: perk.subtype,
          data: perk.data,
          users: perk.users,
          groups: perk.groups,
          content: perk.content,
          tags: perk.tags
        };
    } catch (err) {
      throw err;
    }
  },
  createPerk: async (args,req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    isAuth();
    if (!pocketVariables.isAuth || pocketVariables.isAuth == false) {
      throw new Error('Unauthenticated!');
    }
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const existingPerk = await Perk.findOne({ name: args.perkInput.name });
      if (existingPerk) {
        throw new Error('perk name exists already.');
      }
      const perk = new Perk({
        name: args.perkInput.name,
        description: args.perkInput.description,
        type: args.perkInput.type,
        subtype: args.perkInput.subtype,
        data: args.perkInput.data,
        users: args.perkInput.users,
        groups: args.perkInput.groups,
        content: args.perkInput.content,
        tags: args.perkInput.tags
      });

      const result = await perk.save();

      return {
        ...result._doc,
        _id: result.id,
        name: result.name,
        description: result.description,
        type: result.type,
        subtype: result.subtype,
        data: result.data,
        users: result.users,
        groups: result.groups,
        content: result.content,
        tags: result.tags
      };
    } catch (err) {
      throw err;
    }
  },
};
