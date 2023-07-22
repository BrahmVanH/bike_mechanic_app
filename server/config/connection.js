const mongoose = require('mongoose');

// ADD DATABASE NAME AFTER '/' ON LINE 6

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/'
);

module.exports = mongoose.connection;
