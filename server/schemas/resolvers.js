const { AuthenticationError } = require("apollo-server-express");
const { RockshoxForkOilBath, FoxForkOilBath, MarzocchiForkOilBath } = require("../models");

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
    allFoxForkOilBathInfo: async () => {
      const allFoxForkOilBathInfo = await FoxForkOilBath.find({});
      console.log(allFoxForkOilBathInfo);
      if (!allFoxForkOilBathInfo) {
        throw new Error("something went wrong querying all fox fork oil bath information");
      }

      return allFoxForkOilBathInfo;
    },
    allMarzocchiForkOilBathInfo: async () => {
      const allMarzocchiForkOilBathInfo = await MarzocchiForkOilBath.find({});
      console.log(allMarzocchiForkOilBathInfo);
      if (!allMarzocchiForkOilBathInfo) {
        throw new Error("Something went wrong querying all marzocchi fork oil bath information");
      }

      return allMarzocchiForkOilBathInfo;
    },
  },
};

module.exports = resolvers;
