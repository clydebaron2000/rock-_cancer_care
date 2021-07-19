import axios from 'axios'
const base = '/api/'
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
    updatePatient: function(patient){
        patient.lastModfied = new Date()
        return axios.put(base + 'patient' + patient._id,patient)
    }
    
}
export default API