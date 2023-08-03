const { Schema, model } = require("mongoose");

const marzocchiForkOilBathSchema = new Schema(
  {
    year: {
      type: String,
    },
    forkModelAndOilType: {
      type: String,
      required: true,
    },
    measurement: {
      type: String,
    },
    locationOne: {
      type: String,
    },
    volumeOne: {
      type: String,
    },
    locationTwo: {
      type: String,
    },
    volumeTwo: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const MarzocchiForkOilBath = model("MarzocchiForkOilBath", marzocchiForkOilBathSchema);

module.exports = MarzocchiForkOilBath;
