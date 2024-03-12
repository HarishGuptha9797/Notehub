import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import NotesList from "./components/NotesList";
import "./components/styles/App.css";
import { useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  addtoDB,
  deletefromDB,
  getfromDB,
  updatetoDB,
} from "./firebase/FireStore";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 123456, //generate some unique ids
      text: "First Note..!",
      date: "25/02/2004",
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const authData = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        getfromDB(user.uid, notes, setNotes);
        //console.log(user.uid);
      }
    });
    return authData; // Clean up listener on unmount
  }, []);

  const [searchText, setSearchText] = useState("");

  const addNote = (text) => {
    //text is passing from AddNote.jsx
    const date = new Date();

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      addtoDB(user.uid, text, date.toLocaleDateString(), notes, setNotes);
    }
  };
  const deleteNote = async (id) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const newNotes = notes.filter((note) => {
      if (note.id !== id) {
        deletefromDB(user.uid, id);
        return note.id !== id;
      }
    });
    //arr which has this condition will not remove from array.)//filter is used to remove an element from array.
    setNotes(newNotes);
  };
  const editNote = (text, id) => {
    const auth = getAuth();
    const user = auth.currentUser;
    notes.map((note) => {
      if (note.id === id) {
        updatetoDB(user.uid, id, text);
        note.text = text;
      }
    });
    setNotes(notes);
  };
  const handleSignout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="container">
      <div className="header">
        <div>NOTEHUB</div>
        <button onClick={handleSignout}>Log Out</button>
      </div>
      <Search handleSearchNote={setSearchText} />
      <NotesList
        notes={notes.filter((note) => {
          return note.text.toLocaleLowerCase().includes(searchText);
        })}
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
        handleSaveNote={editNote}
      />
    </div>
  );
};

export default App;
