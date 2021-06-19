import React,{useState,Fragment} from 'react'
import { v4 as uuidv4 } from 'uuid'
// import '../../css/hero.css';
function RadioPrompt (props){
    const [choice,setChoice]=useState({})
    function onChange(event){
        setChoice(event.target.value)
        props.choice([props.name, event.target.value])
    }
    return (
        <Fragment>
            <p>{props.question}</p>
            <div className="button-box horizontal">
                {(props.options).map(option=>
                    <Fragment>
                        <input 
                            key={uuidv4()}
                            type="radio" 
                            id={option} 
                            value={option} 
                            name={props.name}
                            onChange={onChange}  
                            checked={choice === option}
                            required={props.required} /> 
                        <label htmlFor={option}>
                            {option}
                        </label>
                    </Fragment>
                )}
            </div>
        </Fragment>
    )
}
export default RadioPrompt;