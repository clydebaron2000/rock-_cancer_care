import React, { useState, useEffect, Fragment as div } from "react"
// import { v4 as uuid } from "uuid"
import "../../css/checkbox.css"
function CheckboxPrompt(props) {
    const {inputProps}=props
    const [value, setValue] = useState(props?.options.map(_=>false))
    useEffect(_=>{
        // console.log("EFFECT")
        // console.log(value)
    },[value,])
    function createEventForParent(e,value){
        let parentEvent = {...e}
        parentEvent.preventDefault=()=>{}
        parentEvent.target.name = props?.name
        parentEvent.target.value = props?.options.filter((_,i) => value[i])
        if (props?.options.length===1)
            parentEvent.target.value = value[0]
        props?.onChange?.(parentEvent)
    }
    function onChange(e){
        let temp = [...value]
        let i = props.options.indexOf(e.target.value)
        // console.log(i)
        temp[i] = !temp[i] 
        setValue(temp)
        createEventForParent(e,temp)
    }
    return (
        <div
            className="checkbox-box horizontal"
        >
            { props?.options.map((option, i) => {
                // const onChange=(e)=>{
                //     let temp = value
                //     temp[i] = !temp[i] 
                //     // e.target.checked= temp[i] 
                //     console.log(temp)
                //     // createEventForParent(e,temp)
                //     setValue(temp)
                // }
                return(
            <div className="checkbox-wrapper" key={i}>
                <input
                    id={option}
                    props={inputProps}
                    type="checkbox"
                    value={option}
                    name={props.name}
                    onChange={(e)=>onChange(e)}
                    required={props.required}
                    checked={value[i]}
                />
                <label htmlFor={option}>
                    {option}
                </label>
            </div>
        )})}
        </div>
    )
}
export default CheckboxPrompt
