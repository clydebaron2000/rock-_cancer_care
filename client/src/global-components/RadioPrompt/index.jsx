import React, { useState, Fragment, useEffect } from "react"
import { v4 as uuid } from "uuid"
import "../../css/radio.css"
function RadioPrompt(props) {
    const [choice, setChoice] = useState(null)
    const [text, setText] = useState("")
    const [value, setValue] = useState("")
    // TODO INFINITE LOOP?
    useEffect(
        (_) => {
            if (choice !== "other") setText("")
            props?.onValueChange(choice)
        },
        [choice,props]
    )
    function onChange(event) {
        event.preventDefault()
        setChoice(event.target.value)
        updateValue(event)
        if (event.target.id === "other")
            setValue(event.target.nextElementSibling.value)
        updateChoice(event.target.parentElement)
    }
    function updateChoice(parent) {
        props?.onChange?.(parent)
    }
    function updateValue(e) {
        setValue(e.target.value)
    }
    return (
        <Fragment>
            <div
                className="radio-box horizontal"
                role="radiogroup"
                value={value !== "other" ? value : `other:${value}`}
                onChange={props.onChange}
                onBlur={props.onBlur}
            >
                {props.options.map((option, i) => (
                    <label key={i} htmlFor={option}>
                        <input
                            // role="radio"
                            key={uuid()}
                            type="radio"
                            id={option}
                            value={option}
                            name={props.name}
                            onChange={onChange}
                            tabIndex={choice === null ? 0 : choice === option ? 0 : -1}
                            checked={choice === option}
                            autoFocus={(choice === option && text === "") || choice === null}
                            required={props.required}
                        />
                        {option !== "other" ? (
                            option
                        ) : (
                            <input
                                type="text"
                                disabled={choice !== "other"}
                                autoFocus={text !== null}
                                onChange={(e) => {
                                    setText(e.target.value)
                                    updateValue(e)
                                }}
                                placeholder="other"
                            />
                        )}
                    </label>
                ))}
            </div>
        </Fragment>
    )
}
export default RadioPrompt
