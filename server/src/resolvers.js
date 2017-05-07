import { DBUtil } from './DBUtil';
let nextId = 0,
    samples= [];

const dbUtil =  new DBUtil();

export const resolvers = {
  Query: {
    users: async (root, args) => {
          return await dbUtil.getUsers(args);
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