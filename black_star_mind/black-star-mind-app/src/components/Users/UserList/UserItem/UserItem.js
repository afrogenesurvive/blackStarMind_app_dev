import React from 'react';

import './UserItem.css';

const userItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <h1>{props.name}</h1>
      <p>
        ${props.username}
      </p>
      <p>
        ${props.email}
      </p>
    </div>
  </li>
);

export default userItem;
