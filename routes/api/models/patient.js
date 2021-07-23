const mongoose = require("mongoose")
const Schema = mongoose.Schema
const patientSchema = new Schema({
    isCheckedByAdmin: {type: Boolean, required: true},
    lastModfied: {type: Date, required: true},
    'first name': {type: String, required: true},
    'last name': {type: String, required: true},
    'street address': {type: String, required: true},
    'zip': {type: String, required: true},
    'birth date': {type: Date, required: true},
    'gender': {type: String, required: true},
    'phone': {type: String, required: true},
    'email': {type: String, required: true},
    'leave a message': {type: String, required: true},
    'relationship status': {type: String, required: true},
    'filled out by': {type: String, required: true},
    'filler first name': {type: String},
    'filler last name': {type: String},
    'filler phone': {type: String},
    'filler email': {type: String},
    'cancer type': {type: String, required: true},
    'date of diagnosis': {type: Date, required: true},
    'diagnosis status': {type: String, required: true},
    'doctor first name': {type: String, required: true},
    'doctor last name': {type: String, required: true},
    'doctor phone': {type: String, required: true},
    'walker, crutches, wheelchair': {type: String, required: true},
    'allergies':{type:String,required: true},
    'medical conditions':{type:[String],required: true},
    'living conditions explanation':{type:[String],required: true},
    'emergency contact first name': {type: String, required: true},
    'emergency contact last name': {type: String, required: true},
    'emergency contact street address': {type: String, required: true},
    'emergency contact zip': {type: String, required: true},
    'emergency contact phone': {type: String, required: true},
    'emergency contact email': {type: String, required: true},
    'program selection':{type:[String],required: true},
    'religious beliefs':{type:String,required: true},
    'open to prayer':{type:String,required: true},
    'Financial assistance':{type:String,required: true},
    'financial income level':{type:String},
    'financial income source':{type:String},
    'financial services needed':{type:[String]},
    'financial assistance explanation':{type:String},
    'healing explanation':{type:String,required: true},
    'applicant acknowledgement':{type:Boolean,required: true},
})

const singularCollectionName = 'Patient'
const Patient = mongoose.model(singularCollectionName, patientSchema);

module.exports = Patient

// const patientSchema = new Schema({
// info:{
//     name:{
//         first: { type: String, required: true },
//         last: { type: String, required: true }, 
//     },
//     address:{
//         street: { type: String, required: true},
//         zip: { type: String, required: true},
//     },
//     birthdate: { type: Date, required: true},
//     phone: { type: String, required: true},
//     email: { type: String, required: true},
//     leaveMessage: {type: String},
//     relationshipStatus: {type: String},
//     filledOutBy: {type: String, required: true},
//     fillerInfo:{
//         name:{
//             first: { type: String, required: true },
//             last: { type: String, required: true }, 
//         },
//         address:{
//             street: { type: String, required: true},
//             zip: { type: String, required: true},
//         },
//         phone: { type: String, required: true},
//         email: { type: String, required: true},
//     }
// },
// health:{
//         cancer:{
//             type:{ type: String, required: true},
//             dateOfDiagnosis: { type: Date, required: true},
//             treatmentStatus: { type: String, required: true}
//         },
//         doctor:{
//             name:{
//                     first: { type: String, required: true },
//                     last: { type: String, required: true }, 
//                 },
//         },
//         allergiesList: { type: [String] },
//         medicalConditions: { type: [String] },
//         livingConditions: { type: [String], required: true },
        
// },
// emergencyContact:{
//     name:{
//         first: { type: String, required: true },
//         last: { type: String, required: true }, 
//     },
//     address:{
//         street: { type: String, required: true},
//         zip: { type: String, required: true},
//     },
//     phone: { type: String, required: true},
//     email: { type: String, required: true},
// },
// programSelection: { type: [String] },
// spiritualBelifs:{ 
//     type: {type: String },
//     prayer:{type: String }
// },
// financialInformation:{
//     doesNeed:{ type: String, required: true},
//     incomeInfo:{
//         level:{ type: String},
//         source:{ type: String},
//     },
//     servicesNeeded:{ type: [String] },
//     explanationBenefits: {type: String },
//     healingExplanation:{type: String }
// },
// termsAndConditionsAgree:{ type: String, required: true},
// isCheckedByAdmin:{ type: Boolean, required: true}
// });
