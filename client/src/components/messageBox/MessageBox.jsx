import React, { useEffect, useState } from "react";
import "./MessageBox.css";
import CustomInput from '../customInput/CustomInput'

const MessageBox = ({ message, onYes, onNo, textNo, textYes, check, inputValue, setInputValue }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {check 
        ? (<p>{message}</p>) 
        : (<CustomInput 
          value={inputValue} 
          setValue={setInputValue} 
          label={"Введите адрес..."}
          type="text"
        />)}
        <div className="modal-buttons">
          <button onClick={onNo}>{textNo}</button>
          <button onClick={onYes}>{textYes}</button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
