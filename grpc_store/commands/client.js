const grpc = require('grpc')

const protoLoader = require('@grpc/proto-loader');
var PROTO_PATH = __dirname + '/../store.proto';
console.log(PROTO_PATH)

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const packageObject = grpc.loadPackageDefinition(packageDefinition)

const StoreService = packageObject.StoreService

const client = new StoreService('localhost:40041',
	grpc.credentials.createInsecure())



module.exports = client