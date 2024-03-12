import Note from "./Note";
import "./styles/Notes-List.css";
import AddNote from "./AddNote";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import EditNote from "./EditNote";
import { Timestamp } from "firebase/firestore";

const NotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  handleSaveNote,
}) => {
  const [open, setOpen] = useState(false);
  const [oldText, setOldText] = useState("");
  const [oldId, setOldId] = useState(0);
  const editNote = (text, id) => {
    setOpen(true);
    setOldText(text);
    setOldId(id);
  };
  return (
    <>
      <div className="notes-list">
        <AddNote handleAddNote={handleAddNote} />
        {notes.map((note) => {
          if (note.id !== 123456) {
            return (
              <Note
                key={note.id}
                id={note.id}
                text={note.text}
                date={note.date}
                handleDeleteNote={handleDeleteNote}
                handleEditNote={editNote}
              />
            );
          }
        })}
        <Dialog open={open} onClose={() => setOpen(false)} className="dialog">
          <div>
            <EditNote
              handleSaveNote={handleSaveNote}
              text={oldText}
              id={oldId}
              setOpen={setOpen}
            />
          </div>
        </Dialog>
        {open && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "gray",
              opacity: "0.2",
              zIndex: 1,
            }}
          ></div>
        )}
        <div className="edit-dialog"></div>
      </div>
    </>
  );
};

export default NotesList;
