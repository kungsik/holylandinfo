const mongoose = require('mongoose')
const Schema = mongoose.Schema

//User Schema Define
const UserSchema = new Schema({
  name: {type: String, required: true, max: 100},
  password: {type: String, required: true, max: 100},
  email: {type: String, required: true, max: 100, unique: true},
  admin: {type: Boolean, default: false}
})

//공통된 작업, 즉 회원가입이나 조회 등은 statics로, 개별적인 작업 비밀번호 비교나
//admin 부여 등은 methods로 한다.

//create new User
UserSchema.statics.create = (name, password, email) => {
  const user = new this({
    email,
    username,
    password
  })
  return user.save()
}

//find one user by email
UserSchema.statics.findONeByEmail = (email) => {
  return this.findOne({
    email
  }).exec()
}

//verify the password of user
UserSchema.methods.verify = (password) => {
  return this.password === password
}

//assign admin
UserSchema.methods.assignAdmin = () => {
  this.admin = true
  return this.save()
}

//Export model
module.exports = mongoose.model('User', UserSchema);