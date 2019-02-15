var grpc = require('grpc');

var booksProto = grpc.load('books.proto');

var client = new booksProto.books.BookService('127.0.0.1:50051',
	grpc.credentials.createInsecure());

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == 'list')
	listBooks();
else if (command == 'insert')
	insertBook(process.argv[0], process.argv[1], process.argv[2]);
else if (command == 'get')
	getBook(process.argv[0]);
else if (command == 'delete')
	deleteBook(process.argv[0]);
else if (command == 'watch')
	watchBooks();

function printResponse(error, response) {
	if (error)
		console.log('Error: ', error);
	else
		console.log(response);
}

function listBooks() {
	// {} to represent an Empty request message object
	client.list({}, function(error, books) {
		printResponse(error, books);
	});
}

function insertBook(id, title, author) {
	var book = { id: parseInt(id), title: title, author: author };
	client.insert(book, function(error, empty) {
		printResponse(error, empty);
	});
}

function getBook(id) {
	client.get({ id: parseInt(id) }, function(error, book) {
		printResponse(error, book);
	});
}

function deleteBook(id) {
	var bookId = { id: parseInt(id) }
	client.delete(bookId, function(error, empty) {
		printResponse(error, empty);
	});
}

function watchBooks() {
	var call = client.watch({});
	// func callback will run on each book insert
	call.on('data', function(book) {
		console.log(book);
	});
}
