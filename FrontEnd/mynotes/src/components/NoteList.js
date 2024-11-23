import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, fetchNotes }) => {
  return (
    <div>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} fetchNotes={fetchNotes} />
      ))}
    </div>
  );
};

export default NoteList;


// import React from 'react';
// import NoteItem from './NoteItem';

// const NoteList = ({ notes, setNotes }) => {
//   return (
//     <div>
//       {notes.map(note => (
//         <NoteItem key={note.id} note={note} setNotes={setNotes} />
//       ))}
//     </div>
//   );
// };

// export default NoteList;
