import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const LabelsPopover = ({ onCloseClick }) => {
  const colors = ["green", "yellow", "orange", "red", "purple", "blue"];
  const cardId = useParams().id;

  const cardLabels = useSelector(state => {
    return state.cards.find(card => card._id === cardId);
  }).labels;

  return (
    <div id="add-options-labels-dropdown" classList="popover labels">
      <header>
        <span>Labels</span>
        <a href="#" className="icon-sm icon-close" onClick={onCloseClick}></a>
      </header>
      <div className="content">
        <input
          className="dropdown-input"
          placeholder="Search labels..."
          type="text"
        />
        <div className="labels-search-results">
          <ul className="label-list">
            {colors.map(color => {
              return (
                <li>
                  <div className={color + " colorblindable data-id='1'"}>
                    <i className={cardLabels.includes(color) ? "check-icon " : "" + "sm-icon"}></i>
                  </div>
                  <div className={"label-background " + color}></div>
                  <div className="label-background-overlay"></div>
                  <i className="edit-icon icon not-implemented"></i>
                </li>
              )
            })}
          </ul>
          <ul className="light-list">
            <li className="not-implemented">Create a new label</li>
            <hr />
            <li className="toggleColorblind">
              Enable color blind friendly mode.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LabelsPopover;