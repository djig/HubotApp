import { DBUtil } from "./DBUtil";
import { couchDB, dbName, getAllDocuments } from "./couchDB"
let nextId = 0,
    samples= [];

const dbUtil =  new DBUtil();

export const resolvers = {
  Query: {
    users: async (root, args) => {
          return await dbUtil.getUsers(args);
        },

    comments: async (root, args) => {
          return await getAllDocuments();     
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
  },
};