const { AuthenticationError } = require("apollo-server-express");
const { RockshoxForkOilBath, FoxForkOilBath, MarzocchiForkOilBath, ErrorLogMessage } = require("../models");

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
    queryErrorLog: async () => {
      try {
        const errorLogs = await ErrorLogMessage.find({});
        if (!errorLogs) {
          throw new Error("Cannot find all errorLogs");
        }
        return errorLogs;
      } catch (err) {
        return [{ message: "Something went wrong in queryErrorLog", details: err.message }];
      }
    },
  },
  Mutation: {
    logError: async (parent, {message, level, stacktrace, info}) => {
      try {
        if (!message || !level || !stacktrace || !info) {
          console.log("missing a property for error message")
        }
        const errorLogMessage = await ErrorLogMessage.create({message: message, level: level, stacktrace: stacktrace, info: info});

        if (!errorLogMessage) {
          console.log("Could not post error log message");
        }
        return errorLogMessage
      } catch (err) {
        return [{message: "Something went wrong logging an Error", }]
      }
    }
  }
};

module.exports = resolvers;
