const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config/config')

//User Schema Define
const PostSchema = new Schema({
  postId: {type: String, required: true},
  postUrl: {type: String, required: true},
  email: {type: String, required: true},
  username: {type: String, required: true},
  title: {type: String, required: true},
  content: {type: String, required: true},
  category: {type: String, required: true},
  createddate: {type: Date, required: true},
  editeddate: {type: Date}
})

//Export model
module.exports = mongoose.model('Post', PostSchema);