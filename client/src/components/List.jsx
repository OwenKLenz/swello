import React, { useState } from "react";
import AllCards from "./AllCards";

const List = ({ listInfo }) => {
  const [editingMode, toggleEditingMode] = useState(false);

  return (
    <div className="list-wrapper">
          <div className="list-background">
            <div className="list">
              <a className="more-icon sm-icon" href=""></a>
              <div>
                <p className="list-title">{listInfo.title}</p>
              </div>
              <div className="add-dropdown add-top">
              <div className="card"></div>
                <a className="button">Add</a>
                <i className="x-icon icon"></i>
                <div className="add-options">
                  <span>...</span>
                </div>
              </div>
              <AllCards listId={listInfo._id}/>
            </div>
          </div>
        </div>
  );
}

export default List;