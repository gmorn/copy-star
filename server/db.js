const Pool = require('pg').Pool
const pool = new Pool({
	user: 'postgres',
	password: '1',
	host: 'localhost',
	port: 5432,
	database: 'copy_star'
})
pool
	.connect()
	.then((client) => {
		console.log('Connected to the database')
		client.release()
	})
	.catch((err) => {
		console.error('Error connecting to the database')
	})

module.exports = pool
