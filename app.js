const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    connection.query('SELECT * FROM books', (err, results) => {
        if (err) throw err;
        res.render('index', { books: results });
    });
});

app.get('/add-book', (req, res) => {
    res.render('add-book');
});

app.post('/add-book', (req, res) => {
    const { name, publisher, quantity } = req.body;
    connection.query('INSERT INTO books (name, publisher, quantity) VALUES (?, ?, ?)', [name, publisher, quantity], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.get('/edit-book/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.render('edit-book', { book: results[0] });
    });
});

app.post('/edit-book/:id', (req, res) => {
    const { id } = req.params;
    const { name, publisher, quantity } = req.body;
    connection.query('UPDATE books SET name = ?, publisher = ?, quantity = ? WHERE id = ?', [name, publisher, quantity, id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.get('/delete-book/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM books WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
