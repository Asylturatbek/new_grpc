const {pool} = require('./../dbConfig.js')
const grpc = require('grpc')


module.exports = async function(call, callback){
	try {
		const { rows } = await pool.query('SELECT * FROM products')
		callback(null, { 'products': rows })
	} catch (err) {
		callback(null, {success:false, error:{code:grpc.status.INTERNAL, data:'internal server error'}})
		console.error(err)
	}
}