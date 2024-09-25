import axios from "axios";
import { useEffect, useState } from "react";
import Picture from "./Picture";

const NewsFeed=()=>{

    const [post,setPost]=useState([]);
    const[likeupdate,setLikeupdate]=useState({likecount:0,click:false});

    useEffect(()=>{
        axios.get('http://localhost:3001/').then(result=>setPost(result.data)).catch(err=>console.error(err));
        
    },[])

    const handleLike = (id) => {
        
        axios.get('http://localhost:3001/getuser/'+id)
        .then(result=>{
            setLikeupdate(()=>likeupdate.likecount+1,true);
            axios.put("http://localhost:3001/getuser/"+id,{Likes:result.data.Likes+1}).catch((err)=>console.log(err));
            setPost(prevPosts => 
                prevPosts.map(picture => 
                    picture.id === id ? { ...picture, Likes: picture.Likes + 1 } : picture
                )
            );

        }).catch(err=>console.error(err));

        
        
    };

    const handleFollow=(id)=>{
        axios.get('http://localhost:3001/follow/'+id)
        .then(result=>{
        
            axios.put("http://localhost:3001/follow/"+id,{following:!result.data.following}).catch((err)=>console.log(err));
            

        }).catch(err=>console.error(err));


    }
    

    
    return(<div className="newsfeed">
        {post.map((item)=>
            <div className="picture">
            <h3>{item.user}</h3>
            {item.user!=="me" && <button  onClick={handleFollow(item._id)}>{item.following ? "Unfollow":"Follow"}</button>}
            <img src={item.imageurl} alt="Posted" />
            <div>
              {!likeupdate.click && <button onClick={() => handleLike(item._id) }>Like</button>}
              {item.caption.length>1 && item.caption.map((hastag,i)=><p key={i} className='hastag'>#{hastag}</p>)}
            </div>
          </div>
        )}
        
    </div>)
}
export default NewsFeed;