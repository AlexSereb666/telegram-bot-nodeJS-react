import React from "react";
import InputMask from "react-input-mask";
import './CustomInput.css';

const CustomInput = (props) => {
    return (
        <div className="input-group">
            <InputMask
                className="input-group__input"
                mask={props.mask}
                onChange={(event) => props.setValue(event.target.value)}
                type={props.type} 
                value={props.value}  
                required={props.required}
                max={props.max}
                min={props.min}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
            />
            <label className="input-group__label">{props.label}</label>
        </div>
    );
};

export default CustomInput;
