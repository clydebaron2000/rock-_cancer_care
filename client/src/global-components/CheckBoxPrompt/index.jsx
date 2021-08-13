import { useState } from "react";
// import { v4 as uuid } from "uuid"
import "../../css/checkbox.css"
import devConsole from "../../utils/devConsole"
function CheckboxPrompt(props) {
    const {inputProps}=props
    const [value, setValue] = useState(props?.options?.map(val=>props.value?.indexOf?.(val)>-1) || props?.options.map(_=>false))
    function createEventForParent(e,value){
        let parentEvent = {...e,target:{}}
        parentEvent.preventDefault=()=>{}
        devConsole.log(value)
        parentEvent.target.name = props?.name
        delete parentEvent.target.value
        if (props?.options.length===1)
            parentEvent.target.value = (value[0])?(value[0]):null
        else 
            parentEvent.target.value=props?.options?.filter?.((_,i)=>value[i])
        devConsole.log("parent value:",parentEvent.target.value)
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
                return(
            <div className="checkbox-wrapper" key={i}>
                <input
                    id={option}
                    props={inputProps}
                    type="checkbox"
                    value={option}
                    name={props.name}
                    onChange={onChange}
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
