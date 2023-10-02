const { AuthenticationError } = require("apollo-server-express");
const { RockshoxForkOilBath, FoxForkOilBath, MarzocchiForkOilBath } = require("../models");

const resolvers = {
  Query: {
    allRockshoxForkOilBathInfo: async () => {
      try {
        const forks = await RockshoxForkOilBath.find({});
        if (!forks) {
          throw new Error("Cannot find all rockshox products");
        }
        return forks;
      } catch (err) {
        return [{ message: "Error in allRockshoxForkOilBathInfo...", details: err.message }];
      }
    },
    rockshoxProductsByYear: async (parent, { year }) => {
      try {
        const forks = await RockshoxForkOilBath.find({ year: year });
        if (!forks) {
          throw new Error("Cannot find rockshox fork products by year");
        }
        return forks;
      } catch (err) {
        return [{ message: "Something went wrong in rockshoxProductsByYear", details: err.message }];
      }
    },
    allFoxForkOilBathInfo: async () => {
      try {
        const forks = await FoxForkOilBath.find({});
        if (!forks) {
          throw new Error("Cannot find all fox fork products");
        }

        return forks;
      } catch (err) {
        return [{ message: "Something went wrong in allFoxForkOilBathInfo", details: err.message }];
      }
    },
    foxProductsByYear: async (parent, { year }) => {
      try {
        const forks = await FoxForkOilBath.find({ year: year });
        if (!forks) {
          throw new Error("Cannot find fox fork products by year");
        }
        return forks;
      } catch (err) {
        return [{ message: "Something went wrong in foxProductsByYear", details: err.message }];
      }
    },
    allMarzocchiForkOilBathInfo: async () => {
      try {
        const forks = await MarzocchiForkOilBath.find({});
        if (!forks) {
          throw new Error("Cannot find all marzocchi forks");
        }

        return forks;
      } catch (err) {
        return [{ message: "Something went wrong in allMarzocchiForkOilBathInfo", details: err.message }];
      }
    },
  },
};

module.exports = resolvers;
