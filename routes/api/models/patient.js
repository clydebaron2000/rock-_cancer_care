const mongoose = require("mongoose")
const Schema = mongoose.Schema

const patientSchema = new Schema({
info:{
    name:{
        first: { type: String, required: true },
        last: { type: String, required: true }, 
    },
    address:{
        street: { type: String, required: true},
        zip: { type: String, required: true},
    },
    birthdate: { type: Date, required: true},
    phone: { type: String, required: true},
    email: { type: String, required: true},
    leaveMessage: {type: String},
    relationshipStatus: {type: String},
    filledOutBy: {type: String, required: true},
    fillerInfo:{
        name:{
            first: { type: String, required: true },
            last: { type: String, required: true }, 
        },
        address:{
            street: { type: String, required: true},
            zip: { type: String, required: true},
        },
        phone: { type: String, required: true},
        email: { type: String, required: true},
    }
},
health:{
        cancer:{
            type:{ type: String, required: true},
            dateOfDiagnosis: { type: Date, required: true},
            treatmentStatus: { type: String, required: true}
        },
        doctor:{
            name:{
                    first: { type: String, required: true },
                    last: { type: String, required: true }, 
                },
        },
        allergiesList: { type: [String] },
        medicalConditions: { type: [String] },
        livingConditions: { type: [String], required: true },
        
},
emergencyContact:{
    name:{
        first: { type: String, required: true },
        last: { type: String, required: true }, 
    },
    address:{
        street: { type: String, required: true},
        zip: { type: String, required: true},
    },
    phone: { type: String, required: true},
    email: { type: String, required: true},
},
programSelection: { type: [String] },
spiritualBelifs:{ 
    type: {type: String },
    prayer:{type: String }
},
financialInformation:{
    doesNeed:{ type: String, required: true},
    incomeInfo:{
        level:{ type: String},
        source:{ type: String},
    },
    servicesNeeded:{ type: [String] },
    explanationBenefits: {type: String },
    healingExplanation:{type: String }
},
termsAndConditionsAgree:{ type: String, required: true},
isCheckedByAdmin:{ type: Boolean, required: true}
});
const singularCollectionName = 'Patient'
const Patient = mongoose.model(singularCollectionName, patientSchema);

module.exports = Patient
