var grpc = require('grpc');

var booksProto = grpc.load('books.proto');

// In-memory array of book objects
var books = [
    { id: 123, title: 'A Tale of Two Cities', author: 'Charles Dickens' }
];

var server = new grpc.Server();

// Request handlers
server.addService(booksProto.books.BookService.service, {
	list: function(call, callback) {
		callback(null, books);
	},
	insert: function(call, callback) {
		books.push(call.request);
		callback(null, {});
	}
});

server.bind('0.0.0.0:50051',
	grpc.ServerCredentials.createInsecure());
server.start();
