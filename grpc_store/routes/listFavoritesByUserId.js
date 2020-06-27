const {pool} = require('./../dbConfig.js')
const grpc = require('grpc')

module.exports = async function (call, callback) {
	try{
		const {id} = call.request
		const { rows } = await pool.query('SELECT * FROM favorites WHERE userid = $1',[id])
		callback(null, { "favorites": rows})		
	} catch (err) {
		callback(null, {success:false, error:{code:grpc.status.INTERNAL, data:'internal server error'}})
		console.error(err)
	}
}