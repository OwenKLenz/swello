import React from "react";

const DueDateButton = ({setPopover}) => {
  const handleDueDateButtonClick = (e) => {
    setPopover({
      visible: true,
      attachedTo: e.target,
      type: "due-date"
    })
  }

  return (
    <li className="date-button" onClick={handleDueDateButtonClick}>
      <i className="clock-icon sm-icon" ></i>Due Date
    </li>
  )
}

export default DueDateButton;