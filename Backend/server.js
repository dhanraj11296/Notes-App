const express=require("express")
const mongoose=require("mongoose")
const app=express()

app.use(express.json())
const cors = require('cors');
app.use(cors());


mongoose.connect("mongodb://localhost:27017/mern-app")
.then(()=>{
    console.log("DB Connected!")
})
.catch((err)=>{
    console.log(err)
})

//Creating Schema
const notesSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        default:"Others",
    }
})

//Creating Model
const notesModel=mongoose.model("Notes",notesSchema)

//POST
app.post("/notes", async (req, res) => {
    const { title, description, category } = req.body;
    try {
        const newNotes = new notesModel({ title, description, category });
        await newNotes.save();
        res.status(201).json(newNotes); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

//GET
app.get("/notes",async(req,res)=>{
    try{
        const notes=await notesModel.find()
        res.json(notes)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error.message})    
    }
})

//PUT
app.put("/notes/:id",async(req,res)=>{
    try{
        const {title,description}=req.body 
        const id=req.params.id 
        const updatedNotes=await notesModel.findByIdAndUpdate(
            id,
            {title,description,category},
            {new:true}
        )
        if(!updatedNotes){
            return res.status(404).json({message:"Notes not found"})
        }
        res.json(updatedNotes)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error.message})          
    }
})

//DELETE
app.delete("/notes/:id",async(req,res)=>{
    try{
        const id=req.params.id 
        await notesModel.findByIdAndDelete(id)
        res.status(204).end()
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error.message})           
    }
})

const port=3000;
app.listen(port,()=>{
    console.log("Server is listening to port"+port)

})


//1.POST
// let notes=[]
// app.post("/notes",(req,res)=>{
//     const {title,description}=req.body 
//     const newNotes={
//         id:notes.length+1,
//         title,
//         description
//     }
//     notes.push(newNotes)
//     console.log(notes)
//     res.status(201).json(newNotes)
// })


//2.GET
// app.get("/notes",(req,res)=>{
//     res.send(notes)
// })





