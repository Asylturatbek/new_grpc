const client = require('./client.js')
const grpc = require('grpc')

client.ListProducts({}, (err, products) => {
	if(!err) {
		console.log('received response from server for listing products')
		console.log(products)
	} else {
		onsole.error({code: err.code, metadata: err.metadata, details: err.details})
	}
})