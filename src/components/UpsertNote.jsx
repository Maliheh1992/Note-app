import { useState } from "react";
import "../assets/css/UpsertNote.css";
import { v4 as getId } from "uuid";

const UpsertNote = ({ setOpen, createNote, updateNote, note }) => {
  const [title, setTitle] = useState(note ? note.title : "");
  const [desc, setDesc] = useState(note ? note.desc : "");

  const clearInput = () => {
    setTitle("");
    setDesc("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (note) {
      // update note
      updateNote({
        ...note,
        title,
        desc,
      });
    } else {
      // create note
      createNote({
        id: getId(),
        title,
        desc,
        createAt: new Date().toDateString(),
      });
    }
    clearInput();
    setOpen(false);
  };


  return (
    <div className="upsert-note">
      <div className="upsert-wrapper">
        <div className="upsert-header">
          <h2 className="heading">{note ? "Update Note" : "Add Note"}</h2>
          <div className="close-btn" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        <form className="upsert-form" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Title"
            className="input-form"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="textarea-form"
            placeholder="Enter your note"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="upsert-actions">
            <button className="clear-btn">Clear</button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpsertNote;
