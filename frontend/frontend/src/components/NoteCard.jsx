const NoteCard = ({note, onEdit, onDelete}) => {
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short', day:'numeric', year:'numeric'
        });
    };

    return (
        <div className="glass rounded-2xl p-5 group hover:bg-white/12 transition-all duration-300 hover:scale-[1.02] over:shadow-xl">
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-white font-semibold text-base leading-tight line-clamp-2 flex-1 pr-2">
                    {note.title}
                </h3>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(note)}
                    className="p-1.5 rounded-lg hover:bg-white/15 text-white/60 hover:text-white transition-all">
                        {/*Edit icon*/}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                         </svg>
                    </button>
                <button onClick={() => onDelete(note.id)}
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-300 transition-all">
                    {/*Delete icon*/}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1
                   1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      {note.content && (
        <p className="text-white/50 text-sm line-clamp-3 mb-3">{note.content}</p>
      )}
      <p className="text-white/30 text-xs">{formatDate(note.updated_at)}</p>
    </div>
  );
};

export default NoteCard;
