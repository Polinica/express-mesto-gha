const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes');

const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    console.log('Database connected.');
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

const app = express();

app.get('/', (req, res) => {
  res.json({ succes: true });
});

app.listen(PORT, () => {
  console.log(`is running on port ${PORT}`);
});
