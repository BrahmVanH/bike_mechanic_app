const db = require("../config/connection");
const { RockshoxForkOilBath, FoxForkOilBath } = require("../models");
const rockshoxForkOilBathSeeds = require("./forkOilBathVolumesRockshox.json")
const foxForkOilBathSeeds = require("./forkOilBathVolumesFox.json");

db.once('open', async () => {
  try {

    await RockshoxForkOilBath.deleteMany({});
    await FoxForkOilBath.deleteMany({});


    await RockshoxForkOilBath.create(rockshoxForkOilBathSeeds);
    await FoxForkOilBath.create(foxForkOilBathSeeds);

    console.log("done seeding");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

