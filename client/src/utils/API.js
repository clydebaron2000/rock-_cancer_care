import axios from 'axios'
const base = '/api/'
let template = {'first name': "clyde",
'last name': "rapinan",
'street address': "a",
'zip': 1,
'birth date': "2021-07-22",
'gender': "male",
'phone': "1",
'email': "a",
'leave a message': "no",
'relationship status': "boi",
'filled out by': "me",
'cancer type': "school",
'date of diagnosis': "2021-07-22",
'diagnosis status': "yes",
'doctor first name': "a",
'doctor last name': "b",
'doctor phone': "c",
'walker, crutches, wheelchair': "no",
'allergies':"no",
'medical conditions':[],
'living conditions explanation':"nope",
'emergency contact first name': "u",
'emergency contact last name': "u",
'emergency contact street address': "me",
'emergency contact zip': "zip",
'emergency contact phone': "1",
'emergency contact email': "a",
'program selection':["none"],
'religious beliefs':"y u ask",
'open to prayer':"no",
'Financial assistance':"no",
'applicant acknowledgement':true,}
const API = {
    createTest: function (body){
        console.log('received in API')
        body.isCheckedByAdmin = false
        return axios.post(base + 'test', body)
    },
    getAllTests: function (body){
        return axios.get(base + 'test',body)
    },
    createPatient: function (patient){
        console.log('received in API')
        patient.isCheckedByAdmin = false
        patient.lastModfied = new Date()
        return axios.post(base + 'patient', patient)
    },
    createPatientTest: function (){
        console.log('received in API')
        let patient = template
        patient.isCheckedByAdmin = false
        patient.lastModfied = new Date()
        return axios.post(base + 'patient', patient)
    },
    updatePatient: function(patient){
        patient.lastModfied = new Date()
        return axios.put(base + 'patient' + patient._id,patient)
    }
     
}
export default API