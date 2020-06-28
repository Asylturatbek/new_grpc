const {pool} = require('./../dbConfig.js')
const grpc = require('grpc')
const verifySession = require('./../middlewares/verify.js')

module.exports = async function (call, callback) {

	try{
		const result = await verifySession(call)

		if(result.success){

			const {id} = call.request
			if( id) {
				const { rows } = await pool.query('SELECT * FROM favorites WHERE userid = $1',[id])
				callback(null, { "favorites": rows})			
			} else {
				callback(new Error("Argument is missing"));
			}

		} else {
			callback(new Error(result.data));
		}
		
	} catch (err) {
		callback(new Error("Internal server error"));
		console.error(err)
	}
}