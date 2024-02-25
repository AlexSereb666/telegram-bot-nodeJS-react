import React, { useEffect, useState } from "react";
import "./MessageBox.css";

const MessageBox = ({ message, onYes, onNo, textNo, textYes, check, inputValue, setInputValue }) => {
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {check ? (<p>{message}</p>) : (<input value={inputValue} onChange={handleInputChange}></input>)}
        <div className="modal-buttons">
          <button onClick={onNo}>{textNo}</button>
          <button onClick={onYes}>{textYes}</button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
