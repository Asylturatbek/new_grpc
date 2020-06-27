const client = require('./client.js')

client.ListProductsByCategoryId({id:4}, (err, products) => {
	if(!err) {
		console.log('received response from server for listing products')
		console.log(products)
	} else {
		console.error(err)
	}
});