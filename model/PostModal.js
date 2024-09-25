const mongoose=require('mongoose');

const postschemma=new mongoose.Schema({
    id:String,
    user:String,
    caption:Array,
    imageurl:String,
    Likes:Number,
    following:Boolean
});

const postmodal=mongoose.model("posts",postschemma);

module.exports=postmodal;