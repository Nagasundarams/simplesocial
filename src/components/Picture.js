// src/components/Picture.js
import React,{useState} from 'react';
import User from './user';

const Picture = ({ picture, onLike }) => {
    const [followedUsers, setFollowedUsers] = useState([]);
    const handleFollow = (userId) => {
        setFollowedUsers([...followedUsers, userId]);
      };
    
      const handleUnfollow = (userId) => {
        setFollowedUsers(followedUsers.filter(id => id !== userId));
      };
  return (
    <div className="picture">
      
      <img src={picture.imageurl} alt="Posted" />
      <div>
        <button onClick={() => onLike(picture._id)}>Like</button>
        {picture.caption.length>1 && picture.caption.map((hastag,i)=><p key={i} className='hastag'>#{hastag}</p>)}
      </div>
    </div>
  );
};

export default Picture;
