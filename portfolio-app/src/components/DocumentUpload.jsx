import { useState, useEffect, useRef } from 'react';
import './DocumentUpload.css';

const API_URL = 'https://portfolio-1-utvd.onrender.com';

const DocumentUpload = ({ onClose }) => {
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch(`${API_URL}/documents`);
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch {
      setMessage({ type: 'error', text: 'Could not connect to AI backend. Make sure it\'s running.' });
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;
    const allowed = ['.pdf', '.txt', '.md'];
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowed.includes(ext)) {
      setMessage({ type: 'error', text: 'Only PDF, TXT, and MD files are allowed.' });
      return;
    }

    setUploading(true);
    setMessage(null);
    const formData = new FormData();
    formData.append('document', file);

    try {
      const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        fetchDocuments();
      } else {
        setMessage({ type: 'error', text: data.error || 'Upload failed' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to upload. Is the AI backend running?' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename) => {
    try {
      const res = await fetch(`${API_URL}/documents/${encodeURIComponent(filename)}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Document deleted.' });
        fetchDocuments();
      }
    } catch {
      setMessage({ type: 'error', text: 'Delete failed.' });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="doc-upload-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="doc-upload-panel glass-panel">
        <div className="doc-upload-header">
          <div>
            <h2>AI Knowledge Base</h2>
            <p>Upload documents so the AI can answer questions about yourself</p>
          </div>
          <button className="doc-close-btn" onClick={onClose} aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Drop zone */}
        <div
          className={`doc-drop-zone ${dragOver ? 'drag-over' : ''} ${uploading ? 'uploading' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.md"
            style={{ display: 'none' }}
            onChange={(e) => handleUpload(e.target.files[0])}
          />
          {uploading ? (
            <>
              <div className="doc-spinner" />
              <p>Uploading & processing...</p>
            </>
          ) : (
            <>
              <div className="doc-upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <p><strong>Drop files here</strong> or click to browse</p>
              <span>PDF, TXT, MD — up to 10MB</span>
            </>
          )}
        </div>

        {/* Message */}
        {message && (
          <div className={`doc-message ${message.type}`}>
            {message.type === 'success' ? '✓' : '⚠'} {message.text}
          </div>
        )}

        {/* Document list */}
        <div className="doc-list-section">
          <h3>Uploaded Documents ({documents.length})</h3>
          {documents.length === 0 ? (
            <div className="doc-empty">
              <p>No documents uploaded yet. Upload your resume and certifications!</p>
            </div>
          ) : (
            <ul className="doc-list">
              {documents.map((doc) => (
                <li key={doc.name} className="doc-item">
                  <div className="doc-icon">
                    {doc.originalName.endsWith('.pdf') ? '📄' : '📝'}
                  </div>
                  <div className="doc-info">
                    <span className="doc-name">{doc.originalName}</span>
                    <span className="doc-size">{formatSize(doc.size)}</span>
                  </div>
                  <button
                    className="doc-delete-btn"
                    onClick={() => handleDelete(doc.name)}
                    aria-label="Delete document"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                      <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="doc-footer">
          <span>💡 The AI already knows your resume, skills & GitHub projects by default</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
