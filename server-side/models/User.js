const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

// UserSchema.pre('save', function (next) {
//   if (this.password) {
//       this.password = hashPassword(this.password)
//   }
//   next()
// })
UserSchema.pre("save", function (next) {
  // store reference
  const user = this;
  if (user.password === undefined) {
      return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) console.log(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) console.log(err);
          user.hashed_password = hash;
          next();
      });
  });
});

/**
* Methods
*/
// UserSchema.methods = {
//   comparePassword: function(candidatePassword, cb) {
//       bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//           if (err) return cb(err);
//           cb(null, isMatch);
//       });
//   }
// }

module.exports = User = mongoose.model('User', UserSchema);