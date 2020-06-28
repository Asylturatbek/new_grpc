const {pool} = require('./../dbConfig.js')
const grpc = require('grpc')

module.exports = async function(call, callback){

	try {

		const {id} = call.request
		if(id) {
			const { rows } = await pool.query('SELECT * FROM products WHERE categoryid = $1',[id])
			callback(null, { 'products': rows })
		} else {
			callback(new Error("Argument is missing"));
		}

	} catch (err) {
		callback(new Error("Internal server error"));
		console.error(err)
	}
}