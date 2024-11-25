import { useContext, useEffect, useState } from "react";
import "./assets/css/App.css";
import NavBar from "./components/NavBar";
import NoteCard from "./components/NoteCard";
import NoteDetail from "./components/NoteDetail";
import UpsertNote from "./components/UpsertNote";
import { PaletteContext } from "./context/PalletteContext";

const palettes = [
  {
    id: 1,
    color: "#495aff",
    name: "blue-palette",
  },

  {
    id: 2,
    color: "#fcb69f",
    name: "rose-palette",
  },
  {
    id: 3,
    color: "#a18cd1",
    name: "violet-palette",
  },
  {
    id: 4,
    color: "#333",
    name: "black-palette",
  },
];

function App() {
  const { palette, changePalette } = useContext(PaletteContext);
  const [onCreateNote, setOnCreateNote] = useState(false);
  const [onViewNote, setOnViewNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNotes] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPalette, setCurrentPalette] = useState(
    palette
      ? palettes.find((p) => p.id === palette.id)
      : palettes[0]
  );
  let filteredNotes = [];

  useEffect(() => {
    const tempNotes = JSON.parse(localStorage.getItem("notes"));
    tempNotes && setNotes(tempNotes);
  }, []);

  const saveNotes = (items) => {
    localStorage.setItem("notes", JSON.stringify(items));
  };

  const handleCreateNote = (note) => {
    if (note) {
      const tempNotes = [...notes, note];
      setNotes(tempNotes);
      saveNotes(tempNotes);
    }
  };

  const handleOnUpdate = (note) => {
    setCurrentNotes(note);
    setOnCreateNote(true);
  };

  const handleUpdateNote = (note) => {
    if (note) {
      const tempNotes = [...notes.map((n) => (n.id === note.id ? note : n))];
      setNotes(tempNotes);
      setCurrentNotes(null);
      saveNotes(tempNotes);
    }
  };

  const handleDeleteNote = (noteId) => {
    const tempNotes = [...notes.filter((n) => n.id !== noteId)];
    setNotes(tempNotes);
    saveNotes(tempNotes);
  };

  const handleOnPreview = (note) => {
    setCurrentNotes(note);
    setOnViewNote(true);
  };

  if (search) {
    filteredNotes = [
      ...notes.filter(
        (n) =>
          n.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
          n.desc.toLowerCase().includes(search.toLocaleLowerCase())
      ),
    ];
  } else {
    filteredNotes = [...notes];
  }

  if (sortBy === "earliest")
    filteredNotes = [...filteredNotes].sort(
      (a, b) => new Date(a.createAt) - new Date(b.createAt)
    );

  if (sortBy === "latest")
    // eslint-disable-next-line no-unused-vars
    filteredNotes = [...filteredNotes].sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
    );

  return (
    <div
    className={`app ${currentPalette?.name || palette?.name || ""}`}
    >
      <NavBar
        setOpen={setOnCreateNote}
        notes={notes}
        sortBy={sortBy}
        onSort={(e) => setSortBy(e.target.value)}
        palette={palette}
        changePalette={changePalette}
        currentPalette={currentPalette}
        setCurrentPalette={setCurrentPalette}
        palettes={palettes}
      />
      <div className="wrapper container">
        <div className="search-wrapper">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="search-input"
            placeholder="Search"
          />
          <button className="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="notes-wrapper">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDeleteNote}
              onUpdate={handleOnUpdate}
              onPreview={handleOnPreview}
            />
          ))}
        </div>
        {onCreateNote && (
          <UpsertNote
            note={currentNote}
            createNote={handleCreateNote}
            updateNote={handleUpdateNote}
            setOpen={setOnCreateNote}
          />
        )}
        {onViewNote && (
          <NoteDetail note={currentNote} setView={setOnViewNote} />
        )}
      </div>
    </div>
  );
}
export default App;
