import React from 'react';

import './thisUserProfile.css';

const thisUserProfile = props => (
    <div>
    <p>Your Profile</p>
      <h1>{props.authUserId}</h1>
      <p>
        ${props.userId}
      </p>
      <p>
        ${props.name}
      </p>
      <p>
        ${props.username}
      </p>
      <p>
        ${props.email}
      </p>
      <p>
        ${props.dob}
      </p>
      <p>
        ${props.address}
      </p>
      <p>
        ${props.phone}
      </p>
      <p>
        ${props.socialMedia}
      </p>
    </div>
);

export default thisUserProfile;
