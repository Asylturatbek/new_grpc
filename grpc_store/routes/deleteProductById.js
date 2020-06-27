const {pool} = require('./../dbConfig.js')
const grpc = require('grpc')

module.exports = async function(call, callback) {
	try {
		const {id} = call.request
		const {rows} = await pool.query(`DELETE FROM products WHERE id = $1`,[id])
		callback(null, {success: true, error:{code:null, data: null}})
	} catch(err) {
		callback(null, {success:false, error:{code:grpc.status.INTERNAL, data:'internal server error'}})
		console.error(err)
	}
}