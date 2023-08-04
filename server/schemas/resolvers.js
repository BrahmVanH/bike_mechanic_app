const { AuthenticationError } = require("apollo-server-express");
const { RockshoxForkOilBath, FoxForkOilBath, MarzocchiForkOilBath } = require("../models");

const resolvers = {
  Query: {
    allRockshoxForkOilBathInfo: async () => {
      const forks = await RockshoxForkOilBath.find({});
      console.log(allRockshoxForkOilBathInfo);
      if (!allRockshoxForkOilBathInfo) {
        throw new Error("Something went wrong in querying all rockshox fork oil bath information");
      }

      return forks;
    },
    rockshoxForkOilBathInfoByYear: async (parent, { year }) => {
      const forks = await RockshoxForkOilBath.find({ year: year });
      if (!forks) {
        throw new Error("Something went wrong querying rockshox forks by year");
      }
      return forks;
    },
    allFoxForkOilBathInfo: async () => {
      const forks = await FoxForkOilBath.find({});
      console.log(allFoxForkOilBathInfo);
      if (!allFoxForkOilBathInfo) {
        throw new Error("something went wrong querying all fox fork oil bath information");
      }

      return forks;
    },
    rockshoxForkOilBathInfoByYear: async (parent, { year }) => {
      const forks = await FoxForkOilBath.find({ year: year });
      if (!forks) {
        throw new Error("Something went wrong querying fox forks by year");
      }
      return forks;
    },
    allMarzocchiForkOilBathInfo: async () => {
      const forks = await MarzocchiForkOilBath.find({});
      console.log(allMarzocchiForkOilBathInfo);
      if (!allMarzocchiForkOilBathInfo) {
        throw new Error("Something went wrong querying all marzocchi fork oil bath information");
      }

      return forks;
    },
  },
};

module.exports = resolvers;
