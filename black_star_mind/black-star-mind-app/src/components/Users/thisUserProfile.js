import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './thisUserProfile.css';

const thisUserProfile = (props) => {
  const {...user} = props.user;
  console.log("should be user object name..." + user.name);
  console.log("should be user object id..." + user._id);
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{props.authUserId}</Card.Title>
      <h2>{user.name}</h2>}
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the card's content.
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
  );
}

export default thisUserProfile;
