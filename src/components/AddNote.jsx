import "./styles/Note.css";
import "./styles/Add-note.css";
import { useState } from "react";

const AddNote = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState("");
  const remainingLimit = 200;
  const handleChange = (event) => {
    if (remainingLimit - event.target.value.length >= 0)
      setNoteText(event.target.value);
  };
  const handleSave = () => {
    if (noteText.trim().length > 0)
      //.trim() will remover unnecessary white spaces.
      handleAddNote(noteText); //passing noteText as arg
    setNoteText("");
  };
  return (
    <div className="new-note">
      <textarea
        rows="8"
        cols="10"
        placeholder="Type to add a note..."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className="new-note-footer">
        <div>{remainingLimit - noteText.length} remaining</div>
        <div className="save" onClick={handleSave}>
          Save
        </div>
      </div>
    </div>
  );
};

export default AddNote;
