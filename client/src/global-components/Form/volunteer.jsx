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
            "Volunteer Information",
            "Reference Information",
            "Faith and Volunteering",
            "Testimony",
            "Thank you! We will get in touch with you shortly!"
      ]
      const totalSteps=titleArray.length-1
      const [stepNum,setStepsCompleted]=useState(0)
      const [formInputs,setFormInputs]=useState({})
      // const [renderMore,setRenderMore]=useState(false)
      function upDateValidateFunctions(name,value,getErrorFromValue,setErrorMessage){
            let form = formInputs
            // console.log(name+" updating with ",value)
            // devConsole.log(form[name])
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
                  if(formInputs[key].section === stepNum){
                        let value = formInputs[key].value
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
      function submitData(e){
            e.preventDefault()
            if (e.target.innerText==="next") {
                  // console.log("next step!")
                  setStepsCompleted(stepNum+1)
            }
            else if (e.target.innerText==="submit"){ 
                  // console.log("submistion to server")
                  // setStepsCompleted(stepNum+1)
                  devConsole.log(formInputs)
                  let data={...formInputs}
                  devConsole.log(data)
                  Object.keys(formInputs).forEach(key=>{
                        data[key]=data[key].value
                  })
                  devConsole.log(data)
                  API.createVolunteer(data).then(res=>{
                        setStepsCompleted(stepNum+1)
                  }).catch(err => console.log(err))
            }
      }
      function onChange(e){
            devConsole.assert(e!==undefined,"e undefined")
            devConsole.log(e.target.value)
            let name = e.target.name
            if (name === undefined || name === "")return
            let value = e.target.value
            let form = formInputs
            if (form[name] === undefined)form[name]={value:value,section:stepNum}
            else {
                  // console.assert(form[name]["value"]!==value,"form value is the same "+form[name]["value"])
                  // console.log(name)
                  // console.log(form[name])
                  // console.log(form[name]["value"]) 
                  devConsole.log(value)
                  if (form[name]["value"]!==value) {
                        // console.log(name+" changed")
                        form[name]["value"]=value
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
                                                            return "First name must be at least 2 chatacters"
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
                                                            return "Last name must be at least 2 chatacters"
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
                                                            return "Street address must be at least 2 chatacters"
                                                }}
                                                name="street address"
                                                type="adress"
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
                                                            return "Zip must be at least 2 chatacters"
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
                                                      "female",
                                                      // "other",
                                                      ]
                                                }
                                                header={<h2>Gender*</h2>}
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
                                                value={formInputs["preferred point of contact"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                name="preferred point of contact"
                                                type="checkbox"
                                                options={
                                                      [
                                                      "Text",
                                                      "Email",
                                                      "Phone call",
                                                      ]
                                                }
                                                header={<h2>Contact Preference*</h2>}
                                          />
                                          <Input
                                                value={formInputs["best time to contact"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                name="best time to contact"
                                                type="time"
                                                header={<h2>Best time to reach you?*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
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
                                          <Input
                                                value={formInputs["children volunteers"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                // required={true}
                                                name="children volunteers"
                                                type="multi-select"
                                                header={<h2>Name and age of children volunteering</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["financial occupation"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                name="financial occupation"
                                                type="text"
                                                header={<h2>Occupation (type N/A if none)*</h2>}
                                          />
                                          <Input
                                                value={formInputs["employer"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                name="employer"
                                                type="text"
                                                header={<h2>Employer (type N/A if none)*</h2>}
                                          />
                                    </div>
                              </div>
                        </div> 

                        <div id='1' className={(stepNum===1)?"active":(stepNum-1===1)?"prev":(stepNum+1===1)?"next":"ghost"}>
                              <div className="form-section">
                                    <h2 className="section-title">Name</h2>
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["reference first name"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2)
                                                            return "First name must be at least 2 chatacters"
                                                }}
                                                name="reference first name"
                                                type="text"
                                                header="First"
                                          />
                                          <Input
                                                value={formInputs["reference last name"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2)
                                                            return "Last name must be at least 2 chatacters"
                                                }}
                                                name="reference last name"
                                                type="text"
                                                header="Last"
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    <h2 className="section-title">Address</h2>
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["reference street address"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2)
                                                            return "Street address must be at least 2 chatacters"
                                                }}
                                                name="reference street address"
                                                type="adress"
                                                header="Street Address"
                                          />
                                          <Input
                                                value={formInputs["reference zip"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2)
                                                            return "Zip must be at least 2 chatacters"
                                                }}
                                                name="reference zip"
                                                type="zip"
                                                header="Zip"
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["reference phone"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                // validate={value=>{
                                                //       if (value.length!==17)
                                                //             return "enter a phone number in the format +1 (XXX) XXX-XXXX"
                                                // }}
                                                name="reference phone"
                                                type="tel"
                                                header={<h2>Phone*</h2>}
                                          />
                                          <Input
                                                value={formInputs["reference email"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                name="reference email"
                                                type="email"
                                                header={<h2>Email*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title">Relationship to Volunteer*</h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["reference relationship to volunteer"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2)
                                                            return "please enter the reference's relationship to the volunteer"
                                                }}
                                                name="reference relationship to volunteer"
                                                type="text"
                                                header={<h2>Relationship to Volunteer*</h2>}
                                          />
                                    </div>
                              </div>
                        </div>

                        <div id='2' className={(stepNum===2)?"active":(stepNum-1===2)?"prev":(stepNum+1===1)?"next":"ghost"}>
                              <div className="form-section">
                                    {/* <h2 className="section-title">Name</h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["been a christian"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                // validate={value=>{
                                                //       if (value.length<2)
                                                //             return "First name must be at least 2 chatacters"
                                                // }}
                                                name="been a christian"
                                                type="text"
                                                header="How long have you been a Christian?"
                                          />
                                          <Input
                                                value={formInputs["rock attendance"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                // validate={value=>{
                                                //       if (value.length<2)
                                                //             return "Last name must be at least 2 chatacters"
                                                // }}
                                                name="rock attendance"
                                                type="text"
                                                header="How long have you been attending the Rock?"
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    <h2 className="section-title">Address</h2>
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["rock campus"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                name="rock campus"
                                                type="radio"
                                                options={["Point Loma", "San Marcos","East County","San Ysidro","Mircosite"]}
                                                header="Which campus do you attend? *"
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["program selection"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                name="program selection"
                                                type="checkbox"
                                                options={["Leadership Role","Rock Kidz",...options.services]}
                                                header={<h2>In which areas are you interested in serving?*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["spiritual gifts test"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                name="spiritual gifts test"
                                                type="radio"
                                                options={["yes","no"]}
                                                header={<h2>Have you taken the Spiritual Gifts test?*</h2>}
                                          />
                                          <Input
                                                value={formInputs["consider leader"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                name="consider leader"
                                                type="radio"
                                                options={["yes","no"]}
                                                header={<h2>Would you consider yourself a leader?*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["commit to 6 months of service"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                name="commit to 6 months of service"
                                                type="radio"
                                                options={["yes","no"]}
                                                header={<h2>Are you willing to commit to 6 months of service?*</h2>}
                                          />
                                          <Input
                                                value={formInputs["past volunteer experience"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                name="past volunteer experience"
                                                type="radio"
                                                options={["yes","no"]}
                                                header={<h2>Do you have any previous volunteer experience? *</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["convicted of a felony"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                name="convicted of a felony"
                                                type="radio"
                                                options={["yes","no"]}
                                                header={<h2>Have you ever been convicted of a felony?*</h2>}
                                          />
                                          <div></div>
                                    </div>
                              </div>
                        </div>
 
                        <div id='3' className={(stepNum===3)?"active":(stepNum-1===3)?"prev":(stepNum+1===1)?"next":"ghost"}>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["testimony of being saved"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==3}
                                                required={true}
                                                name="testimony of being saved"
                                                type="textarea"
                                                header={<h2>Briefly describe how you came to know Jesus Christ as your Lord and Savior:*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["testimony of cancer"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==3}
                                                required={true}
                                                name="testimony of cancer"
                                                type="textarea"
                                                header={<h2>Briefly explain how you have been affected by cancer:*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["why volunteer question"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==3}
                                                required={true}
                                                name="why volunteer question"
                                                type="textarea"
                                                header={<h2>Why have you chosen to volunteer for Rock Cancer Care and what do you hope your experience will be?*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["most difficult for volunteering question"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==3}
                                                required={true}
                                                name="most difficult for volunteering question"
                                                type="textarea"
                                                header={<h2>What do you think will be most difficult for you working as a volunteer who serves cancer patients?*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["describe a difficult situation question"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==3}
                                                required={true}
                                                name="describe a difficult situation question"
                                                type="textarea"
                                                header={<h2>Please describe a situation or eventthat was difficultfor you to observe. Please share why it was difficult
                                                      and how you reacted.*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
                                                value={formInputs["healthy boundaries question"]?.value} 
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==3}
                                                required={true}
                                                name="healthy boundaries question"
                                                type="textarea"
                                                header={<h2>Maintaining healthy boundaries and acting within the scope of the volunteer role will be an important
                                                      part of your work here. Please provide an example, personally or professionally, of how you apply
                                                      boundaries in your life.*</h2>}
                                          />
                                    </div>
                              </div>

                        </div>
                        <div id='4' className={(stepNum===4)?"active":(stepNum-1===4)?"prev":(stepNum+1===1)?"next":"ghost"}>
                              <p>Thank you for your application. A Rock Cancer C.A.R.E. Ministry (RCC) Leader will review this application and contact the applicant.</p>
                        </div>
                        
                        </form>
                        <div className="form-bottom">
                              {((stepNum===0 || stepNum === totalSteps) && !isGodMode)?<div></div>:
                                    <button className="minor-button" onClick={_=>{
                                          _.preventDefault()
                                          if (stepNum>0)setStepsCompleted(stepNum-1)}}>
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