import React,{useState,useEffect} from 'react'
import Modal from 'react-modal'
import Input from '../Input'
import StepProgressBar from "./StepProgressBarGenerator"
import '../../css/form.css'

function PatientIntakeForm (props) {
      // const [form,setForm]=useState({})
      const totalSteps=5
      const [stepNum,setStepsCompleted]=useState(0)
      const [formInputs,setFormInputs]=useState({})
      useEffect(_=>{
      },[stepNum])
      function checkInputs(e){
            e.preventDefault()
            let anyfalse=false
            for(const key in formInputs){
                  let isValid=(formInputs[key]!==null)
                  if (anyfalse===false && !isValid) anyfalse=true
            }
            if(!anyfalse)submitData(e)
      }
      function submitData(e){
            // e.preventDefault();
            if (e.target.innerText==="next"){
                  setStepsCompleted(stepNum+1)
            } else if (e.target.innerText==="submit"){
                  setStepsCompleted(stepNum+1)
            }
      }
      function updateEntry(name,value,validate){
            let output=formInputs;
            output[name]=((validate())? value: null)
            setFormInputs(output)
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
                              {/* <h1>{(stepNum<totalSteps)?'Title of section '+(stepNum+1):'Finish'}</h1> */}
                              <h1>Personal Information</h1>
                              {(stepNum===totalSteps)?null:<StepProgressBar
                                    stepsCompleted={stepNum}
                                    totalSteps={totalSteps}
                              />}
                        </div>
                        <form className="form-content">
                        <div id='0' className={(stepNum===0)?"active":(stepNum-1===0)?"prev":(stepNum+1===0)?"next":"ghost"}>
                              <div className="form-section">
                                    <h4 className="section-title">Name</h4>
                                    <div className="section-inputs">
                                          <Input
                                                updateEntry={updateEntry}
                                                required={true}
                                                validate={value=>{
                                                      let err_msg=null
                                                      if (value.length<2)err_msg="first name must be at least 2 characters"
                                                      return err_msg
                                                }}
                                                name="first name"
                                                type="text"
                                                header="First"
                                          />
                                          <Input
                                                updateEntry={updateEntry}
                                                required={true}
                                                validate={value=>{
                                                      let err_msg=null
                                                      if (value?.length < 2) err_msg="last name must be at least 2 characters"
                                                      return err_msg
                                                }}
                                                name="last name"
                                                type="text"
                                                header="Last"
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    <h4 className="section-title">Address</h4>
                                    <div className="section-inputs">
                                          <Input
                                                updateEntry={updateEntry}
                                                required={true}
                                                validate={value=>{
                                                      let err_msg=null
                                                      if (value.length<2)err_msg="street address must be at least 2 characters"
                                                      return err_msg
                                                }}
                                                name="street address"
                                                type="street address"
                                                header="Street Address"
                                          />
                                          <Input
                                                updateEntry={updateEntry}
                                                required={true}
                                                // validate={}
                                                name="zip"
                                                type="zip"
                                                header="Zip"
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h4 className="section-title"></h4> */}
                                    <div className="section-inputs">
                                          <Input
                                                updateEntry={updateEntry}
                                                required={true}
                                                validate={value=>{
                                                      let err_msg=null
                                                      // if (value.length<2)err_msg="street address must be at least 2 characters"
                                                      return err_msg
                                                }}
                                                name="birth date"
                                                type="date"
                                                header={<h4>Birth Date*</h4>}
                                          />
                                          <Input
                                                updateEntry={updateEntry}
                                                required={true}
                                                // validate={}
                                                name="gender"
                                                type="radio"
                                                options={["male","female","other"]}
                                                header={<h4>Gender*</h4>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h4 className="section-title"></h4> */}
                                    <div className="section-inputs">
                                          <Input
                                                updateEntry={updateEntry}
                                                required={true}
                                                // validate={}
                                                name="phone"
                                                type="tel"
                                                header={<h4>Phone*</h4>}
                                          />
                                          <Input
                                                updateEntry={updateEntry}
                                                required={true}
                                                // validate={}
                                                name="email"
                                                type="email"
                                                header={<h4>Email*</h4>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    <div className="section-inputs">
                                          <Input
                                                updateEntry={updateEntry}
                                                // required={true}
                                                // validate={}
                                                name="leave message"
                                                type="radio"
                                                options={["yes","no"]}
                                                header={<h4>Is it okay to leave a message?</h4>}
                                          />
                                          <Input
                                                updateEntry={updateEntry}
                                                required={true}
                                                // validate={}
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
                                                header={<h4>Relationship Status*</h4>}
                                          />
                                    </div>
                              </div>
                              <div className="form-section">
                                    {/* <h4 className="section-title"></h4> */}
                                    <div className="section-inputs">
                                          <Input
                                                updateEntry={updateEntry}
                                                required={true}
                                                // validate={}
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
                                                header={<h4>Application filled out by*</h4>}
                                          />
                                    </div>
                              </div>
                        </div> 

                        <div id='1' className={(stepNum===1)?"active":(stepNum-1===1)?"prev":(stepNum+1===1)?"next":"ghost"}>
                              <h1>Second Section</h1>
                        </div>
                        <div id='2' className={(stepNum===2)?"active":(stepNum-1===2)?"prev":(stepNum+1===2)?"next":"ghost"}>
                              <h1>3rd Section</h1>
                        </div>
                        <div id='3' className={(stepNum===3)?"active":(stepNum-1===3)?"prev":(stepNum+1===3)?"next":"ghost"}>
                              <h1>4th section</h1>
                        </div>
                        <div id='4' className={(stepNum===4)?"active":(stepNum-1===4)?"prev":(stepNum+1===4)?"next":"ghost"}>
                              <h1>5th section</h1>
                        </div>
                        <div id='5' className={(stepNum===5)?"active":(stepNum-1===5)?"prev":(stepNum+1===5)?"next":"ghost"}>
                              <h1>finished message</h1>
                        </div>
                        </form>
                        <div className="form-bottom">
                              {(stepNum===0)?<div></div>:
                                    <button className="minor-button" onClick={_=>{
                                          _.preventDefault()
                                          if (stepNum>0)setStepsCompleted(stepNum-1)}}>prev</button>
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