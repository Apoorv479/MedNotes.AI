require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const notesRoutes = require('./routes/notes'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/notes', notesRoutes); 

app.get('/', (req, res) => {
  res.send('Server is Running! 🚀');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
