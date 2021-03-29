import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import AllCards from "./AllCards";
import { updateListTitle } from "../actions/ListActions";

const List = ({ listInfo, setActiveList, currentActiveList }) => {
  const dispatch = useDispatch();
  const [editingMode, toggleEditingMode] = useState(false);

  const editList = useInput(listInfo.title);

  const updateTitle = () => {
    dispatch(updateListTitle(editList.value, listInfo._id, () => {
      toggleEditingMode(false);
      editList.reset();
    }))
  }
  const isActive = currentActiveList === listInfo._id;

  return (
    <div className={"list-wrapper" + (isActive ? " add-dropdown-active" : "")}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {editingMode ? 
              <input
                type="text" {...editList.bind}
                onBlur={updateTitle}
                onKeyUp={(e) => {
                  e.key === "Enter" && updateTitle();
                }}
              />
              :
              <p onClick={() => toggleEditingMode(!editingMode)}
                className="list-title">
                {listInfo.title}
              </p>}
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <AllCards listId={listInfo._id} />
          <div className={"add-dropdown add-bottom" + isActive ? " active-card" : ""}>
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon" onClick={() => setActiveList("")}></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div onClick={() => setActiveList(listInfo._id)}  className="add-card-toggle" data-position="bottom">
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
