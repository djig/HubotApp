import { DBUtil } from "./DBUtil";
import { getAllDocuments, insertDocument } from "./couchDB"
let nextId = 0,
    samples= [];

const dbUtil =  new DBUtil();

export const resolvers = {
  Query: {
    users: async (root, args) => {
          return await dbUtil.getUsers(args);
        },
    comments: async (root, args) => {
      console.log(args);
          return await getAllDocuments(args);
    },
  },
  User: {
        Orgnization: async ({id}) => {
          return  await dbUtil.getOrgs({id});
        }
      },
  Mutation: {
    addSample: (root, args) => {
      const newSample = { id: nextId++, name: args.name };
      samples.push(newSample);
      return newSample;
    },
    addComment: async (root, args) => {
      return await insertDocument(args.input);
    },
    updateComment: async (root, args) => {
      console.log(args.input);
      return await insertDocument(args.input);
    },

  },
};