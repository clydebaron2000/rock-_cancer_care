import React,{useState,useEffect} from 'react'
import "react-step-progress-bar/styles.css"
// import { v4 as uuid } from 'uuid'
import { ProgressBar, Step } from "react-step-progress-bar"
import '../../css/form.css'
function StepProgressBarGenerator(props){
      const [steps,setSteps]=useState(props.stepsCompleted)
      const [total,setTotal]=useState(props.totalSteps)
      useEffect(_=>{
            setSteps(props.stepsCompleted)
            setTotal(props.totalSteps)
      },[props,steps,total])
      return (
            <ProgressBar
                  percent={(steps)/(total-1)*100}
                  > 
            {[...Array(total).keys()].map((num,i)=>
                  <Step transition="scale" key={i} index={i} position={steps/(total-1)*100}>
                        {({ accomplished }) => (
                              <div className="step-container">
                                    <svg >
                                          <ellipse 
                                          // cx="20" cy="20" rx="15" ry="15" 
                                                className={`${accomplished ? "accomplished":"todo"}`}
                                          ></ellipse>
                                    </svg>
                                    <div className="label">{`${num+1}`}</div>
                              </div>
                        )}
                  </Step>
            )}
            </ProgressBar>
      )
}
export default StepProgressBarGenerator