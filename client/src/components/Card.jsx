import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDrag } from "react-dnd";
import * as itemTypes from '../constants/itemTypes';

const Card = ({ cardInfo }) => {
  const [{opacity}, dragRef] = useDrag(() => ({
    type: itemTypes.CARD,
    item: {...cardInfo},
    end(item, monitor) {
      const dropResult = monitor.getDropResult()

    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    })
  }), [cardInfo]);
  const calculateDueness = (dueDate) => {
    const dueDateDays = Date.parse(dueDate) / (1000 * 60 * 60 * 24);
    const nowDays = Date.now() / (1000 * 60 * 60 * 24);
    const dateDifference = dueDateDays - nowDays;

    if (dateDifference < 0) {
      return "overdue";
    } else if (dateDifference > 0) {
      return "due-soon";
    }

    return "overdue-recent";
  }

  const dueDateDiv = () => {
    return (
      <i className={"clock-icon sm-icon " + calculateDueness(cardInfo.dueDate)}>
          {moment(cardInfo.dueDate).format("MMM D")}
      </i>
    )
  }

  return (
    <div className="card-background">
      <Link to={`/cards/${cardInfo._id}`}>
        <div className="card " ref={dragRef} style={{opacity}}>
          <i className="edit-toggle edit-icon sm-icon"></i>
          <div className="card-info">
            {/* <div className="card-label green colorblindable"></div>
            <div className="card-label yellow colorblindable"></div>
            <div className="card-label red colorblindable"></div>
            <div className="card-label orange colorblindable"></div>
            <div className="card-label blue colorblindable"></div>
            <div className="card-label purple colorblindable"></div> */}
            {
              cardInfo.labels.map(label => {
                const labelClass = `card-label ${label} colorblindable`;
                return <div key={label} className={labelClass}></div>;
              }
              )
            }
            <p>
              {cardInfo.title}
            </p>
          </div>
          <div className="card-icons">
            { dueDateDiv()
            }
            <i className="description-icon sm-icon"></i>
            <i className="comment-icon sm-icon"></i>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;