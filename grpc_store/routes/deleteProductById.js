const {pool} = require('./../dbConfig.js')
const grpc = require('grpc')
const verifySession = require('./../middlewares/verify.js')

module.exports = async function(call, callback) {

	try {
		const result = await verifySession(call)

		if(result.success){

			const {id} = call.request
			if(id) {
				const {rows} = await pool.query(`DELETE FROM products WHERE id = $1`,[id])
				callback(null, {success: true, error:{code:null, data: null}})
			} else {
				callback(null, {success:false, error:{code:grpc.status.INVALID_ARGUMENT, data:'argument is missing'}})
			}

		} else {
			callback(new Error(result.data));
		}

	} catch(err) {
		callback(new Error("Internal server error"));
		console.error(err)
	}
}