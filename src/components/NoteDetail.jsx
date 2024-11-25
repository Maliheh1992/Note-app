import "../assets/css/noteDetail.css";

const NoteDetail = ({ setView, note }) => {
  return (
    <div className="note-details">
      <div className="details-wrapper">
        <div className="details-back-btn" onClick={() => setView(false)}>
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <h2 className="details-title">{note.title}</h2>
        <span className="details-timeline">{note.createAt}</span>
        <div className="details-body">
          <p>
            {note.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
