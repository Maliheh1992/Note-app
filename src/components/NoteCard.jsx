import "../assets/css/noteCart.css";

const NoteCard = ({ onPreview, note, onUpdate, onDelete }) => {

  return (
    <div className="note-card">
      <div className="note-card-wrapper">
        <h2 className="card-title" onClick={() => onPreview(note)}>
          {note.title}
        </h2>
        <div className="card-body">
          <p>{note.desc}</p>
        </div>
        <span className="card-details" onClick={() => onPreview(note)}>
          read more
        </span>
        <div className="card-footer">
          <span className="card-timeline">{note.createAt}</span>
          <div className="card-actions">
            <div className="action-item" onClick={() => onUpdate(note)}>
              <i className="fa-regular fa-pen-to-square edit"></i>
            </div>
            <div className="action-item" onClick={() => onDelete(note.id)}>
              <i className="fa-solid fa-trash-can delete"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;


