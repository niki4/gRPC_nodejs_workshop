var grpc = require('grpc');

var booksProto = grpc.load('books.proto');

var client = new booksProto.books.BookService('127.0.0.1:50051',
	grpc.credentials.createInsecure());

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
	client.delete(bookId, function(error, epmty) {
		printResponse(error, empty);
	});
}
