// src/App.js
import React, { useState } from 'react';
import Picture from './components/Picture';
import PictureForm from './components/pictureform';
import User from './components/user';
import{BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';
import NewsFeed from './components/Newsfeed';
import axios from 'axios';

const App = () => {
  const [pictures, setPictures] = useState([]);
  const[likeupdate,setLikeupdate]=useState(0);

  const handlePicturePosted = (newPicture) => {
    setPictures([newPicture, ...pictures]);
  };

  const handleLike = (id) => {
        
    axios.get('http://localhost:3001/getuser/'+id)
    .then(result=>{
        setLikeupdate(()=>likeupdate+1);
        axios.put("http://localhost:3001/getuser/"+id,{Likes:result.data.Likes+1}).catch((err)=>console.log(err));
        setPictures(prevPosts => 
            prevPosts.map(picture => 
                picture.id === id ? { ...picture, Likes: picture.Likes + 1 } : picture
            )
        );

    }).catch(err=>console.error(err));

    
    
};

 

  return (<>
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<div className="app">
      <h1>Simple Social</h1>
      <PictureForm onPicturePosted={handlePicturePosted} />
      
    
      
      <h2>Pictures</h2>
      {pictures.map(picture => (
        <Picture key={picture.id} picture={picture} onLike={handleLike} />
      ))}
    </div>}></Route>
      <Route path='/NewsFeed' element={<NewsFeed/>}></Route>
    </Routes>
    </BrowserRouter>
    
    </>
  );
};

export default App;
