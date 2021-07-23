import React,{useState,useEffect} from 'react'
import Modal from 'react-modal'
import Input from '../Input'
import StepProgressBar from "./StepProgressBarGenerator"
import '../../css/form.css'
import API from '../../utils/API.js'
import options from './form'

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
                  console.log(key,value)
                  console.log(formInputs[key])
                  let err = formInputs[key].getErrorFromValue(value)
                  console.assert(err === "","err: "+err)
                  if (err !== ""){
                        formInputs[key].setErrorMessage(err)
                        if(hasAnyFalseValue === false)
                              hasAnyFalseValue = true
                  }
            }
            console.assert(hasAnyFalseValue === false,"FALSY")
            // debugger
            if(hasAnyFalseValue === false || isGodMode) submitData(e)
      }
      function submitData(e){
            e.preventDefault()
            setRenderMore(false)
            if (e.target.innerText==="next") {
                  console.log("next step!")
                  setStepsCompleted(stepNum+1)
            }
            else if (e.target.innerText==="submit"){ 
                  console.log("submistion to server")
                  //dummy loop
                  // setStepsCompleted(stepNum+1)
                  API.createPatientTest().then(res=>{
                        setStepsCompleted(stepNum+1)
                  }).catch(err => console.log(err))
            }
      }
      function onChange(e){
            console.assert(e!==undefined,"e undefined")
            let name = e.target.name
            if (name === undefined || name === "")return
            let value = e.target.value
            let form = formInputs
            if (form[name] === undefined)form[name]={value:value}
            else {
                  // console.assert(form[name]["value"]!==value,"form value is the same "+form[name]["value"])
                  console.log(name)
                  console.log(form[name])
                  console.log(form[name]["value"])
                  console.log(value)
                  if (form[name]["value"]!==value) {
                        console.log(name+" changed")
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
                              console.log("FINANCIAL")
                              console.log(value)
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
            console.log(form[name])
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
                                                      if (value.length<=2)
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
                                                      if (value.length<=2)
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
                                                      if (value.length<=2)
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
                                                      if (value.length<=2)
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
                                                            parentValidation={upDateValidateFunctions}
                                                            onChange={onChange}
                                                            onBlur={onChange}
                                                            displayNone={renderMore === false && stepNum!==0}
                                                            required={true}
                                                            validate={value=>{
                                                                  if (value.length<=2)
                                                                        return "First name must be at least 2 chatacters"
                                                            }}
                                                            name="filler first name"
                                                            type="text"
                                                            header="First"
                                                      />
                                                      <Input
                                                            parentValidation={upDateValidateFunctions}
                                                            onChange={onChange}
                                                            onBlur={onChange}
                                                            displayNone={renderMore === false && stepNum!==0}
                                                            required={true}
                                                            validate={value=>{
                                                                  if (value.length<=2)
                                                                        return "Last name must be at least 2 chatacters"
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
                                    <h2 className="section-title"></h2>
                                    <div className="section-inputs">
                                          <Input
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
                                    <h2 className="section-title"></h2>
                                    <div className="section-inputs">
                                          <Input
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

                                    </div>
                              </div>
                              <div className="form-section">
                                    <h2 className="section-title">Name of Doctor</h2>
                                    <div className="section-inputs">
                                          <Input
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
                                    <h2 className="section-title"></h2>
                                    <div className="section-inputs">
                                          <Input
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
                                    <h2 className="section-title"></h2>
                                    <div className="section-inputs">
                                          <Input
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                }}
                                                isMulti={true}
                                                name="medical conditions"
                                                type="multi-select"
                                                options={options['health issues']}
                                                header={<h2>List any medical conditions you may have:*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    <h2 className="section-title"></h2>
                                    <div className="section-inputs">
                                          <Input
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                }}
                                                name="medical conditions"
                                                type="textarea"
                                                header={<h2>List any medical conditions you may have:*</h2>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    <h2 className="section-title"></h2>
                                    <div className="section-inputs">
                                          <Input
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

                        <div id='2' className={(stepNum===2)?"active":(stepNum-1===2)?"prev":(stepNum+1===1)?"next":"ghost"}>
                              <div className="form-section">
                                    <h2 className="section-title">Name</h2>
                                    <div className="section-inputs">
                                          <Input
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<=2)
                                                            return "First name must be at least 2 chatacters"
                                                }}
                                                name="emergency contact first name"
                                                type="text"
                                                header="First"
                                          />
                                          <Input
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<=2)
                                                            return "Last name must be at least 2 chatacters"
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
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<=2)
                                                            return "Street address must be at least 2 chatacters"
                                                }}
                                                name="emergency contact street address"
                                                type="adress"
                                                header="Street Address"
                                          />
                                          <Input
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==2}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<=2)
                                                            return "Zip must be at least 2 chatacters"
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
 
                        <div id='3' className={(stepNum===3)?"active":(stepNum-1===3)?"prev":(stepNum+1===1)?"next":"ghost"}>
                              <div className="form-section">
                                    <h2 className="section-title"></h2>
                                    <div className="section-inputs">
                                          <Input
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
                                    <p>Please let us know what services you're interested in and we will follow up with you on availability and next steps. For a description of these services please visit the <a href="https://rockcancercare.org/our-programs/">Our Programs</a> page. You can always contact us if you become interesed at a later time.</p>
                                    <div className="section-inputs">
                                          <Input
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==3}
                                                // required={true}
                                                validate={value=>{
                                                      if (value.length<=2)
                                                            return "religious beliefs must be at least 2 chatacters"
                                                }}
                                                name="religious beliefs"
                                                type="text"
                                                header={<h2>What are your religious beliefs?</h2>}
                                          />
                                          <Input
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
                        <div id='4' className={(stepNum===4)?"active":(stepNum-1===4)?"prev":(stepNum+1===1)?"next":"ghost"}>
                              <div className="form-section">
                                    <h2 className="section-title"></h2>
                                    <div className="section-inputs">
                                          <Input
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
                                                <h2 className="section-title"></h2>
                                                <div className="section-inputs">
                                                      <Input
                                                            parentValidation={upDateValidateFunctions}
                                                            onChange={onChange}
                                                            onBlur={onChange}
                                                            displayNone={renderMore === false && stepNum!==0}
                                                            required={true}
                                                            validate={value=>{
                                                                  if (value.length<=2)
                                                                        return "First name must be at least 2 chatacters"
                                                            }}
                                                            name="financial income level"
                                                            type="select"
                                                            options={options.incomeLevel}
                                                            header={<h2>Yearly Income Level*</h2>}
                                                      />
                                                      <Input
                                                            parentValidation={upDateValidateFunctions}
                                                            onChange={onChange}
                                                            onBlur={onChange}
                                                            displayNone={renderMore === false && stepNum!==0}
                                                            required={true}
                                                            validate={value=>{
                                                                  if (value.length<=2)
                                                                        return "First name must be at least 2 chatacters"
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
                                                            options={options.services}
                                                            header={<h2>What type of financial services do you need?*</h2>}
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
                                                            
                        <div id='5' className={(stepNum===5)?"active":(stepNum-1===5)?"prev":(stepNum+1===1)?"next":"ghost"}>
                              <div className="form-section">
                                    <h2 className="section-title"></h2>
                                    <p>In consideration of my reciept of Rock Cancer Ministry Funds (herin RCC), the undersigned applicant (or gaurdian, if applicable) understands and agrees that:
                                    </p>
                                    <ul style={{paddingLeft: "20px"}}>
                                          <li>
                                                Permission is granted to the physician, nurse, or social worker for pertinent medical information be disclosed to RCC
                                          </li>
                                          <li>
                                          RCC may use applicant’s biographical information in its promotional and/or marketing material
                                          </li>
                                          <li>
                                          RCC may disclose and release to the public and government entities, the amount of funds recieved, the use of funds, and other similar and relevant information
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
                                                parentValidation={upDateValidateFunctions}
                                                onChange={onChange}
                                                onBlur={onChange}
                                                displayNone={stepNum!==5}
                                                required={true}
                                                name="applicant acknowledgement"
                                                type="checkbox"
                                                options={["I agree to the terms and conditions*"]}
                                                header={<h2></h2>}
                                          />
                                    </div>
                              </div>
                        </div>
                        <div id='7' className={(stepNum === totalSteps)?"active":(stepNum-1===7)?"prev":(stepNum+1===5)?"next":"ghost"}>
                              <p>Thank you for your application. A Rock Cancer C.A.R.E. Ministry (RCC) Leader will review this application and contact the applicant. Funds are limited and based on availability. All information is strictly confidential and is intended for RCC use only except as noted in the applicant acknowledgment section.</p>
                              <p>Please email a copy of the <a href=''>intake signature form</a> to <a href="mailto:example@rockcancercare.org">example@rockcancercare.org</a> and we will process your application shortly.</p>
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