const client = require('./client.js')

client.ListFavoritesByUserId({id:1}, (err, favorites) => {
	if(!err) {
		console.log('received favorites')
		console.log(favorites)
	} else {
		console.error(err)
	}
})