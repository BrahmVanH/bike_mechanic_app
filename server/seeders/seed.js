const db = require("../config/connection");
const { RockshoxForkOilBath, FoxForkOilBath, MarzocchiForkOilBath } = require("../models");
const rockshoxForkOilBathSeeds = require("./webScraperData/forkOilBathVolumesRockshox.json");
const foxForkOilBathSeeds = require("./webScraperData/forkOilBathVolumesFox.json");
const marzocchiForkOilBathSeeds = require("./webScraperData/forkOilBathVolumesMarzocchi.json");

(async () => {
  try {
    await db; // Wait for MongoDB connection to establish

    await RockshoxForkOilBath.deleteMany({});
    await FoxForkOilBath.deleteMany({});
    await MarzocchiForkOilBath.deleteMany({});


    await RockshoxForkOilBath.create(rockshoxForkOilBathSeeds);
    await FoxForkOilBath.create(foxForkOilBathSeeds);
    await MarzocchiForkOilBath.create(marzocchiForkOilBathSeeds);

    console.log("done seeding");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
// db.once("open", () => {
//   try {
//     // Clear database of any entries of this model
//     RockshoxForkOilBath.deleteMany({}, async () => {
// 			try {
// 				// Create database entries from provided seed data
// 				await RockshoxForkOilBath.create(rockshoxForkOilBathSeeds);
// 				console.log("done seeding");
// 			} catch (err) {
// 				console.error(err);
// 			} finally {
// 				process.exit(0);
// 			}
// 		});

//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }

// });
