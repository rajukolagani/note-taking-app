import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchNotes, createNote, deleteNote } from '../services/api';
import './NotesPage.css';

// Define the shape of a single note
interface Note {
  _id: string;
  title: string;
  content: string;
}

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user, logout } = useAuth();

  // Fetch notes when the component loads
  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetchNotes();
        setNotes(response.data);
      } catch (error) {
        console.error('Failed to fetch notes', error);
      }
    };
    getNotes();
  }, []);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createNote({ title, content });
      setNotes([...notes, response.data]); // Add the new note to the list
      setTitle(''); // Clear the form
      setContent('');
    } catch (error) {
      console.error('Failed to create note', error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      // Remove the deleted note from the local list
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Failed to delete note', error);
    }
  };

  return (
    <div className="notes-page">
      <header className="notes-header">
        <h1>Welcome, {user?.result?.name}</h1>
        <button onClick={logout} className="logout-button">Logout</button>
      </header>

      <div className="notes-container">
        <div className="note-form-container">
          <form onSubmit={handleCreateNote} className="note-form">
            <h2>Create a New Note</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
            <button type="submit">Create Note</button>
          </form>
        </div>

        <div className="notes-list-container">
          <h2>Your Notes</h2>
          <div className="notes-list">
            {notes.length > 0 ? (
              notes.map((note) => (
                <div key={note._id} className="note-card">
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <button onClick={() => handleDeleteNote(note._id)} className="delete-button">
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>You have no notes yet. Create one!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;