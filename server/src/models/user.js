const mongoose = require('mongoose')
const Schema = mongoose.Schema

//User Schema Define
const UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  admin: {type: Boolean, default: false}
})

UserSchema.methods.comparePassword = function (password) {
  return password === this.password
}


//Export model
module.exports = mongoose.model('User', UserSchema);