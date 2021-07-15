import React, { useState,forwardRef } from "react"
import PhoneIn from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import '../../css/phone.css'

function PhoneInput(props) {
	const [value, setValue] = useState(null)
	// const {disableDropdown}=props 
	const disableDropdown=true 
	return (
		<div
			name="phoneWrapper"
			>
			<PhoneIn
				id={props.id}
				role="phone number input with country code"
				country={props.defaultCountry}
				name={props?.name}
				enableSearch={true}
				countryCodeEditable={true}
				disableDropdown={disableDropdown}//until we can figure out how to do it so it look proper
				value={value}
				inputClass={props.className}
				onChange={(value, country, e, formattedValue)=>{
					setValue(value)
					console.log(props.name);
					console.log(e.target.name)
					e.target.name=props?.name
					props?.onChange?.(e)
					}
				}
				onBlur={(e, country)=>{
					setValue(e.target.value)
					console.log(e.target.value)
					// console.log(e.target.value.length)
					props?.onBlur?.(e)
					}
				}
			/>
		</div>
	)
}
export default PhoneInput
