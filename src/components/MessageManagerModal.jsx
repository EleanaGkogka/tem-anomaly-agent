import { useState } from 'react'
import { X } from 'lucide-react'
import './MessageManagerModal.css'

const DRAFT = `Hi James,

I wanted to flag something our energy platform picked up this week. The Bath site used significantly more energy than usual — around 34% above the normal weekly pattern.

The data suggests heating zones 2 and 3 have been active between 23:00 and 05:00 every night this week, which is outside normal operating hours. This overnight activity accounts for most of the excess.

Could you check whether the HVAC system has been left running overnight, or whether there's been any unusual activity at the site? Happy to share the full report if helpful.

Thanks,

Sarah`

function wordCount(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

export default function MessageManagerModal({ onClose, onSend }) {
  const [body, setBody] = useState(DRAFT)

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">

        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Message site manager</h2>
            <p className="modal-subtitle">RED™ has drafted this based on what we found. Review and edit before sending.</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Recipient */}
        <div className="modal-field">
          <span className="modal-field-label">To</span>
          <div className="modal-field-value">
            <span className="modal-recipient-name">James Whitfield — Bath Site Manager</span>
            <span className="modal-email-badge">james.whitfield@anchorhotels.co.uk</span>
          </div>
        </div>

        {/* Subject */}
        <div className="modal-field">
          <span className="modal-field-label">Subject</span>
          <div className="modal-field-value">
            <span>Energy query — Bath site, week of 3 June</span>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body-wrap">
          <textarea
            className="modal-textarea"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            spellCheck={false}
          />
          <span className="modal-word-count">{wordCount(body)} words</span>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="action-btn action-btn--primary modal-send-btn" onClick={onSend}>
            Send message
          </button>
          <button className="modal-cancel-link" onClick={onClose}>Cancel</button>
        </div>

      </div>
    </div>
  )
}
