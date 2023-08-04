const { Schema, model } = require("mongoose");

const foxForkOilBathSchema = new Schema(
  {
    year: {
      type: String,
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
    springLowerOilWt: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const FoxForkOilBath = model("FoxForkOilBath", foxForkOilBathSchema);

module.exports = FoxForkOilBath;
