import React, { useState } from 'react';
import "./NoteForm.css"

const NoteForm = ({ notes, setNotes,fetchNotes }) => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    category: 'Others',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, category } = formState;
    if (!title || !description) {
        alert('Title and description are required!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, category })
        });

        if (!response.ok) {
            throw new Error('Failed to add note');
        }

        fetchNotes();
        setFormState({ title: '', description: '', category: 'Work' }); 
    } catch (error) {
        alert('Error: ' + error.message);
        console.error('Error creating note:', error.message);
    }
};
    
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    console.log(formState); 
  };
  

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <input
        type="text"
        name="title"
        value={formState.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={formState.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <select name="category" value={formState.category} onChange={handleChange}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Others">Others</option>
      </select>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;


// import React, { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// const NoteForm = ({ notes, setNotes }) => {
//   const [formState, setFormState] = useState({
//     title: '',
//     description: '',
//     category: 'Work',
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { title, description, category } = formState;
//     if (!title || !description) {
//       alert('Title and description are required!');
//       return;
//     }

//     setNotes([
//       { id: uuidv4(), ...formState, created_at: new Date() },
//       ...notes,
//     ]);
//     setFormState({ title: '', description: '', category: 'Work' });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormState({ ...formState, [name]: value });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input 
//         type="text" 
//         name="title" 
//         value={formState.title} 
//         onChange={handleChange} 
//         placeholder="Title" 
//         required 
//       />
//       <textarea 
//         name="description" 
//         value={formState.description} 
//         onChange={handleChange} 
//         placeholder="Description" 
//         required 
//       />
//       <select name="category" value={formState.category} onChange={handleChange}>
//         <option value="Work">Work</option>
//         <option value="Personal">Personal</option>
//         <option value="Others">Others</option>
//       </select>
//       <button type="submit">Add Note</button>
//     </form>
//   );
// };

// export default NoteForm;
