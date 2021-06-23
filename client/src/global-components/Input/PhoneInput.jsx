import React, { useState, useEffect } from "react"
import PhoneIn from "react-phone-number-input"
import "react-phone-number-input/style.css"
// import '../../css/phoneInput.css'
import "../../css/phone.css"

function PhoneInput(props) {
	const [value, setValue] = useState(null)
	useEffect(
		(_) => {
			props?.onValueChange(value)
		},
		[value, props]
	)
	// function retargetWrapper(event, fx) {
	// 	event.target = event.target.parentElement.parentElement
	// 	event.target.value = value
	// 	return fx(event)
	// }
	return (
		<div
			name="phoneWrapper"
			className={props.className}
			// onChange={(e) => retargetWrapper(e, props.onChange)}
			// onBlur={(e) => retargetWrapper(e, props.onBlur)}
			value={value}>
			<PhoneIn
				defaultCountry={props.defaultCountry}
				international={props.international}
				value={value}
				onChange={setValue}
			/>
		</div>
	)
}
export default PhoneInput
