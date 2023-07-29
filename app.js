const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

const app = express();

app.get('/', (req, res) => {
  res.json({ succes: true });
});

app.listen(PORT, () => {
  console.log(`is running on port ${PORT}`);
});
