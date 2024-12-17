
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Atlas connection string
const mongoURI = 'YOUR_MONGODB_ATLAS_URL';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Book Schema
const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    status: { type: String, default: 'Unread' }
});
const Book = mongoose.model('Book', BookSchema);

// CRUD Endpoints
// Add Book
app.post('/api/books', async (req, res) => {
    const { title, author, status } = req.body;
    const book = new Book({ title, author, status });
    await book.save();
    res.status(201).json(book);
});

// View Books
app.get('/api/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// Update Book Status
app.put('/api/books/:id', async (req, res) => {
    const { status } = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(book);
});

// Delete Book
app.delete('/api/books/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
