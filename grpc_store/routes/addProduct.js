const {pool} = require('./../dbConfig.js')
const grpc = require('grpc')

module.exports = async function(call, callback) {
	try {
		const {name, categoryId} = call.request
		if(name && categoryId) {
			const {rows} = await pool.query(`INSERT INTO products (name, categoryid) VALUES ($1, $2) RETURNING id, name, categoryid`, [name, categoryId])
			callback(null, {success: true, error:{code:null, data: null}})
		} else {
			callback(null, {success:false, error:{code:grpc.status.INVALID_ARGUMENT, data:'argument is missing'}})
		}
	} catch(err) {
		callback(null, {success:false, error:{code:grpc.status.INTERNAL, data:'internal server error'}})
		console.error(err)
	}

	
}