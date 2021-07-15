import React,{useState,useEffect} from 'react'
import Modal from 'react-modal'
import Input from '../Input'
import StepProgressBar from "./StepProgressBarGenerator"
import '../../css/form.css'

function PatientIntakeForm (props) {
      const isGodMode=true
      // const [form,setForm]=useState({})
      const titleArray=[
            "Patient Information",
            "Patient Health Information",
            "Emergency Contact Information",
            "Program Selection",
            "Financial Information",
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
            e.preventDefault()
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
                  for(let i=0;i<10000000;i++){}
                  setStepsCompleted(stepNum+1)
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
                                    // TODO FIX for long run
                                    //FOR NOW:
                                    //REMOVE ALL filler keys
                                    for (const key in formInputs){
                                          let form=formInputs
                                          if (key.indexOf("fille") !== -1 || key.indexOf("Fille") !== -1){
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
                                                name="Last name"
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
                                                name="Street address"
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
                                                name="Zip"
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
                                                            name="Filler first name"
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
                                                            name="Filler Last name"
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
                                    <h4 className="section-title">TRYFUIOJ</h4>
                                    <div className="section-inputs">
                                          <Input
                                                displayNone={stepNum!==1}
                                                required={true}
                                                validate={value=>{
                                                      if (value.length<2) return "first name must be at least 2 characters"
                                                }}
                                                name="a"
                                                type="text"
                                                header="First"
                                          />
                                    </div>
                              </div>
                        </div>
                        <div id='5' className={(stepNum===totalSteps)?"active":(stepNum-1===5)?"prev":(stepNum+1===5)?"next":"ghost"}>
                              <h1>finished message</h1>
                        </div>
                        </form>
                        <div className="form-bottom">
                              {((stepNum===0 || stepNum===totalSteps) && !isGodMode)?<div></div>:
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