var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

Genre = require('./models/genres');
Book = require('./models/book');

//connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/',function(req, res){
	res.send('Please use /api/books or /api/genres');
});

app.get('/api/genres', function(req, res){
	Genre.getGenres(function(err, genres){
		if(err)
			throw err;
		res.json(genres);
	});
});

app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if(err)
			throw err;
		res.json(books);
	});
});

app.get('/api/books/:_id', function(req, res){
	Book.getBookById(req.params._id ,function(err, book){
		if(err)
			throw err;
		res.json(book);
	});
});

app.post('/api/genres/', function(req, res){
	var genre = req.body;
	Genre.addGenre(genre, function(err, genre){
		if(err)
			throw err;
		res.json(genre);
	});
});

app.put('/api/genres/:_id', function(req, res){
	var genre = req.body;
	var id = req.params._id
	Genre.updateGenre(id, genre, {}, function(err, genre){
		if(err)
			throw err;
		res.json(genre);
	});
});

app.delete('/api/genres/:_id', function(req, res){
	var id = req.params._id
	Genre.removeGenre(id, function(err, genre){
		if(err)
			throw err;
		res.json(genre);
	});
});

app.post('/api/books/', function(req, res){
	var book = req.body;
	Book.addBook(book, function(err, book){
		if(err)
			throw err;
		res.json(book);
	});
});

app.put('/api/books/:_id', function(req, res){
	var book = req.body;
	var id = req.params._id
	Book.updateBook(id, book, {}, function(err, book){
		if(err)
			throw err;
		res.json(book);
	});
});



app.delete('/api/books/:_id', function(req, res){
	var id = req.params._id
	Book.removeBook(id, function(err, book){
		if(err)
			throw err;
		res.json(book);
	});
});


app.listen(3000);
console.log('Server running on port 3000');  