const { AuthenticationError } = require("apollo-server-express");
const { RockshoxForkOilBath, FoxForkOilBath, MarzocchiForkOilBath } = require("../models");

const resolvers = {
  Query: {
    allRockshoxForkOilBathInfo: async () => {
      console.log("querying all rockshox fork oil bath info in resolvers...");
      const forks = await RockshoxForkOilBath.find({});
      if (!forks) {
        throw new Error("Something went wrong in querying all rockshox fork oil bath information");
      }
      console.log(forks);
      return forks;
    },
    rockshoxForkOilBathInfoByYear: async (parent, { year }) => {
      console.log("querying rockshox fork oil bath info by year in resolvers");
      const forks = await RockshoxForkOilBath.find({ year: year });
      if (!forks) {
        throw new Error("Something went wrong querying rockshox forks by year");
      }
      return forks;
    },
    allFoxForkOilBathInfo: async () => {
      const forks = await FoxForkOilBath.find({});
      console.log("querying fox fork oil bath info in resolvers");

      console.log(forks);
      if (!forks) {
        throw new Error("something went wrong querying all fox fork oil bath information");
      }

      return forks;
    },
    foxForkOilBathInfoByYear: async (parent, { year }) => {
      console.log("querying fox fork oil bath info by year in resolvers");

      const forks = await FoxForkOilBath.find({ year: year });
      if (!forks) {
        throw new Error("Something went wrong querying fox forks by year");
      }
      return forks;
    },
    allMarzocchiForkOilBathInfo: async () => {
      const forks = await MarzocchiForkOilBath.find({});
      console.log(forks);
      if (!forks) {
        throw new Error("Something went wrong querying all marzocchi fork oil bath information");
      }

      return forks;
    },
  },
};

module.exports = resolvers;
