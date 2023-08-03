const { Schema, model } = require("mongoose");

const rockshoxForkOilBathSchema = new Schema(
  {
    year: {
      type: String,
    },
    fork: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    damperType: {
      type: String,
    },
    springType: {
      type: String,
    },
    wheelSize: {
      type: String,
    },
    damperUpperVolume: {
      type: String,
    },
    damperUpperOilWt: {
      type: String,
    },
    damperLowerVolume: {
      type: String,
    },
    damperLowerOilWt: {
      type: String,
    },
    springUpperVolume: {
      type: String,
    },
    springUpperOilWt: {
      type: String,
    },
    springLowerVolume: {
      type: String,
    },
    springLowerWt: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const RockshoxForkOilBath = model("rockshoxForkOilBath", rockshoxForkOilBathSchema);

module.exports = RockshoxForkOilBath;
