import axios from 'axios'
import devConsole from './devConsole'
import {volunteer,patient} from './API_data_template'
const base = '/api/'
const API = {
    // Patient
    getPatients: function (body){
        devConsole.log("getPatients")
        devConsole.log(body)
        return axios.get(base + 'patient/',{params:body})
    },
    getAllPatients: function (body){
        devConsole.log("getAllPatients") 
        // devConsole.log(body) 
        return axios.get(base + 'patient/all',{params:body})
    },
    createPatient: function (body){
        devConsole.log('create patient')
        // comment below for testing
        // body = patient
        body.isCheckedByAdmin = false
        body.lastModified = new Date()
        return axios.post(base + 'patient', body)
    },
    createPatientTest: function (){
        devConsole.log('create patient test')
        let body = patient
        body.isCheckedByAdmin = false
        body.lastModified = new Date()
        return axios.post(base + 'patient', body)
    },
    updatePatient: function(body){
        body.lastModified = new Date()
        return axios.put(base + 'patient/' + body._id,body)
    },
    // Volunteer
    getVolunteers: function (body){
        devConsole.log("getVolunteers")
        devConsole.log(body)
        return axios.get(base + 'volunteer/',{params:body})
    },
    getAllVolunteers: function (body){
        devConsole.log("getAllVolunteers") 
        devConsole.log(body) 
        return axios.get(base + 'volunteer/all',{params:body})
    },
    createVolunteer: function (body){
        devConsole.log('create volunteer')
        // comment below for testing
        // body = volunteer
        body.isCheckedByAdmin = false
        body.lastModified = new Date()
        return axios.post(base + 'volunteer', body)
    },
    createVolunteerTest: function (){
        devConsole.log('create volunteer test')
        let body = volunteer
        body.isCheckedByAdmin = false
        body.lastModified = new Date()
        return axios.post(base + 'volunteer', body)
    },
    updateVolunteer: function(body){
        body.lastModified = new Date()
        return axios.put(base + 'Volunteer/' + body._id,body)
    },
// USER
    createUser: (body)=>{
        devConsole.log("create")
      return axios.post(base+'user/admin', body)  
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
    findUserById:(id)=>{
      devConsole.log("findUserByID")
      return axios.get(base+'user/admin?_id=' + id)
    },
    deleteById:(id)=>{
      devConsole.log("delete")
      devConsole.log(id)
      return axios.delete(base+'user/admin?_id=' + id)
    }
} 
export default API