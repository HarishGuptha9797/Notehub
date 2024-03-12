import { useState } from "react";
import "./styles/Add-note.css";
const EditNote = ({ text, id, handleSaveNote, setOpen }) => {
  const [noteText, setNoteText] = useState(text);
  const remainingLimit = 200 - noteText.length;
  const handleChange = (event) => {
    setNoteText(event.target.value);
  };

  const saveChanges = () => {
    //console.log(noteText)
    if (noteText.trim().length > 0)
      //.trim() will remover unnecessary white spaces.
      handleSaveNote(noteText, id);
    setNoteText("");
    setOpen(false);
  };

  return (
    <div className="new-note" style={{ backgroundColor: "aqua" }}>
      <textarea
        rows="8"
        cols="10"
        placeholder="Type to add a note..."
        value={noteText}
        onChange={handleChange}
        style={{ backgroundColor: "aqua", color: "black" }}
      ></textarea>
      <div className="new-note-footer">
        <div>{remainingLimit - noteText.length} remaining</div>
        <div className="save" onClick={saveChanges}>
          Save Changes
        </div>
      </div>
    </div>
  );
};

export default EditNote;
