import React, { useState } from "react";
import LabelsPopover from "./LabelsPopover";

const LabelsButton = ({setPopover}) => {
  const handleLabelButtonClick = (e) => {
    setPopover({
      visible: true,
      attachedTo: e.target,
      type: "labels"
    })
  }

  return (
    <li className="label-button" onClick={handleLabelButtonClick}>
      <i className="label-icon sm-icon" ></i>Labels
    </li>
  )
}
export default LabelsButton;