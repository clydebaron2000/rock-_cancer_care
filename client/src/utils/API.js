import axios from 'axios'
import devConsole from './devConsole'
const base = '/api/'
let template = {'first name': "l",
'last name': "a",
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
    // Partient
    getPatients: function (body){
        devConsole.log("getPatients")
        devConsole.log(body)
        return axios.get(base + 'patient/',{params:body})
    },
    getAllPatients: function (body){
        devConsole.log("getAllPatients") 
        devConsole.log(body) 
        return axios.get(base + 'patient/all',{params:body})
    },
    createPatient: function (body){
        devConsole.log('create patient')
        // comment below for testing
        body = template
        body.isCheckedByAdmin = false
        body.lastModfied = new Date()
        return axios.post(base + 'patient', body)
    },
    createPatientTest: function (){
        devConsole.log('create patient test')
        let body = template
        body.isCheckedByAdmin = false
        body.lastModfied = new Date()
        return axios.post(base + 'patient', body)
    },
    updatePatient: function(body){
        body.lastModfied = new Date()
        return axios.put(base + 'patient/' + body._id,body)
    },
// USER
    createUser: (body)=>{
        devConsole.log("create")
        body.authorization="admin"
        body.change_permissions=false
      return axios.post(base+'user', body)  
    },
    verifyUser: (body)=>{
      devConsole.log("verify")
      devConsole.log(body)
      return axios.get(base+'user/verify', {params:body})  
    },
    getAllUsers:()=>{
      devConsole.log("get all users")
      return axios.get(base+'user/admin')
    },
    deleteById:(id)=>{
      devConsole.log("delete")
      devConsole.log(id)
      return axios.delete(base+'user/admin?_id=' + id)
    }
} 
export default API