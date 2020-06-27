const PROTO_PATH = __dirname + '/store.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {})

const packageObject = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

const listCategories = require('./routes/listCategories.js')
const listProducts = require('./routes/listProducts.js')
const listProductsByCategoryId = require('./routes/listProductsByCategoryId.js')
const listFavoritesByUserId = require('./routes/listFavoritesByUserId.js')
const addToFavorites = require('./routes/addToFavorites.js')
const addProduct = require('./routes/addProduct.js')
const deleteProductById = require('./routes/deleteProductById.js')

server.addService(packageObject.StoreService.service, {
	'ListCategories': listCategories,
	'ListProducts': listProducts,
	'ListProductsByCategoryId': listProductsByCategoryId,
	'ListFavoritesByUserId': listFavoritesByUserId,
	'AddToFavorites': addToFavorites,
	'AddProduct': addProduct,
	'DeleteProductById': deleteProductById
})

server.bind('127.0.0.1:40041',
	grpc.ServerCredentials.createInsecure())

console.log('server running at hhtp://127.0.0.1:40041')
server.start()