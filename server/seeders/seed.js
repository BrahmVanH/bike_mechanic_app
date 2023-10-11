const db = require("../config/connection");
const { RockshoxForkOilBath, FoxForkOilBath, ErrorLogMessage } = require("../models");
const rockshoxForkOilBathSeeds = require("./forkOilBathVolumesRockshox.json")
const foxForkOilBathSeeds = require("./forkOilBathVolumesFox.json");
const errorLogTestSeeds = require("./errorLogTest.json");

db.once('open', async () => {
  try {

    await RockshoxForkOilBath.deleteMany({});
    await FoxForkOilBath.deleteMany({});
  


    await RockshoxForkOilBath.create(rockshoxForkOilBathSeeds);
    await FoxForkOilBath.create(foxForkOilBathSeeds);
    await ErrorLogMessage.create(errorLogTestSeeds);

    console.log("done seeding");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

