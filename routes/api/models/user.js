const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {type: String, required: true },
  password: { type: String, required: true }, 
  authorization:{type: String, required: true },
  change_permissions:{type:Boolean, required: true },
  areas_assigned:{type:[String]},
});
const singularCollectionName = 'User'
const Test = mongoose.model(singularCollectionName, userSchema);

module.exports = Test
