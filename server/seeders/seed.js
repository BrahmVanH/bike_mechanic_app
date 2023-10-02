const db = require("../config/connection");
const { RockshoxForkOilBath, FoxForkOilBath, MarzocchiForkOilBath } = require("../models");
const rockshoxForkOilBathSeeds = require("./webScraperData/forkOilBathVolumesRockshox.json");
const foxForkOilBathSeeds = require("./webScraperData/forkOilBathVolumesFox.json");
const marzocchiForkOilBathSeeds = require("./webScraperData/forkOilBathVolumesMarzocchi.json");

db.once('open', async () => {
  try {
    // await db; // Wait for MongoDB connection to establish

    await RockshoxForkOilBath.deleteMany({});
    await FoxForkOilBath.deleteMany({});
    await MarzocchiForkOilBath.deleteMany({});

    // await new Promise((resolve) => setTimeout(resolve, 10000));

    await RockshoxForkOilBath.create(rockshoxForkOilBathSeeds);
    await FoxForkOilBath.create(foxForkOilBathSeeds);
    await MarzocchiForkOilBath.create(marzocchiForkOilBathSeeds);

    console.log("done seeding");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

