const db = require("../config/connection");
const RockshoxForkOilBath = require("../models/RockshoxForkOilBath");
const rockshoxForkOilBathSeeds = require("./webScraperData/forkOilBathVolumesRockshox.json");


(async () => {
	try {
		await db; // Wait for MongoDB connection to establish

		await RockshoxForkOilBath.deleteMany({});

		await RockshoxForkOilBath.create(rockshoxForkOilBathSeeds);

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
