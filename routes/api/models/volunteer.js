const mongoose = require("mongoose")
const Schema = mongoose.Schema
const volunteerSchema = new Schema({
    isCheckedByAdmin: {type: Boolean, required: true},
    campus: {type: String},
    'volunteer ids paired with': {type: [String]},
    lastModfied: {type: Date, required: true},
    'first name': {type: String, required: true},
    'last name': {type: String, required: true},
    'street address': {type: String, required: true},
    'zip': {type: String, required: true},
    'birth date': {type: String, required: true},
    'gender': {type: String, required: true},
    'phone': {type: String, required: true},
    'email': {type: String, required: true},
    'preferred point of contact': {type: String, required: true},
    'best time to contact': {type: String, required: true},
    'financial occupation':{type:String,required:true},
    'employer':{type:String},
    'relationship status': {type: String, required: true},
    'reference first name': {type: String},
    'reference last name': {type: String},
    'reference street address': {type: String, required: true},
    'reference zip': {type: String, required: true},
    'reference phone': {type: String,required:true},
    'reference email': {type: String,required:true},
    'reference relationship to volunteer': {type: String,required:true},
    'been a christian': {type: String, required: true},
    'rock attendance': {type: String, required: true},
    'rock campus': {type: String, required: true},
    'serving interests':{type:[String],required: true},
    'spiritual gifts test': {type: String, required: true},
    'consider leader': {type: String, required: true},
    'commit to 6 months of service': {type: String, required: true},
    'past volunteer experience': {type: String, required: true},
    'convicted of a felony': {type: String, required: true},
    // 'days available': {type: [String], required: true},
    'testimony of being saved':{type:String,required: true},
    'testimony of cancer':{type:String,required: true},
    'why volunteer question':{type:String,required: true},
    'most difficult for volunteering question':{type:String,required: true},
    'describe a difficult situation question':{type:String,required: true},
    'healthy boundaries question': {type: String, required: true},
})

const singularCollectionName = 'Volunteer'
const Patient = mongoose.model(singularCollectionName, volunteerSchema);

module.exports = Patient