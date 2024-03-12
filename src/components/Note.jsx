import "./styles/Note.css";
const Note = ({ id, text, date, handleDeleteNote, handleEditNote }) => {
  return (
    <div className="notes">
      <span>{text}</span>
      <div className="footer">
        <div className="date">{date}</div>
        <div style={{ display: "flex" }}>
          <div className="delete" onClick={() => handleEditNote(text, id)}>
            Edit
          </div>
          <div className="delete" onClick={() => handleDeleteNote(id)}>
            delete
          </div>
        </div>
      </div>
    </div>
  );
};
export default Note;
