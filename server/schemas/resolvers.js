const { AuthenticationError } = require("apollo-server-express");
const { RockshoxForkOilBath } = require("../models");

const resolvers = {
  Query: {
    allRockshoxForkOilBathInfo: async () => {
      const allRockshoxForkOilBathInfo = await RockshoxForkOilBath.find({});
      console.log(allRockshoxForkOilBathInfo);
      if (!allRockshoxForkOilBathInfo) {
        throw new Error("Something went wrong in querying all rockshox fork oil bath information");
      }

      return allRockshoxForkOilBathInfo;
    },
  },
  Mutation: {},
};

module.exports = resolvers;
