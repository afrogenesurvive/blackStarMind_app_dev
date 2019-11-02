import React from 'react';

import UserItem from './UserItem/UserItem';
import './UserList.css';

const userList = props => {
  const users = props.users.map(user => {
    return (
      <UserItem
        key={user._id}
        name={user.name}
        username={user.username}
        email={user.email}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="user__list">{users}</ul>;
};

export default userList;
