import React, { useState } from "react"
import { v4 as uuid } from "uuid"
import "../../css/radio.css"
function RadioPrompt(props) {
    const {key,type,id,onChange,required,name,...otherProps}=props
    const [choice, setChoice] = useState("")
    const [text, setText] = useState(null)
    return (
        // <>
            <div
                className="radio-box horizontal"
                role="radiogroup"
                // value={value !== "other" ? value : `other:${value}`}
                // onChange={props.onChange}
                // onBlur={props.onBlur}
            >
                {props.options.map((option, i) => (
                    <div className="radio-wrapper" key={i}>
                        <input
                            key={uuid()}
                            type="radio"
                            id={option}
                            value={option}
                            name={props.name}
                            onFocus={
                                (e)=>{
                                    setChoice(e.target.value)
                                    // console.log(e.target.value)
                                    props?.onChange?.(e)
                                }
                            }
                            onChange={(e)=>{
                                setChoice(e.target.value)
                                // console.log(e.target.value)
                                props?.onChange?.(e)
                            }}
                            onBlur={(e)=>{
                                setChoice(e.target.value)
                                // console.log(e.target.value)
                                props?.onBlur?.(e)
                            }}
                            tabIndex={choice === "" ? 0 : choice === option ? 0 : -1}
                            checked={choice === option}
                            autoFocus={(choice === option && (text === "" || text === null)) || choice === null}
                            required={props.required}
                            {...otherProps}
                        />
                        <label key={i} htmlFor={option}>
                            {option !== "other" ? (
                                option
                            ) : (
                                <input
                                    type="text"
                                    disabled={choice !== "other"}
                                    autoFocus={text !== null}
                                    onChange={(e)=>{
                                        setText(e.target.value)
                                        // console.log(e.target.value)
                                        props?.onChange?.(e)
                                    }}
                                    onBlur={(e)=>{
                                        setText(e.target.value)
                                        // console.log(e.target.value)
                                        props?.onBlur?.(e)
                                    }}
                                    placeholder="other"
                                />
                            )}
                        </label>
                    </div>
                ))}
            </div>
        // </>
    )
}
export default RadioPrompt
