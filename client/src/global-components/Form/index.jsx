import React,{useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'
import Modal from 'react-modal'

// import the progress bar
// import "react-step-progress-bar/styles.css"
// import { ProgressBar, Step } from "react-step-progress-bar"

import StepProgressBar from "./StepProgressBarGenerator"
import '../../css/form.css'
// import '../../css/main.css';
// import RadioPrompt from "../../global-components/RadioPrompt"
function PatientIntakeForm (props) {
      const [form,setForm]=useState({})
      const totalSteps=5
      const [stepNum,setStepsCompleted]=useState(0)
      useEffect(_=>{
            console.log(stepNum)
      },[stepNum])
      function getAllData(_){
            console.log(form)
      }
      function incrementStep(e){
            e.preventDefault();
            setStepsCompleted(stepNum+1)
      }
      function submitData(e){
            e.preventDefault()
            console.log("data submitted!")
      }
      function updateEntry(forminput){
            let output=form;
            output[forminput[0]]=forminput[1];
            setForm(output)
            // console.log(output)
      }
      function requiredValidator(e){
            let element=e.target;
            if (element.required==false){
                  if (element.value===undefined || element.value===""){
                        console.log(element.parentElement)
                        element.style='background:red'
                        element.parentElement.style=`::after{content:attr(err)}`
                  }
                  else{
                        element.style='background:none'
                  }
            }
      }
      return (
            <Modal  
                  className="modal"
                  overlayClassName="overlay"
                  preventScroll={true}
                  isOpen={props.isOpen}
            >
                  <div className="form-modal">
                        <div className="modal-title">
                              <div>
                                    <button style={{display:'none'}} disabled={true}>x</button>
                              </div> 
                              <h1>{(stepNum<totalSteps)?'Title of section '+(stepNum+1):'Finish'}</h1>
                              {(stepNum===totalSteps)?null:<StepProgressBar
                                    stepsCompleted={stepNum}
                                    totalSteps={totalSteps}
                              />}
                        </div>
                        <form className="form-content">
                        <div id='0' className={(stepNum===0)?"active":(stepNum-1===0)?"prev":(stepNum+1===0)?"next":"ghost"}>
                              <div id="full-name-section" className="form-section">
                                    <h4 className="section-title">Name</h4>
                                    <div className="section-inputs">
                                          <div id="first-name" className="input-wrapper">
                                                <label htmlFor="first">First*</label>
                                                      <br/>
                                                <input type="text" id="first" name="name" required={false} onBlur={requiredValidator}/>
                                          </div>
                                          <div id="last-name" className="input-wrapper">
                                                <label htmlFor="last">Last*</label>
                                                      <br/>
                                                <input type="text" id="last" name="name" required={false}/>
                                          </div>
                                    </div>
                              </div>
                              <div id="address-section" className="form-section">
                                    <div className="form-section">
                                          <h4 className="section-title">Address*</h4>
                                          <div className="section-inputs">
                                                <div className="input-wrapper">
                                                      <label htmlFor="address" style={{display:'none'}}>Address*</label>
                                                      <input type="text" id="address" name="address" required={false}/>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                              <div>
                                    <div>
                                          <label htmlFor="birth"><h4>Birth Date*</h4></label>
                                          <input type="date" id="birth" name="birth" required={false}/>
                                    </div>
                                    <div>
                                          <label htmlFor="gender"><h4>Gender*</h4></label>
                                          <input type="text" id="gender" name="gender" required={false}/>
                                    </div>
                              </div>
                              <div>
                                    <div>
                                          <h4>Phone*</h4>
                                          <label htmlFor="phone">xxx-xxx-xxxx</label>
                                                <br/>
                                          <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required={false}/>
                                    </div>
                                    <div>
                                          <label htmlFor="gender"><h4>Gender*</h4></label>
                                          <input type="text" id="gender" name="gender" required={false}/>
                                    </div>
                              </div>
                              <div>
                                    <div>
                                          <label htmlFor="leave-message">Is it okay to leave a message?</label>
                                                <br/>
                                          <input type="text" id="leave-message" name="leave-message" required={false}/>
                                    </div>
                                    <div>
                                          <label htmlFor="relationship"><h4>Relationship Status*</h4></label>
                                                {/* <br/> */}
                                          <select type="text" id="relationship" name="relationship" required={false}>
                                                <option></option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                                <option value="Divorced / Separated">Divorced / Separated</option>
                                                <option value="Widowed / Widower">Widowed / Widower</option>
                                          </select>
                                    </div>
                              </div>
                              <div>
                                    <label htmlFor="filled-out-by"><h4>Application filled out by*</h4></label>
                                          {/* <br/> */}
                                    <select type="text" id="filled-out-by" name="filled-out-by" required={false}>
                                          <option></option>
                                          <option value="Patient">Patient</option>
                                          <option value="Friend">Friend</option>
                                          <option value="Relative">Relative</option>
                                          <option value="Social Worker">Social Worker</option>
                                          <option value="Health Care Professional">Health Care Professional</option>
                                    </select>
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

                              {(stepNum===5)?"":
                              <button className="action-button" onClick={(totalSteps===stepNum)?submitData:incrementStep}>
                                    {(totalSteps===stepNum)?"submit":"next"}
                              </button>
                              }
                        </div>
                  
                  
                  </div>
            </Modal>

      )
}
export default PatientIntakeForm