import Note from "../models/Note.js"

export async function getAllNotes(req,res){
    try {
        const notes = await Note.find().sort({createdAt:-1})// give newest one 
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllNotes controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}


export async function createNote(req,res)  {
     try {
        const {title, content} = req.body
        const newNote = new Note({title, content})

        const savenote = await newNote.save()
         res.status(201).json(savenote)
     } catch (error) {
        console.error("Error in getAllNotes controller",error)
        res.status(500).json({message:"Internal server error"})
     }
 }

export async function updateNote (req,res) {
     try {
        const {title,content} = req.body
       const updateNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new: true,})
       if(!updateNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json(updateNote)
     } catch (error) {
         console.error("Error in getAllNotes controller",error)
        res.status(500).json({message:"Internal server error"})
     }
 }

 export async function deleteNote (req,res) {
     try {
       const deleteNote = await Note.findByIdAndDelete(req.params.id)
       if(!deleteNote) return res.status(404).json({message:"Note not found"})
       res.status(200).json({message:"Note deleted successfully"})
     } catch (error) {
         console.error("Error in getAllNotes controller",error)
        res.status(500).json({message:"Internal server error"})
     }
 }

  export async function getNoteById (req,res) {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message:"Note not found"})
        res.status(200).json(note)
    } catch (error) {
        console.error("Error in getAllNotes controller",error)
        res.status(500).json({message:"Internal server error"})
     }
    }

// mongodb://localhost:27017/
// mongodb+srv://uniquesarfaroj:uibZjmWiiqpjjLNu@cluster0.6fzlmz0.mongodb.net/