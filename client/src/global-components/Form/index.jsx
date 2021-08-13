import React,{useState} from 'react'
import Modal from 'react-modal'
import Input from '../Input'
import StepProgressBar from "./StepProgressBarGenerator"
import '../../css/form.css'
import API from '../../utils/API.js'
import options from './form'
import devConsole from '../../utils/devConsole'

function PatientIntakeForm (props) {
      const isGodMode=false
      const titleArray=[
            "Patient Information",
            "Patient Health Information",
            "Emergency Contact Information",
            "Program Selection",
            "Financial Information",
            "Terms and Conditions",
            "Thank you! We will get in touch with you shortly!"
      ]
      const totalSteps=titleArray.length-1
      const [stepNum,setStepsCompleted]=useState(0)
      const [formInputs,setFormInputs]=useState({})
      const [renderMore,setRenderMore]=useState(false)
      function upDateValidateFunctions(name,value,getErrorFromValue,setErrorMessage){
            let form = formInputs
            // console.log(name+" updating with ",value)
            form[name]={
                  section:stepNum,
                  value:value,
                  getErrorFromValue:(value) => getErrorFromValue(value),
                  setErrorMessage:(err) => setErrorMessage(err)
            }
            setFormInputs(form)
      }
      function checkInputs(e){
            e?.preventDefault()
            let hasAnyFalseValue = false
            devConsole.log("CHECKING INPUTS")
            devConsole.log(formInputs)
            for (const key in formInputs){
                  if(formInputs[key].section===stepNum){
                        let value = formInputs[key]?.value
                        devConsole.log(key,value)
                        devConsole.log(formInputs[key])
                        let err = formInputs[key].getErrorFromValue(value)
                        devConsole.assert(err === "","err: "+err)
                        if (err !== ""){
                              formInputs[key].setErrorMessage(err)
                              if(hasAnyFalseValue === false)
                                    hasAnyFalseValue = true
                        }
                  }
            }
            devConsole.assert(hasAnyFalseValue === false,"FALSY")
            // debugger
            if(hasAnyFalseValue === false || isGodMode) submitData(e)
      }
      function previous(e){
            e.preventDefault()
            if (stepNum>0)setStepsCompleted(stepNum-1)
            if(stepNum-1===4 && formInputs?.["Financial assistance"]?.value==="yes")setRenderMore(true)
            else if(stepNum-1===0 && 
                  (formInputs?.["filled out by"].value!=="Patient" &&
                   formInputs?.["filled out by"].value!=="" && 
                   formInputs?.["filled out by"].value!==undefined))setRenderMore(true)
            else setRenderMore(false)
      }
      function submitData(e){
            e.preventDefault()
            if (e.target.innerText==="next") {
                  if(stepNum+1===4 && formInputs["Financial assistance"]?.value==="yes")setRenderMore(true)
                  else if(stepNum+1===0 && 
                       (formInputs["filled out by"].value!=="patient" &&
                        formInputs["filled out by"].value!=="" && 
                        formInputs["filled out by"].value!==undefined))setRenderMore(true)
                  else setRenderMore(false)
                  // console.log("next step!")
                  setStepsCompleted(stepNum+1)
            }
            else if (e.target.innerText==="submit"){ 
                  // console.log("submission to server")
                  // setStepsCompleted(stepNum+1)
                  devConsole.log(formInputs)
                  let data={...formInputs}
                  devConsole.log(data)
                  Object.keys(formInputs).forEach(key=>{
                        data[key]=data[key]?.value
                  })
                  devConsole.log(data)
                  API.createPatient(data).then(res=>{
                        setStepsCompleted(stepNum+1)
                  }).catch(err => console.log(err))
            }
      }
      function onChange(e){
            // console.assert(e!==undefined,"e undefined")
            let name = e.target.name
            if (name === undefined || name === "")return
            let value = e.target.value
            let form = formInputs
            if (form[name] === undefined)form[name]={value:value,section:stepNum}
            else {
                  if (form[name]["value"]!==value) {
                        // console.log(name+" changed")
                        form[name]["value"]=value
                        if (name === "filled out by"){
                              if (value !== null && value !== "" && value !== "Patient"){
                                    setRenderMore(true)
                              } else {
                                    for (const key in formInputs){
                                          let form=formInputs
                                          if (key.indexOf("filler") !== -1 || key.indexOf("Fille") !== -1){
                                                delete form[key]
                                          }
                                          setFormInputs(form)
                                    }
                                    setRenderMore(false)
                              }
                        } else if (name === "Financial assistance"){
                              // console.log("FINANCIAL")
                              // console.log(value)
                              if (value === "yes"){
                                    setRenderMore(true)
                              } else {
                                    for (const key in formInputs){
                                          let form=formInputs
                                          if (key.indexOf("financial") !== -1 || key.indexOf("Fille") !== -1){
                                                delete form[key]
                                          }
                                          setFormInputs(form)
                                    }
                                    setRenderMore(false)
                              }
                        } 
                  }
            }
            // console.log(form[name])
            setFormInputs(form)
      }
      return (
            <Modal  
                  className="modal"
                  overlayClassName="overlay"
                  preventScroll={true}
                  isOpen={props.isOpen}
                  ariaHideApp={false}
            >
                  <div className="form-modal">
                        <div className="modal-title">
                              <div>
                                    <button style={{display:'none'}} disabled={true}>x</button>
                              </div> 
                              <h1>{titleArray[stepNum]}</h1>
                              {/* <h1>Personal Information</h1> */}
                              {(stepNum===totalSteps)?<hr/>:<StepProgressBar
                                    stepsCompleted={stepNum}
                                    totalSteps={totalSteps}
                              />}
                        </div>
                        <form className="form-content">
                        <div id = '0' className={(stepNum===0)?"active":(stepNum-1===0)?"prev":(stepNum+1===0)?"next":"ghost"}>
                              <div className="form-section">
                                    <h2 className="section-title">Name</h2>
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["first name"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2)
                                                            return "First name must be at least 2 characters"
                                                }}
                                                name="first name"
                                                type="text"
                                                header="First"
                                          />
                                          <Input
                                                value={formInputs["last name"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2)
                                                            return "Last name must be at least 2 characters"
                                                }}
                                                name="last name"
                                                type="text"
                                                header="Last"
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    <h2 className="section-title">Address</h2>
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["street address"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2)
                                                            return "Street address must be at least 2 characters"
                                                }}
                                                name="street address"
                                                type="address"
                                                header="Street Address"
                                          />
                                          <Input
                                                value={formInputs["zip"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2)
                                                            return "Zip must be at least 2 characters"
                                                }}
                                                name="zip"
                                                type="zip"
                                                header="Zip"
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["birth date"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                // validate={value=>{
                                                //       if (value.length!==17)
                                                //             return "enter a phone number in the format +1 (XXX) XXX-XXXX"
                                                // }}
                                                name="birth date"
                                                type="date"
                                                header={<h2>Birth Date*</h2>}
                                          />
                                          <Input
                                                value={formInputs["gender"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                name="gender"
                                                type="radio"
                                                options={
                                                      ["male",
                                                      "female"
                                                      ]
                                                }
                                                header={<h2>Gender (Biological)*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["phone"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                // validate={value=>{
                                                //       if (value.length!==17)
                                                //             return "enter a phone number in the format +1 (XXX) XXX-XXXX"
                                                // }}
                                                name="phone"
                                                type="tel"
                                                header={<h2>Phone*</h2>}
                                          />
                                          <Input
                                                value={formInputs["email"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                name="email"
                                                type="email"
                                                header={<h2>Email*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["leave a message"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                // validate={value=>{
                                                //       if (value.length!==17)
                                                //             return "enter a phone number in the format +1 (XXX) XXX-XXXX"
                                                // }}
                                                name="leave a message"
                                                type="radio"
                                                options={
                                                      ["yes",
                                                      "no",
                                                      ]
                                                }
                                                header={<h2>Is it okay to leave a message?*</h2>}
                                          />
                                          <Input
                                                value={formInputs["relationship status"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                name="relationship status"
                                                type="select"
                                                options={
                                                      ["",
                                                      "Single",
                                                      "Married",
                                                      "Divorced / Separated",
                                                      "Widowed / Widower"
                                                      ]
                                                }
                                                header={<h2>Relationship Status*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["filled out by"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                name="filled out by"
                                                type="select"
                                                options={
                                                      ["",
                                                      "Patient",
                                                      "Friend",
                                                      "Relative",
                                                      "Social Worker",
                                                      "Health Care Professional"
                                                      ]
                                                }
                                                header={<h2>Application filled out by:*</h2>}
                                          />
                                    </div>
                              </div>
                              {(renderMore === true && stepNum === 0)?(
                                    <>
                                          <div className="form-section">
                                                <h2 className="section-title">Filler name</h2>
                                                <div className="section-inputs">
                                                      <Input
                                                            value={formInputs["filler first name"]?.value}
                                                            parentValidation={upDateValidateFunctions}
                                                            onChange={onChange}
                                                            onBlur={onChange}
                                                            displayNone={renderMore === false && stepNum!==0}
                                                            required={true}
                                                            validate={value=>{
                                                                  if (value.length<2)
                                                                        return "First name must be at least 2 characters"
                                                            }}
                                                            name="filler first name"
                                                            type="text"
                                                            header="First"
                                                      />
                                                      <Input
                                                            value={formInputs["filler last name"]?.value}
                                                            parentValidation={upDateValidateFunctions}
                                                            onChange={onChange}
                                                            onBlur={onChange}
                                                            displayNone={renderMore === false && stepNum!==0}
                                                            required={true}
                                                            validate={value=>{
                                                                  if (value.length<2)
                                                                        return "Last name must be at least 2 characters"
                                                            }}
                                                            name="filler last name"
                                                            type="text"
                                                            header="Last"
                                                      />
                                                </div>
                                          </div>
                                          <div className="form-section">
                                                {/* <h2 className="section-title"></h2> */}
                                                <div className="section-inputs">
                                                      <Input
                                                            value={formInputs["filler phone"]?.value}
                                                            parentValidation={upDateValidateFunctions}
                                                            onChange={onChange}
                                                            onBlur={onChange}
                                                            displayNone={renderMore === false && stepNum!==0}
                                                            required={true}
                                                            // validate={value=>{
                                                            //       if (value.length!==17)
                                                            //             return "enter a phone number in the format +1 (XXX) XXX-XXXX"
                                                            // }}
                                                            name="filler phone"
                                                            type="tel"
                                                            header={<h2>Filler Phone*</h2>}
                                                      />
                                                      <Input
                                                            value={formInputs["filler email"]?.value}
                                                            parentValidation={upDateValidateFunctions}
                                                            onChange={onChange}
                                                            onBlur={onChange}
                                                            displayNone={stepNum!==0}
                                                            required={true}
                                                            name="filler email"
                                                            type="email"
                                                            header={<h2>Filler Email*</h2>}
                                                      />
                                                </div>
                                          </div>
                                    </>
                              ):null} 
                        </div> 

                        <div id='1' className={(stepNum===1)?"active":(stepNum-1===1)?"prev":(stepNum+1===1)?"next":"ghost"}>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["cancer type"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2) return "type of cancer must be at least 2 characters"
                                                }}
                                                name="cancer type"
                                                type="text"
                                                header={<h2>Type of Cancer*</h2>}
                                          />
                                          <Input
                                                value={formInputs["date of diagnosis"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                }}
                                                name="date of diagnosis"
                                                type="date"
                                                header={<h2>Date of Diagnosis*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["diagnosis status"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                }}
                                                name="diagnosis status"
                                                type="radio"
                                                options={["Active Patient","Survivor"]}
                                                header={<h2>Select from below what describes you*</h2>}
                                          />
                                          <div className="input-wrapper"></div>
                                    </div>
                              </div>
                              <div className="form-section">
                                    <h2 className="section-title">Name of Doctor</h2>
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["doctor first name"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2) return "type of cancer must be at least 2 characters"
                                                }}
                                                name="doctor first name"
                                                type="text"
                                                header="First"
                                          />
                                          <Input
                                                value={formInputs["doctor last name"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                }}
                                                name="doctor last name"
                                                type="text"
                                                header="Last"
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["doctor phone"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2) return "type of cancer must be at least 2 characters"
                                                }}
                                                name="doctor phone"
                                                type="tel"
                                                header={<h2>Doctor Phone*</h2>}
                                          />
                                          <Input
                                                value={formInputs["walker, crutches, wheelchair"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                }}
                                                name="walker, crutches, wheelchair"
                                                type="radio"
                                                options={["yes","no"]}
                                                header={<h2>Do you use a walker, crutches, cane, or wheelchair on a regular basis?*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["medical conditions"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                // required={true}
                                                validate={value=>{
                                                }}
                                                isMulti={true}
                                                name="medical conditions"
                                                type="multi-select"
                                                options={options['health issues']}
                                                header={<h2>List any medical conditions you may have:</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["allergies"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                // required={true}
                                                // validate={value=>{
                                                // }}
                                                name="allergies"
                                                type="textarea"
                                                header={<h2>List any allergies you may have:</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["living conditions explanation"]?.value}
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                }}
                                                name="living conditions explanation"
                                                type="textarea"
                                                header={<h2>Does anyone you live with have any Medical Conditions or struggles with substance abuse? If yes, please explain.*</h2>}
                                          />
                                    </div>
                              </div>
                        </div>

                        <div id='2' className={(stepNum===2)?"active":(stepNum-1===2)?"prev":(stepNum+1===2)?"next":"ghost"}>
                              <div className="form-section">
                                    <h2 className="section-title">Name</h2>
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["emergency contact first name"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2)
                                                            return "First name must be at least 2 characters"
                                                }}
                                                name="emergency contact first name"
                                                type="text"
                                                header="First"
                                          />
                                          <Input
                                                value={formInputs["emergency contact last name"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2)
                                                            return "Last name must be at least 2 characters"
                                                }}
                                                name="emergency contact last name"
                                                type="text"
                                                header="Last"
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    <h2 className="section-title">Address</h2>
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["emergency contact street address"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2)
                                                            return "Street address must be at least 2 characters"
                                                }}
                                                name="emergency contact street address"
                                                type="address"
                                                header="Street Address"
                                          />
                                          <Input
                                                value={formInputs["emergency contact zip"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2)
                                                            return "Zip must be at least 2 characters"
                                                }}
                                                name="emergency contact zip"
                                                type="zip"
                                                header="Zip"
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["emergency contact phone"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                // validate={value=>{
                                                //       if (value.length!==17)
                                                //             return "enter a phone number in the format +1 (XXX) XXX-XXXX"
                                                // }}
                                                name="emergency contact phone"
                                                type="tel"
                                                header={<h2>Phone*</h2>}
                                          />
                                          <Input
                                                value={formInputs["emergency contact email"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                name="emergency contact email"
                                                type="email"
                                                header={<h2>Email*</h2>}
                                          />
                                    </div>
                              </div>
                        </div>
 
                        <div id='3' className={(stepNum===3)?"active":(stepNum-1===3)?"prev":(stepNum+1===3)?"next":"ghost"}>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["program selection"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==3}
                                                required={true}
                                                name="program selection"
                                                type="checkbox"
                                                options={options.services}
                                                header={<h2>What services do you need?*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    <h2 className="section-title">Spiritual beliefs</h2>
                                    <p>Please let us know what services you're interested in and we will follow up with you on availability and next steps. For a description of these services please visit the <a href="https://rockcancercare.org/our-programs/">Our Programs</a> page. You can always contact us if you become interested at a later time.</p>
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["religious beliefs"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==3}
                                                // required={true}
                                                validate={value=>{
                                                      if (value.length<2)
                                                            return "religious beliefs must be at least 2 characters"
                                                }}
                                                name="religious beliefs"
                                                type="text"
                                                header={<h2>What are your religious beliefs?</h2>}
                                          />
                                          <Input
                                                value={formInputs["open to prayer"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==3}
                                                required={true}
                                                options={["yes","no"]}
                                                name="open to prayer"
                                                type="radio"
                                                header={<h2>Are you open to being prayed for?</h2>}
                                          />
                                    </div>
                              </div>
                        </div>
                        <div id='4' className={(stepNum===4)?"active":(stepNum-1===4)?"prev":(stepNum+1===4)?"next":"ghost"}>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["Financial assistance"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==4}
                                                required={true}
                                                name="Financial assistance"
                                                type="radio"
                                                options={["yes","no"]}
                                                header={<h2>Do you need financial assistance?*</h2>}
                                          />
                                    </div>
                              </div>
                              {(renderMore === true && stepNum === 4)?(
                                    <>
                                          <div className="form-section">
                                                {/* <h2 className="section-title"></h2> */}
                                                <div className="section-inputs">
                                                      <Input
                                                            value={formInputs["financial income level"]?.value} 
                                                            parentValidation={upDateValidateFunctions}
                                                            onChange={onChange}
                                                            onBlur={onChange}
                                                            displayNone={renderMore === false && stepNum!==0}
                                                            required={true}
                                                            validate={value=>{
                                                                  if (value.length<2)
                                                                        return "First name must be at least 2 characters"
                                                            }}
                                                            name="financial income level"
                                                            type="select"
                                                            options={options.incomeLevel}
                                                            header={<h2>Yearly Income Level*</h2>}
                                                      />
                                                      <Input
                                                            value={formInputs["financial income source"]?.value} 
                                                            parentValidation={upDateValidateFunctions}
                                                            onChange={onChange}
                                                            onBlur={onChange}
                                                            displayNone={renderMore === false && stepNum!==0}
                                                            required={true}
                                                            validate={value=>{
                                                                  if (value.length<2)
                                                                        return "First name must be at least 2 characters"
                                                            }}
                                                            name="financial income source"
                                                            type="select"
                                                            options={options.incomeSource}
                                                            header={<h2>Income Source*</h2>}
                                                      />
                                                </div>
                                          </div>
                                          <div className="form-section">
                                                {/* <h2 className="section-title"></h2> */}
                                                <div className="section-inputs">
                                                      <Input
                                                            value={formInputs["financial services needed"]?.value} 
                                                            parentValidation={upDateValidateFunctions}
                                                            onChange={onChange}
                                                            onBlur={onChange}
                                                            displayNone={renderMore === false && stepNum!==0}
                                                            required={true}
                                                            // validate={value=>{
                                                            //       if (value.length!==17)
                                                            //             return "enter a phone number in the format +1 (XXX) XXX-XXXX"
                                                            // }}
                                                            name="financial services needed"
                                                            type="checkbox"
                                                            options={options.financialServices}
                                                            header={<h2>What type of financial services do you need?*</h2>}
                                                      />
                                                </div>
                                          </div>
                                          <div className="form-section">
                                                {/* <h2 className="section-title"></h2> */}
                                                <div className="section-inputs">
                                                      <Input
                                                            value={formInputs["financial assistance explanation"]?.value} 
                                                            parentValidation={upDateValidateFunctions}
                                                            onChange={onChange}
                                                            onBlur={onChange}
                                                            displayNone={renderMore === false && stepNum!==0}
                                                            required={true}
                                                            validate={value=>{
                                                                  
                                                                  if (value.split(" ").length<100)
                                                                        return "please provide a longer explanation, this will help us help you (100 word minimum)"
                                                            }}
                                                            name="financial assistance explanation"
                                                            type="textarea"
                                                            header={<h2>Please explain your hardship and how financial assistance will lift your burden and help you? 100 to 200 words? Be detailed.*</h2>}
                                                      />
                                                </div>
                                          </div>
                                          <div className="form-section">
                                                {/* <h2 className="section-title"></h2> */}
                                                <div className="section-inputs">
                                                      <Input
                                                            value={formInputs["financial healing explanation"]?.value} 
                                                            parentValidation={upDateValidateFunctions}
                                                            onChange={onChange}
                                                            onBlur={onChange}
                                                            displayNone={renderMore === false && stepNum!==0}
                                                            required={true}
                                                            validate={value=>{
                                                                  if (value.split(" ").length<100)
                                                                        return "please provide a longer explanation, this will help us help you (100 word minimum)"
                                                            }}
                                                            name="financial healing explanation"
                                                            type="textarea"
                                                            header={<h2>How will receiving financial assistance allow you to focus on healing instead of being worried about financial burdens? min 100 to 200 words be detailed*</h2>}
                                                      />
                                                </div>
                                          </div>
                                    </>
                              ):null} 
                        </div>
                                                            
                        <div id='5' className={(stepNum===5)?"active":(stepNum-1===5)?"prev":(stepNum+1===5)?"next":"ghost"}>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <p>In consideration of my receipt of Rock Cancer Ministry Funds (herein RCC), the undersigned applicant (or guardian, if applicable) understands and agrees that:
                                    </p>
                                    <ul style={{paddingLeft: "20px"}}>
                                          <li>
                                                Permission is granted to the physician, nurse, or social worker for pertinent medical information be disclosed to RCC
                                          </li>
                                          <li>
                                          RCC may use applicant’s biographical information in its promotional and/or marketing material
                                          </li>
                                          <li>
                                          RCC may disclose and release to the public and government entities, the amount of funds received, the use of funds, and other similar and relevant information
                                          </li>
                                          <li>
                                          The applicant shall indemnify and hold harmless RCC from any liability of funds which the grant may be used
                                          </li>
                                          <li>
                                          All information provided to RCC in support of the application shall be considered true and accurate 
                                          </li>
                                    </ul>
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["applicant acknowledgement"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==5}
                                                required={true}
                                                name="applicant acknowledgement"
                                                type="checkbox"
                                                options={["I agree to the terms and conditions*"]}
                                                header=""
                                          />
                                    </div>
                              </div>
                        </div>
                        <div id='6' className={(stepNum === totalSteps)?"active":(stepNum-1===totalSteps)?"prev":(stepNum+1===totalSteps)?"next":"ghost"}>
                              <p>Thank you for your application. A Rock Cancer C.A.R.E. Ministry (RCC) Leader will review this application and contact the applicant. Funds are limited and based on availability. All information is strictly confidential and is intended for RCC use only except as noted in the applicant acknowledgment section.</p>
                              <p>Please email a copy of the <a href='https://rockcancercare.org/'>intake signature form</a> to <a href="mailto:example@rockcancercare.org">example@rockcancercare.org</a> and we will process your application shortly.</p>
                        </div>
                        </form>
                        <div className="form-bottom">
                              {((stepNum===0 || stepNum === totalSteps) && !isGodMode)?<div></div>:
                                    <button className="minor-button" onClick={previous}>
                                                prev
                                    </button>
                              }

                              {(stepNum===totalSteps)?"":
                              <button className="action-button" onClick={checkInputs}>
                                    {(stepNum===totalSteps-1)?"submit":"next"}
                              </button>
                              }
                        </div>
                  
                  
                  </div>
            </Modal>

      )
}
export default PatientIntakeForm