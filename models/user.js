const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
<<<<<<< HEAD
  {
    versionKey: false,
  },
=======
  // {
  //   versionKey: false,
  // },
>>>>>>> 870b963475af812cc63208462f354fd33feb46ce
);

const User = mongoose.model('user', userSchema);

module.exports = { User };
