import {  PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'

import {Link} from 'react-router'
import { formatDate } from '../lib/utlis'
import api from '../lib/axios'
import { toast } from 'react-hot-toast'


export  const NoteCard = ({note,setNotes}) => {

  const handleDelete = async (e, noteId) => {
    e.preventDefault(); // get rid of the default link behavior
    if(!window.confirm("Are you sure you want to delete this note?")) 
      return;
      try {
        const res = await api.delete(`/notes/${noteId}`);
          toast.success("Note deleted successfully");
          setNotes((prevNotes) => prevNotes.filter((n) => n._id !== noteId));
      } catch (error){
        console.log("Error deleting note", error);
        toast.error("Failed to delete note, please try again later.");
        
      }
      
    
  }
  return (
    <Link
      to={`/note/${note._id}`}
      className="card  hover:shadow-lg transition-all duration-200 
     bg-base-200 transform hover:-translate-y-1"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
