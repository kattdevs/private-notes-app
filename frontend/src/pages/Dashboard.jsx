import { useState, useEffect } from 'react';
import { notesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import Layout from '../components/Layout';

const Dashboard = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchNotes(); }, []);

  const fetchNotes = async () => {
    try {
      const res = await notesAPI.getAll();
      setNotes(res.data.notes);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSave = async (title, content) => {
    try {
      if (editingNote) {
        const res = await notesAPI.update(editingNote.id, title, content);
        setNotes(prev => prev.map(n => n.id === editingNote.id ? res.data.note : n));
      } else {
        const res = await notesAPI.create(title, content);
        setNotes(prev => [res.data.note, ...prev]);
      }
      closeModal();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await notesAPI.delete(id);
      setNotes(prev => prev.filter(n => n.id !== id));
    } catch (err) { console.error(err); }
  };

    const openEdit = (note) => { setEditingNote(note); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditingNote(null); };

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    (n.content && n.content.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Notes</h1>
            <p className="text-white/40 text-sm mt-1">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </p>
          </div>

          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25
              text-white font-medium border border-white/20 transition-all hover:scale-[1.03]">
            <span className="text-lg">+</span> New Note
          </button>
        </div>

        {/* Search bar */}
        {notes.length > 0 && (
          <div className="mb-6">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="w-full max-w-sm px-4 py-2.5 rounded-xl glass border border-white/10
                text-white placeholder-white/30 focus:outline-none focus:border-white/30 text-sm" />
          </div>
        )}

        {/* Notes grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-white/40">
              {search ? 'No notes match your search.' : 'No notes yet. Create your first one!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(note => (
              <NoteCard key={note.id} note={note} onEdit={openEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <NoteModal note={editingNote} onSave={handleSave} onClose={closeModal} />
      )}
    </Layout>
  );
};

export default Dashboard;

