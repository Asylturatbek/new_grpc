const {pool} = require('./../dbConfig.js')
const grpc = require('grpc')

module.exports = async function(call, callback){
	try{
		const state = `SELECT id, name, 
			(SELECT COUNT(*) 
			FROM products 
			WHERE categories.id = products.categoryid) AS productsCount 
			FROM categories`
		const { rows } = await pool.query(state)
		callback(null, { 'categories': rows })
		
	} catch(err) {
		callback(new Error("Internal server error"));
		console.error(err)
	}
}