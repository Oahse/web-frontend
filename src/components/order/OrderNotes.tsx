import React, { useState } from 'react';
import { format } from 'date-fns';

interface OrderNote {
  id: string;
  user_id: string;
  note: string;
  attachments?: string[];
  created_at: string;
}

interface OrderNotesProps {
  orderId: string;
  notes: OrderNote[];
  onAddNote?: (note: string, attachments?: File[]) => void;
  editable?: boolean;
}

const OrderNotes: React.FC<OrderNotesProps> = ({
  notes,
  onAddNote,
  editable = false
}) => {
  const [newNote, setNewNote] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !onAddNote) return;

    setIsSubmitting(true);
    try {
      await onAddNote(newNote.trim(), attachments.length > 0 ? attachments : undefined);
      setNewNote('');
      setAttachments([]);
    } catch (error) {
      console.error('Failed to add note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Order Notes</h3>
        <span className="text-sm text-gray-500">{notes.length} notes</span>
      </div>

      {/* Add new note form */}
      {editable && onAddNote && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                Add a note
              </label>
              <textarea
                id="note"
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your note here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            {/* File attachments */}
            <div>
              <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-2">
                Attachments (optional)
              </label>
              <input
                type="file"
                id="attachments"
                multiple
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
              
              {/* Show selected files */}
              {attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded px-3 py-2 text-sm">
                      <span className="text-gray-700">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700"
                        disabled={isSubmitting}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newNote.trim() || isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Adding...' : 'Add Note'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Notes list */}
      <div className="space-y-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {note.user_id.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">User {note.user_id.slice(-8)}</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(note.created_at), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-700 whitespace-pre-wrap mb-3">
                {note.note}
              </div>

              {/* Attachments */}
              {note.attachments && note.attachments.length > 0 && (
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    Attachments ({note.attachments.length})
                  </p>
                  <div className="space-y-1">
                    {note.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        📎 {attachment.split('/').pop() || `Attachment ${index + 1}`}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📝</div>
            <p>No notes added yet</p>
            {editable && (
              <p className="text-sm mt-1">Add the first note using the form above</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderNotes;