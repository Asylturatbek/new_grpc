const {pool} = require('./../dbConfig.js')
const grpc = require('grpc')


module.exports = async function(call, callback){
	try {
		console.log(call)
		const { rows } = await pool.query('SELECT * FROM products')
		callback(null, { 'products': rows })
	} catch (err) {
		ccallback(new Error("Internal server error"));
		console.error(err)
	}
}