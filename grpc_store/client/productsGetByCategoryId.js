const client = require('./client.js')
const grpc = require('grpc')

const givenId = process.argv[2]

client.ListProductsByCategoryId({id:givenId}, (err, products) => {
	if(!err) {
		console.log('received response from server for listing products')
		console.log(products)
	} else {
		console.error({code: err.code, metadata: err.metadata, details: err.details})
	}
});