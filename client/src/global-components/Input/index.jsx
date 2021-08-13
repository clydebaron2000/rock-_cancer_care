import React, { useState, useEffect, useCallback} from 'react'
// functions and other inputs
import { v4 as uuid } from 'uuid'
// import Autocomplete from "react-google-autocomplete"; // for addres autocompletion
// cusotm components
import RadioPrompt from '../RadioPrompt';
import PhoneInput from './PhoneInput';
import '../../css/inputs.css'
import MultiSelect from './MultiSelect'
import CheckboxPrompt from '../CheckBoxPrompt';
import devConsole from '../../utils/devConsole'

function Input(props) {
    // prop division to avoid usefEffect re-renders
    const id = props?.id || uuid()
    // const id = null
    const name = props.name
    const parentValidation=props?.parentValidation
    const displayNone=props?.displayNone
    const validate=props?.validate
    const required= props?.required
    // debugging variables
    // let debugName = ` for input `+props?.name
    // let debugName = ` for input `+id
    const [value, setValue] = useState(props?.value|| null) //value of the input group: d: null, value
    const [error_message, setErrorMessage] = useState(null)//d: null, error_message
    useEffect(_=>{
        // console.log("input effect")
        // console.log(value)
    },[value])
    // getting error message
    const getErrorFromValue = useCallback(
        (value) => {
            let err_msg = ""
            if (required !== undefined){
                // console.assert(!(value === null),"value === null"+name)
                // console.assert(!(value === ""),"value === \"\""+name)
                if (value === null || value === "" || value ===[]) err_msg = `${name} is required`
                else if (validate !== undefined) err_msg = validate(value)
                // console.assert(err_msg!==undefined,"err_msg === undefined"+debugName)
                if (err_msg === undefined) err_msg=""
                // console.assert(err_msg!=="","err_msg===''"+debugName)
                // return err_msg!==""
                setErrorMessage(err_msg)
                return err_msg
            } else return ""
        }, [name,validate,required]
    )
    
    function createEventForParent(event){
        let outputEvent=event
        const eventValue=event.target.value
        // console.assert(outputEvent!==null ,"outputEvent === null"+debugName)
        // console.assert(outputEvent!==undefined ,"outputEvent === undefined"+debugName)
        if (outputEvent === undefined) return null
        // console.assert(outputEvent?.target!==undefined,"outputEvent?.target===undefined"+debugName)
        if (outputEvent?.target === undefined) return null
        // console.assert(outputEvent?.target?.value!==undefined,"outputEvent?.target?.value===undefined"+debugName)
        if (outputEvent?.target?.value === undefined) return null
        // console.assert(eventValue!==undefined,"outputEvent?.target?.value===undefined"+debugName)
        if (props.type !== "select"){
            outputEvent.target.value = eventValue
        }
        return outputEvent
    }

    function onChange(e) {
        e?.preventDefault()
        // e.target.value=value
        devConsole.log("CHANGE", e.target.value)
        setValue(e.target.value)
        setErrorMessage(getErrorFromValue(e.target.value))
        let parentEvent = createEventForParent(e)
        // console.log("CHANGE", parentEvent?.target?.value)
        if (parentEvent !== null)
            props?.onChange?.(parentEvent)
    }

    function onBlur(e) {
        e?.preventDefault()
        e.target.value = value
        setErrorMessage(getErrorFromValue(value))
        // setValue(e.target.value)
        // console.log("BLUR",value)
        // console.log(e.target.value)
        let parentEvent=createEventForParent(e)
        // console.log(parentEvent.target.value)
        // console.log(parentEvent.target.value==="")
        // console.log(parentEvent.target.value===null)
        if (parentEvent !== null && parentEvent.target.value !== null)
            props?.onBlur?.(parentEvent)
    }

    useEffect(_=>{
        // console.assert(props?.displayNone!==true,"props?.displayNone===true"+debugName)
        // console.log("effect: " + value)
        if (displayNone !== true) {
            // console.assert(props?.parentValidation!==undefined,"props?.parentValidation===undefined"+debugName)
            parentValidation?.(name, value, getErrorFromValue, setErrorMessage)
        }
    },[value, getErrorFromValue, name, parentValidation, displayNone])
 
    function input_content(type) {
        // default input
        let input_element = (
            <input
                // {...props} 
                type={props.type}
                id={id}
                name={props.name}
                onChange={onChange}
                onBlur={onBlur}
                value={(value===null)?"":value}
                className={((error_message !== "" && error_message !== null) && props?.required === true) ? "error" : ""}
                placeholder={props.placeholder} 
            />
        )
        if (type === "select") {
            input_element = (
                <select
                    id={id}
                    name={props.name}
                    onChange={onChange}
                    value={(value===null)?"":value}
                    onBlur={onBlur}
                    className={((error_message !== "" && error_message !== null) && props?.required === true) ? "error" : ""}
                    placeholder={props.placeholder}
                >
                    {props.options.map((option, i) =>
                        <option key={i} value={option}>{option}</option>
                    )}
                </select>
            )
        } else if (type === "address") { // don't wanna use money yet :)
            // center_el=(
            //     <Autocomplete 
            //         apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            //         onPlaceSelected={(place) => {
            //             console.log(place);
            //         }}
            //         onChange={onChange}
            //         onBlur={onBlur}
            //     />
            // )
        } else if (type === "radio") {
            input_element = (
                <RadioPrompt
                    id={id}
                    question=""
                    value={value}
                    options={props.options}
                    name={props.name}
                    onBlur={onBlur}
                    onChange={onChange}
                    className={((error_message !== "" && error_message !== null) && props?.required === true) ? "error" : ""}
                />
            )
        } else if (type === "tel") {
            input_element = (
                <PhoneInput
                    value={value}
                    className={((error_message !== "" && error_message !== null) && props?.required === true) ? "error" : ""}
                    defaultCountry="US"
                    international={false}
                    name={props.name}
                    onBlur={onBlur}
                    onChange={onChange}
                />
            )
        } else if (type === "textarea"){
            input_element = (
                <textarea
                id={id}
                name={props.name}
                onChange={onChange}
                onBlur={onBlur}
                value={(value===null)?"":value}
                className={((error_message !== "" && error_message !== null) && props?.required === true) ? "error" : ""}
                placeholder={props.placeholder} 
                ></textarea>
            )
        } else if (type === "multi-select"){
            input_element = (
                <MultiSelect
                    id={id}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    isMulti={props?.isMulti}
                    name={props?.name}
                    className={((error_message !== "" && error_message !== null) && props?.required === true) ? "error" : ""}
                    options={props?.options}
                />
            )
        } else if (type === "checkbox"){
            input_element = (
                <CheckboxPrompt
                    id={id}
                    value={value}
                    options={props.options}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={props.name}
                    className={((error_message !== "" && error_message !== null) && props?.required === true) ? "error" : ""}
                />
            )
        }
        return input_element
    }

    // short circuit if none
    if (displayNone === true) return null
    return (
        <div className = "input-wrapper">
            <label htmlFor = {id}
                className = "input-label">
                {(props.required === true && typeof (props.header) === 'string') ? `${props.header}*` : props.header}
            </label>
            {input_content(props.type)}
            <div className = "input-error">
                {error_message}
            </div>
        </div>
    )
}
export default Input