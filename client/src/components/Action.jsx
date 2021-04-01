import React from 'react';

const Action = ({action}) => {

return (
  <li>
    <div className="member-container">
      <div className="card-member small-size">VR</div>
    </div>
    <p>
      <span className="member-name">Victor Reyes</span>{action.description}<small>{action.createdAt}</small>
    </p>
</li>
)
}

export default Action