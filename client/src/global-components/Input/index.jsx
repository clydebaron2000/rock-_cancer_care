import React, { useState, useEffect} from 'react'
import { v4 as uuid } from 'uuid'
// import Autocomplete from "react-google-autocomplete"; // for addres autocompletion
import RadioPrompt from '../RadioPrompt';
import '../../css/inputs.css'
import PhoneInput from './PhoneInput';
// here, we will consider text areas and selects as inputs
function Input(props) {
    const [id] = useState(uuid())
    const [value, setValue] = useState(null)
    const [isValid, setIsValid] = useState(true)
    const [error_message, setErrorMessage] = useState(null)
    function validate () {
        // console.log("validating",props.name,value)
        let err_msg = ""
        if (value === null){
            return (props.required)?err_msg = `${props.name} is required`:null
        }
        // console.log("checking",value)
        if ((props?.required !== undefined && value === "")) err_msg = `${props.name} is required`
        else if (props.validate !== undefined) err_msg = props?.validate(value)
        setErrorMessage(err_msg)
        setIsValid(err_msg === "")
        return (err_msg)
        }
    
    useEffect(_ => {
        // if (value !== null){
            props.updateEntry?.(props.name, value, validate, (err_msg)=>{
                setErrorMessage(err_msg)
                setIsValid(err_msg === "")
            })
        // }
    }, [value, error_message, props, validate])
    
    function onChange(e) {
        e.preventDefault()
        setValue(e.target.value)
        validate()
    }
    function onBlur(e) {
        onChange(e)
    }
    function onValueChange(val){
        setValue(val)
        validate()
    }
    function input_content(type) {
        let center_el = (
            <input type={props.type}
                id={id}
                name={props.name}
                onChange={onChange}
                onBlur={onBlur}
                className={(isValid === true && props?.required === true) ? "" : "error"}
                placeholder={props.placeholder} />
        )
        if (type === "select") {
            center_el = (
                <select
                    id={id}
                    name={props.name}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={(isValid === true) ? "" : "error"}
                    placeholder={props.placeholder}
                >
                    {props.options.map((option, i) =>
                        <option key={i} value={option}>{option}</option>
                    )}
                </select>
            )
        } else if (type === "address") { // dont wanna use monney yet :)
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
            center_el = (
                <RadioPrompt
                    question=""
                    options={props.options}
                    name={props.name}
                    className={(isValid === true && props?.required === true) ? "" : "error"}
                    onValueChange={onValueChange}
                />
            )
        } else if (type === "tel") {
            center_el = (
                <PhoneInput
                    className={(isValid === true && props?.required === true) ? "" : "error"}
                    defaultCountry="US"
                    international={false}
                    onValueChange={onValueChange}
                />
            )
        }
        return center_el
    }
    return (
        <div className="input-wrapper">
            <label htmlFor={id}
                className="input-label">
                {(props.required === true && typeof (props.header) === 'string') ? `${props.header}*` : props.header}
            </label>
            {input_content(props.type)}
            <div className="input-error">{error_message}</div>
        </div>
    )
}
export default Input