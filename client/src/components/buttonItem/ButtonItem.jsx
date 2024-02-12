import React from 'react'
import './ButtonItem.css'

const ButtonItem = ({onClick, name}) => {
    return (
        <div className='button-item-container'>
            <button className='button-item-btn' onClick={onClick}>
                {name}
            </button>
        </div>
    )
}

export default ButtonItem
