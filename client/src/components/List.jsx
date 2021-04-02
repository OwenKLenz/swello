import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import AllCards from "./AllCards";
import { updateListTitle } from "../actions/ListActions";
import { createCard, moveCard } from "../actions/CardActions";
import { useDrop } from "react-dnd";
import * as itemTypes from '../constants/itemTypes';
import PositionCalculator from "../lib/positionCalculator";

const List = ({ listInfo, setActiveList, currentActiveList }) => {
  const dispatch = useDispatch();
  const [editingMode, toggleEditingMode] = useState(false);
  let cards = useSelector(state => state.cards)
  const editList = useInput(listInfo.title);
  const editCard = useInput("");

  const [{canDrop, isOver}, dropRef] = useDrop(() => ({
    accept: itemTypes.CARD,
    drop: (item, monitor) => {
      const newPosition =  PositionCalculator(cards, cards.length)
      dispatch(moveCard(item, listInfo, newPosition))
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }), [listInfo, dispatch]);

  const updateTitle = () => {
    dispatch(updateListTitle(editList.value, listInfo._id, () => {
      toggleEditingMode(false);
      editList.reset();
    }))
  }

  const handleAddCard = (e) => {
    e.preventDefault();
    const items = cards.filter(card => card.listId === listInfo._id)

    let position =PositionCalculator(items, items.length)
    console.log("this is the items", items);
    let card = {title: editCard.value, boardId: listInfo.boardId, position};
    let newCard = { listId: listInfo._id, card };
    console.log(newCard);
    const reset = () => {
      editCard.reset();
      setActiveList("")
    }
    dispatch(createCard(newCard, reset));
  }

  // function selectBackgroundColor(isDragActive, canDrop) {
  //   if (isDragActive) {
  //     return 'darkgreen';
  //   }
  //   else if (canDrop) {
  //     return 'darkkhaki';
  //   }
  //   else {
  //     return '#222';
  //   }
  // }
  // const isDragActive = canDrop && isOver;
  // const backgroundColor = selectBackgroundColor(isDragActive, canDrop);

  const isActive = currentActiveList === listInfo._id;

  return (
    <div className={"list-wrapper" + (isActive ? " add-dropdown-active" : "")}>
      <div className="list-background">
        <div className="list" ref={dropRef} >
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {editingMode ?
              <input
                className="list-title"
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
            <div className={"add-dropdown add-bottom" + (isActive ? " active-card" : "")}>
              <div className="card">
                <div className="card-info"></div>
                <textarea name="add-card" {...editCard.bind}></textarea>
                <div className="members"></div>
              </div>
            <a onClick={handleAddCard}className="button">Add</a>
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
