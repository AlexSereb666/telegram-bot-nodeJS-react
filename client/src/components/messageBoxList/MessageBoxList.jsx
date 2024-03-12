import React from "react";
import "./MessageBoxList.css";

const MessageBoxList = ({ list, onOk, textOk, flag = true }) => {
  const isEmpty = list === undefined || list.length === 0;

  const parseDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    
    return formattedDate;
  }

  return (
    <div className="modal-list">
      <div className="modal-content-list">
        {isEmpty ? (
          <div className="modal-content-list-empty">Список пуст</div>
        ) : (
          <div className="modal-list-sclore-bar">
            {list &&
              list.map((item, index) => (
                <div key={index} className="modal-content-list-container">
                  <div className="modal-content-list-container-title">
                    {index + 1}. {item.title}
                  </div>
                  <div className="modal-content-list-container-status">
                    {item.status}
                  </div>
                  <div className="modal-content-list-container-date">
                    {flag ? parseDate(String(item.date)) : item.date}
                  </div>
                </div>
            ))}
          </div>
        )}
        <div className="modal-buttons-list">
          <button onClick={onOk}>{textOk}</button>
        </div>
      </div>
    </div>
  );
};

export default MessageBoxList;