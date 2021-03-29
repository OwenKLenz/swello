import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';

const AllCards = ({ listId }) => {

  const cards = useSelector(({ cards }) => cards.filter(card => card.listId === listId));

  return (
    <React.Fragment>
      {cards.map(card => {
        return <Card key={card._id} cardInfo={card}/>;
      })}
      <div className="add-dropdown add-bottom">
        <div className="card">
          <div className="card-info"></div>
          <textarea name="add-card"></textarea>
          <div className="members"></div>
        </div>
        <a className="button">Add</a>
        <i className="x-icon icon"></i>
        <div className="add-options">
          <span>...</span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AllCards;
