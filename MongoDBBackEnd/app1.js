// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());

const conectString = 'mongodb+srv://salonijuneja93:Abc1234@saloni09.6xpr2.mongodb.net/?retryWrites=true&w=majority&appName=Saloni09'

// MongoDB connection
mongoose.connect(conectString, { })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
