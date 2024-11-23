import React, { useState, useEffect } from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import SearchBar from './SearchBar';
import "./HomePage.css"

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:3000/notes');
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const notesData = await response.json();
      setNotes(notesData);
    } catch (error) {
      console.error('Error fetching notes:', error.message);
    }
  };
  

  useEffect(() => {
    fetchNotes();
  }, []);
  

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    const matchesCategory = filterCategory ? note.category === filterCategory : true;
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });



  return (
    <div className="homeContainer">
      <SearchBar className="searchbarstyle"
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        setFilterCategory={setFilterCategory} 
      />
     <NoteForm fetchNotes={fetchNotes} notes={filteredNotes} />
     <NoteList notes={filteredNotes} fetchNotes={fetchNotes} />
    </div>
  );
};

export default HomePage;


// import React, { useState } from 'react';
// import NoteForm from './NoteForm';
// import NoteList from './NoteList';
// import SearchBar from './SearchBar';

// const HomePage = ({ notes, setNotes }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterCategory, setFilterCategory] = useState('');

//   const filteredNotes = notes.filter(note => {
//     const matchesCategory = filterCategory ? note.category === filterCategory : true;
//     const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <div>
//       <SearchBar 
//         searchQuery={searchQuery} 
//         setSearchQuery={setSearchQuery} 
//         setFilterCategory={setFilterCategory} 
//       />
//       <NoteForm notes={notes} setNotes={setNotes} />
//       <NoteList notes={filteredNotes} setNotes={setNotes} />
//     </div>
//   );
// };

// export default HomePage;
