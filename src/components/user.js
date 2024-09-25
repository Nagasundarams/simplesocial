// src/components/User.js
import React,{useState} from 'react';

const User = ({user,onFollow, onUnfollow, isFollowing }) => {
     
  return (
    <div className="user">
      <span>{user.username}</span>
      {isFollowing ? (
        <button onClick={() => onUnfollow(user.id)}>Unfollow</button>
      ) : (
        <button onClick={() => onFollow(user.id)}>Follow</button>
      )}
    </div>
  );
};

export default User;
