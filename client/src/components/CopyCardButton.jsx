import React from "react";

export default ({setPopover}) => {
  const handleLabelButtonClick = (e) => {
    setPopover({
      visible: true,
      attachedTo: e.target,
      type: "copy-card"
    })
  }

  return (
    <li className="copy-button" onClick={handleLabelButtonClick}>
      <i className="card-icon sm-icon"></i>Copy
    </li>
  )
}