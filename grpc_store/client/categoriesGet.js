const client = require('./client.js')

client.listCategories({}, (err, categories) => {
	if(!err) {
		console.log('received response from server for listing categories')
		console.log(categories)
	} else {
		onsole.error({code: err.code, metadata: err.metadata, details: err.details})
	}
})