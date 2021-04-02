import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInput } from '../hooks/useInput';
import List from './List';
import { createList } from "../actions/ListActions";
import { useDrop } from 'react-dnd';
import PositionCalculator from '../lib/positionCalculator';

const AllLists = ({ boardId }) => {
  const newListInput = useInput("");
  const [ newListSelected, setNewListSelected ] = useState(false);
  const [ activeList, setActiveList ] = useState("");

  const dispatch = useDispatch();

  const submitList = () => {
    if (newListInput.value.length === 0) {
      return
    }
    const position = PositionCalculator(lists, lists.length)
    console.log("these are the lists", lists)
    const list = {
      boardId,
      list: {
       title: newListInput.value,
       position
      }
    }

    dispatch(createList(list, () => {
      newListInput.reset();
      setNewListSelected(false);
    }));
  }

  const lists = useSelector(({lists}) => lists.filter((list) => list.boardId === boardId ));
  lists.sort((a, b) => a.position - b.position)

  return (
    <React.Fragment>
      <div id="existing-lists" className="existing-lists">
        {lists.map(list => {
          return (<List
            key={list._id}
            listInfo={list}
            setActiveList={(listId) => setActiveList(listId)}
            currentActiveList={activeList}
          />)
        })}
      </div>
      <div id="new-list" className={"new-list" + (newListSelected ? " selected" : "")} >
        <span onClick={() => setNewListSelected(!newListSelected)} >Add a list...</span>
        <input {...newListInput.bind} type="text" placeholder="Add a list..." />
        <div>
          <input
            type="submit"
            className="button"
            value="Save"
            onClick={submitList}
          />
          <i className="x-icon icon" onClick={() => setNewListSelected(false)}></i>
        </div>
      </div>
    </React.Fragment>
  )
};

export default AllLists;
