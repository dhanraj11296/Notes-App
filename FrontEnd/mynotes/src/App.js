import React, { useState } from 'react';
import HomePage from './components/HomePage';
import "./App.css"

const App = () => {
  const [notes, setNotes] = useState([]);
 return(
  <div className="container">
    <h1 className="main">My Notes App</h1>
   <HomePage notes={notes} setNotes={setNotes} />;
  </div>
)
};

export default App;
