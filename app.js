const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes');

const { PORT = 3000 } = process.env;
const DATABASE_URL = 'mongodb://localhost:27017/mestodb';

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

// временное решение авторизации пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '1234567890',
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`is running on port ${PORT}`);
});
