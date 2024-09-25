// src/components/PictureForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PictureForm = ({ onPicturePosted }) => {
  const [url, setUrl] = useState('');
  const [hashtags, setHashtags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const hastag=hashtags.split(',').map(tag => tag.trim())
    const newPicture = {
      id: Date.now(),
      imageurl:url,
      caption: hastag,
      Likes: 0,
    
    };
    axios.post("http://localhost:3001/create",{id:Date.now(),imageurl:url,caption:hastag,Likes:0,user:"me"}).then((result)=>console.log(result)).catch((err)=>console.log(err))
    
    onPicturePosted(newPicture);
    setUrl('');
    setHashtags('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Image URL"
        required
      />
      <input
        type="text"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
        placeholder="Hashtags (comma separated)"
      />
      <button type="submit">Post Picture</button>
      <Link to='/NewsFeed'><button>Newsfeed</button></Link>
    </form>
  );
};

export default PictureForm;
