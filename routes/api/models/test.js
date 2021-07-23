const mongoose = require("mongoose")
const Schema = mongoose.Schema

const testSchema = new Schema({
  info:{
    name:{
        first: { type: String, required: true },
        last: { type: String, required: true }, 
    },
  },
isCheckedByAdmin:{ type: Boolean, required: true}

// },
});
const singularCollectionName = 'Test'
const Test = mongoose.model(singularCollectionName, testSchema);

module.exports = Test
