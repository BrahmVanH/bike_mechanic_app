const db = require('../config/connection');
const {} = require('../models');

db.once('open', async () => {
	try {
		// Add code to delete existing model entries in database
		
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	console.log('done seeding flashcard');
	process.exit(0);
});
