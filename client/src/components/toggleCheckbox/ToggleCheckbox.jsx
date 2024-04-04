// ToggleCheckbox.js
import React from 'react';
import './ToggleCheckbox.css';

const ToggleCheckbox = (props) => {
    return (
        <div className="toggle-checkbox">
            <label className="toggle-checkbox__label">
                <input
                    type="checkbox"
                    checked={props.checked}
                    onChange={props.onToggle}
                    className="toggle-checkbox__input"
                />
                <span className="toggle-checkbox__slider" />
            </label>
            <span className="toggle-checkbox__text">{props.label}</span>
        </div>
    );
};

export default ToggleCheckbox;
