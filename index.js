const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const postmodal=require('./model/PostModal.js');


const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://snagasundaram3:123@cluster0.kvexk.mongodb.net/social?retryWrites=true&w=majority&appName=Cluster0");

app.post('/create',(req,res)=>{
    postmodal.create(req.body).then((user)=>res.json(user)).catch((err)=>res.json(err))
})

app.get('/',(req,res)=>{
    postmodal.find({}).then((user)=>res.json(user)).catch((err)=>res.json(err))
})

app.get('/getuser/:id',(req,res)=>{
    const id=req.params.id;
    postmodal.findById({_id:id}).then((user)=>res.json(user)).catch((err)=>res.json(err))
})

app.put('/getuser/:id',(req,res)=>{
    const id=req.params.id;
    postmodal.findByIdAndUpdate({_id:id},{Likes:req.body.Likes}).then((user)=>res.json(user)).catch((err)=>res.json(err))
})


app.get('/follow/:id',(req,res)=>{
    const id=req.params.id;
    postmodal.findById({_id:id}).then((user)=>res.json(user)).catch((err)=>res.json(err))
})

app.put('/follow/:id',(req,res)=>{
    const id=req.params.id;
    postmodal.findByIdAndUpdate({_id:id},{following:req.body.following}).then((user)=>res.json(user)).catch((err)=>res.json(err))
})


app.listen(3001,()=>{
    console.log("server is running");
    
})