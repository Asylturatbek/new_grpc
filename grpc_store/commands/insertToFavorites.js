const client = require('./client.js')

client.AddToFavorites({userId: 2, productId: 3}, (err, response) =>{
	if(!err) {
		console.log(response)
	} else {
		console.error(err)
	}
})