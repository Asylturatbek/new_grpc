const client = require('./client.js')

client.listCategories({}, (err, categories) => {
	if(!err) {
		console.log('received response from server for listing categories')
		console.log(categories)
	} else {
		console.error(err)
	}
})