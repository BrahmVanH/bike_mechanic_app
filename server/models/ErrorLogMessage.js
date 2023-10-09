const { Schema, model } = require("mongoose");

const errorLogMessageSchema = new Schema({
  message: {
    type: String,
  },
  level: {
    type: String,
  },
  stacktrace: {
    type: String,
  },
  info: {
    type: String,
  },
});

const ErrorLogMessage = model("ErrorLogMessage", errorLogMessageSchema);

module.exports = ErrorLogMessage;
