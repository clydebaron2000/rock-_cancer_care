import { useState } from "react";
// import devConsole from "../../utils/devConsole";
import CreatableSelect from 'react-select/creatable';
import '../../css/multiSelect.css'
function MultiSelect(props){
    const options = props?.options?.map(option => {return {label: option, value: option}})
    const [gvalue,setValue]=useState()
    function onChange(val){
        // console.log(val)
        let value = val?.map?.(obj=>obj.value)
        if (value === undefined) value = val.value
        if (value !== undefined) setValue(value)
        let e={target:{},preventDefault:()=>{}}
        e.target.value=value
        e.target.name=props?.name
        // console.log(e)
        props?.onChange(e)
    }
    function onBlur(event){
        // console.log(gvalue)
        let e={target:{},preventDefault:()=>{}}
        e.target.value=gvalue
        e.target.name=props?.name
        // console.log(e)
        // console.log(e.target.value)
        props?.onBlur(e)
    }
    return (
         <CreatableSelect
            className={props.className}
            classNamePrefix={props.className}
            value={props?.value?.map?.(value=>{return{label:value,value:value}})}
            isMulti={props?.isMulti}
            onChange={onChange}
            onBlur={onBlur}
            options={options}
            styles={
                {
                    // menuList:()=>({
                    //     // 'z-index':1,
                    //     // 'height':"300 px"
                    // })
                }
            }
            
      />
    )
}
export default MultiSelect