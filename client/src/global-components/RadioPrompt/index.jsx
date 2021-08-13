import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"
import "../../css/radio.css"
import devConsole from "../../utils/devConsole"
function RadioPrompt(props) {
    // const {key,type,id,onChange,required,name}=props
    // const [choice, setChoice] = useState("")
    const [choice, setChoice] = useState(props?.value||"")
    const [text, setText] = useState(null)
    useEffect(_=>{
        // devConsole.log(`radio ${props.name} choice: ${choice} props.value: ${props?.value}`)
    },[choice]) 
    return (
        // <> 
            <div
                className="radio-box horizontal"
                role="radiogroup"
            >
                {props.options.map((option, i) => {
                    const id= uuid().slice(0,10)
                    return <div className="radio-wrapper" key={i}>
                        <input
                            key={uuid().slice(0,10)}
                            type="radio"
                            id={id}
                            value={option}
                            name={props.name}
                            onFocus={
                                (e)=>{
                                    setChoice(e.target.value)
                                    props?.onChange?.(e)
                                }
                            }
                            onChange={(e)=>{
                                setChoice(e.target.value)
                                console.log(option)
                                devConsole.log(e.target.value)
                                console.log(e.target)
                                devConsole.log(choice)
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
                        />
                        <label key={i} htmlFor={id}>
                            {option !== "other" ? (
                                option
                            ) : (
                                <input
                                    type="text"
                                    disabled={choice !== "other"}
                                    autoFocus={(text !== null || text !=="") && choice === "other"}
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
                })}
            </div>
        // </>
    )
}
export default RadioPrompt
