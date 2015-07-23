module.exports = {
	PORT: process.env.PORT || '3000',
	MONGO_URI: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/users',
	SESSION_SECRET: process.env.SESSION_SECRET || 'GreenSecret'
}
