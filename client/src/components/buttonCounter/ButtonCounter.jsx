import React from 'react'
import './ButtonCounter.css'

const ButtonCounter = ({onClickMinus, onClickPlus}) => {
    return (
        <div className='button-counter-container'>
            <button className='button-counter-btn-minus' onClick={onClickMinus}>
                —
            </button>
            <button className='button-counter-btn-plus' onClick={onClickPlus}>
                +
            </button>
        </div>
    )
}

export default ButtonCounter
