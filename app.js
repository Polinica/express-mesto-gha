const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes');

const { PORT = 3000 } = process.env;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb';

const app = express();

// подключаемся к серверу mongo
mongoose.connect(DATABASE_URL)
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
    _id: '64c556019c7f3a4a7dba23ab',
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`is running on port ${PORT}`);
});
