import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInput } from '../hooks/useInput';
import List from './List';
import { createList } from "../actions/ListActions";

const AllLists = ({ boardId }) => {
  const newListInput = useInput("");
  const [ newListSelected, setNewListSelected ] = useState(false);
  const dispatch = useDispatch();

  const submitList = () => {
    if (newListInput.value.length === 0) {
      return
    }

    const list = {
      boardId,
      list: {
        title: newListInput.value,
      }
    }

    dispatch(createList(list, () => {
      newListInput.reset();
      setNewListSelected(false);
    }));
  }
  console.log(useSelector((s) => s))
  const lists = useSelector(({lists}) => lists.filter((list) => list.boardId === boardId ));
  return (
    <React.Fragment>
      <div id="existing-lists" className="existing-lists">
        {lists.map(list => <List key={list._id} listInfo={list}/>)}
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
