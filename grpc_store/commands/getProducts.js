const client = require('./client.js')

client.ListProducts({}, (err, products) => {
	if(!err) {
		console.log('received response from server for listing products')
		console.log(products)
	} else {
		console.error(err)
	}
})