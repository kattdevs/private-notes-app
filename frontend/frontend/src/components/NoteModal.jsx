import { useState, useEffect } from 'react';

const NoteModal = ({ note, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (note) { setTitle(note.title); setContent(note.content || ''); }
    else { setTitle(''); setContent(''); }
  }, [note]);

  const handleSave = async () => {
    if (!title.trim()) return;
    setLoading(true);
    await onSave(title.trim(), content.trim());
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg glass rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-semibold text-lg">
            {note ? 'Edit Note' : 'New Note'}
            </h2>
          <button onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/15 text-white/60 hover:text-white transition-all">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Note title..."
            className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white
              placeholder-white/30 focus:outline-none focus:border-white/30 transition-all text-base font-medium" />
          <textarea value={content} onChange={e => setContent(e.target.value)}
            placeholder="Write your note here..." rows={8}
            className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white
              placeholder-white/30 focus:outline-none focus:border-white/30 transition-all resize-none text-sm" />
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/15 text-white/60 hover:text-white
              hover:bg-white/8 transition-all text-sm">
            Cancel
          </button>
          <button onClick={handleSave} disabled={!title.trim() || loading}
            className="flex-1 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-medium
              border border-white/20 transition-all text-sm disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Note'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;

