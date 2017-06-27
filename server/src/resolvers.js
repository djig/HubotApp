import { getUsers, getOrgs } from "./mySqlDb";
import { insertDocument } from "./couchDB";
import { getComments, upsertComment } from './couchbaseDB';
let nextId = 0,
    samples= [];
/* eslint-disable no-console */
export const resolvers = {
  Query: {
    users: (root, args) => {
          return getUsers(args);
        },
    comments: async (root, args) => {
          return await getComments(args);
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
      return await upsertComment(args.input);
    },
    updateComment: async (root, args) => {
      return await upsertComment(args.input);
    },

  },
};