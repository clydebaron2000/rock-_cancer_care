import React,{useState} from 'react'
import Modal from 'react-modal'
import Input from '../Input'
import StepProgressBar from "./StepProgressBarGenerator"
import '../../css/form.css'
import API from '../../utils/API.js'
import options from './form'

function PatientIntakeForm (props) {
      const isGodMode=true
      const titleArray=[
            "Volunteer Information",
            "Reference Information",
            "Faith and Volunteering",
            "Testimony",
            "Thank you! We will get in touch with you shortly!"
      ]
      const totalSteps=titleArray.length-1
      const [stepNum,setStepsCompleted]=useState(3)
      const [formInputs,setFormInputs]=useState({})
      const [renderMore,setRenderMore]=useState(false)
      function upDateValidateFunctions(name,value,getErrorFromValue,setErrorMessage){
            let form = formInputs
            // console.log(name+" updating with ",value)
            form[name]={
                  value:value,
                  getErrorFromValue:(value) => getErrorFromValue(value),
                  setErrorMessage:(err) => setErrorMessage(err)
            }
            setFormInputs(form)
      }
      function checkInputs(e){
            e?.preventDefault()
            let hasAnyFalseValue = false
            // console.log("CHECKING INPUTS")
            // console.log(formInputs)
            for (const key in formInputs){
                  let value = formInputs[key].value
                  // console.log(key,value)
                  // console.log(formInputs[key])
                  let err = formInputs[key].getErrorFromValue(value)
                  // console.assert(err === "","err: "+err)
                  if (err !== ""){
                        formInputs[key].setErrorMessage(err)
                        if(hasAnyFalseValue === false)
                              hasAnyFalseValue = true
                  }
            }
            // console.assert(hasAnyFalseValue === false,"FALSY")
            // debugger
            if(hasAnyFalseValue === false || isGodMode) submitData(e)
      }
      function submitData(e){
            e.preventDefault()
            setRenderMore(false)
            if (e.target.innerText==="next") {
                  // console.log("next step!")
                  setStepsCompleted(stepNum+1)
            }
            else if (e.target.innerText==="submit"){ 
                  // console.log("submistion to server")
                  // setStepsCompleted(stepNum+1)
                  API.createVolunteer(formInputs).then(res=>{
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
            if (form[name] === undefined)form[name]={value:value}
            else {
                  // console.assert(form[name]["value"]!==value,"form value is the same "+form[name]["value"])
                  // console.log(name)
                  // console.log(form[name])
                  // console.log(form[name]["value"])
                  // console.log(value)
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
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                // validate={value=>{
                                                //       if (value.length!==17)
                                                //             return "enter a phone number in the format +1 (XXX) XXX-XXXX"
                                                // }}
                                                name="bday"
                                                type="date"
                                                header={<h2>Birth Date*</h2>}
                                          />
                                          <Input
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
                                                      "other",
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
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                // validate={value=>{
                                                //       if (value.length!==17)
                                                //             return "enter a phone number in the format +1 (XXX) XXX-XXXX"
                                                // }}
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
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==0}
                                                required={true}
                                                // validate={value=>{
                                                //       if (value.length!==17)
                                                //             return "enter a phone number in the format +1 (XXX) XXX-XXXX"
                                                // }}
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
                                    <h2 className="section-title">Relationship to Volunteer*</h2>
                                    <div className="section-inputs">
                                          <Input
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length!==17)
                                                            return "enter a phone number in the format +1 (XXX) XXX-XXXX"
                                                }}
                                                name="reference relationship to volunteer"
                                                type="text"
                                                header={<h2></h2>}
                                          />
                                    </div>
                              </div>
                        </div>

                        <div id='2' className={(stepNum===2)?"active":(stepNum-1===2)?"prev":(stepNum+1===1)?"next":"ghost"}>
                              <div className="form-section">
                                    {/* <h2 className="section-title">Name</h2> */}
                                    <div className="section-inputs">
                                          <Input
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
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                // validate={value=>{
                                                //       if (value.length<2)
                                                //             return "Street address must be at least 2 chatacters"
                                                // }}
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
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                name="program selection"
                                                type="checkbox"
                                                options={["Leaership Role","Rock Kidz",...options.services]}
                                                header={<h2>What services do you need?*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
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
                                    </div>
                              </div>
                        </div>
 
                        <div id='3' className={(stepNum===3)?"active":(stepNum-1===3)?"prev":(stepNum+1===1)?"next":"ghost"}>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
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
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==3}
                                                required={true}
                                                name="most difficult for volunteering question"
                                                type="textarea"
                                                header={<h2>What do you think will be most difficultfor you working as a volunteer who serves cancer patients?*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h2 className="section-title"></h2> */}
                                    <div className="section-inputs">
                                          <Input
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