import { getUsers, getOrgs } from "./mySqlDb";
import { insertDocument } from "./couchDB";
import { getComments } from './couchbaseDB';
let nextId = 0,
    samples= [];
/* eslint-disable no-console */
export const resolvers = {
  Query: {
    users: async (root, args) => {
          return await getUsers(args);
        },
    comments: async (root, args) => {
          return await getComments(args);
          //return await getAllDocuments(args);
    },
  },
  User: {
        Orgnization: async ({id}) => {
          return  await getOrgs({id});
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
      return await insertDocument(args.input);
    },

  },
};