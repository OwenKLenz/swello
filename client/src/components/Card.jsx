import React from 'react';
import { Link } from "react-router-dom";

// url is /boards/:id
// url is /cards/:id
// must dispatch only if boardId is defined.
const Card = ({ cardInfo }) => {

  const dueDateDiv = () => {
    // let dueDateClass = "";

    return (
      <i className="clock-icon sm-icon overdue-recent completed">
          {new Date(cardInfo.dueDate).toDateString()}
      </i>
    )
  }
  return (
    <div className="card-background">
      <Link to={`/cards/${cardInfo._id}`}>
        <div className="card ">
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