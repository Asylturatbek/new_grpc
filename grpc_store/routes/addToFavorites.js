const {pool} = require('./../dbConfig.js')
const grpc = require('grpc')

module.exports = async function(call, callback){

	try {
		const {userId, productId} = call.request
		if(userId && productId){
			const {rows} = await pool.query(`INSERT INTO favorites (userid, productid) VALUES ($1, $2) RETURNING userid, productid`, [userId, productId])
			callback(null, {success: true, error:{code:null, data: null}})	
		} else {
			callback(null, {success:false, error:{code:grpc.status.INVALID_ARGUMENT, data:'argument is missing'}})
		}
	} catch(err) {
		callback(null, {success:false, error:{code:grpc.status.INTERNAL, data:'internal server error'}})
		console.error(err)
	}
}