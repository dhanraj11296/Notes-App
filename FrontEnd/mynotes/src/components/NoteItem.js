import React, { useState } from 'react';
import "./NoteItem.css"

const NoteItem = ({ note, fetchNotes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/notes/${note._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedNote),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update note');
      }
  
      fetchNotes();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating note:', error.message);
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/notes/${note._id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
  
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };
  

  return (
    <>
    <div className="noteitemcontainer">
      {isEditing ? (
        <div className="noteItems">
          <input 
            type="text" 
            value={editedNote.title} 
            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
          />
          <textarea 
            value={editedNote.description} 
            onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
          />
          <select 
            value={editedNote.category} 
            onChange={(e) => setEditedNote({ ...editedNote, category: e.target.value })}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </select>
          <button onClick={handleSave} className="saveButton">Save</button>
        </div>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <span className="category">Category:{note.category}</span>
          <small>{new Date(note.created_at).toLocaleString()}</small>
        </>
      )}
      <button onClick={() => setIsEditing(!isEditing)} className="editButton">
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      <button onClick={handleDelete} className="deleteButton">Delete</button>
    </div>
    </>
  );
};

export default NoteItem;



// import React, { useState } from 'react';

// const NoteItem = ({ note, setNotes }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedNote, setEditedNote] = useState(note);

//   const handleEdit = () => setIsEditing(true);

//   const handleSave = () => {
//     setNotes(prev =>
//       prev.map(n => (n.id === note.id ? editedNote : n))
//     );
//     setIsEditing(false);
//   };

//   const handleDelete = () => {
//     setNotes(prev => prev.filter(n => n.id !== note.id));
//   };

//   return (
//     <div>
//       {isEditing ? (
//         <>
//           <input 
//             type="text" 
//             value={editedNote.title} 
//             onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
//           />
//           <textarea 
//             value={editedNote.description} 
//             onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
//           />
//           <select 
//             value={editedNote.category} 
//             onChange={(e) => setEditedNote({ ...editedNote, category: e.target.value })}
//           >
//             <option value="Work">Work</option>
//             <option value="Personal">Personal</option>
//             <option value="Others">Others</option>
//           </select>
//           <button onClick={handleSave}>Save</button>
//         </>
//       ) : (
//         <>
//           <h3>{note.title}</h3>
//           <p>{note.description}</p>
//           <span>{note.category}</span>
//           <small>{new Date(note.created_at).toLocaleString()}</small>
//         </>
//       )}
//       <button onClick={isEditing ? handleSave : handleEdit}>
//         {isEditing ? 'Save' : 'Edit'}
//       </button>
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// };

// export default NoteItem;
