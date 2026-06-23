import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import MessageManagerModal from './MessageManagerModal'
import './GuidedConversation.css'

export default function GuidedConversation({ onDone }) {
  const [step, setStep] = useState(1) // 1, '2a', '2b', 'resolved'
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="guided-conversation">

      {/* Step indicator */}
      {step !== 'resolved' && (
        <div className="guided-step-indicator">
          {step === 1 && <span>Step 1 of 2</span>}
          {step === '2a' && <span>Step 2 of 2</span>}
          {step === '2b' && <span>Step 2 of 2</span>}
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="guided-step">
          <div className="agent-narrative">
            <div className="agent-narrative-header">
              <Sparkles size={12} strokeWidth={1.75} />
              <span>RED™ Agent</span>
            </div>
            <p>
              We noticed something unusual at your Bath site this week. Heating appears to have been
              running overnight — between 23:00 and 05:00 — every night since Tuesday 3 June. That
              window accounts for most of the extra 720 kWh.
            </p>
          </div>

          <p className="guided-question">Does this match anything you're aware of at the Bath site?</p>

          <div className="guided-answer-row">
            <button
              className="guided-answer-btn"
              onClick={() => setStep('2b')}
            >
              Yes, that explains it
            </button>
            <button
              className="guided-answer-btn"
              onClick={() => setStep('2a')}
            >
              No, nothing I know of
            </button>
          </div>

          <p className="guided-hint">Your answer helps us decide the next step.</p>
        </div>
      )}

      {/* STEP 2A — user said No */}
      {step === '2a' && (
        <div className="guided-step">
          <div className="agent-narrative">
            <div className="agent-narrative-header">
              <Sparkles size={12} strokeWidth={1.75} />
              <span>RED™ Agent</span>
            </div>
            <p>
              Understood. The most likely cause is an HVAC scheduling issue — but your site manager
              would know for sure. It might be worth a quick check before we escalate.
            </p>
          </div>

          <p className="guided-question">Would you like us to draft a message to your Bath site manager?</p>

          <div className="guided-answer-row">
            <button
              className="action-btn action-btn--primary guided-answer-btn--primary"
              onClick={() => setShowModal(true)}
            >
              Yes, draft a message
            </button>
            <button
              className="guided-answer-btn"
              onClick={() => setStep('resolved')}
            >
              I'll handle it myself
            </button>
          </div>
        </div>
      )}

      {/* RESOLVED — user chose to handle it themselves */}
      {step === 'resolved' && (
        <div className="guided-step">
          <div className="agent-narrative">
            <div className="agent-narrative-header">
              <Sparkles size={12} strokeWidth={1.75} />
              <span>RED™ Agent</span>
            </div>
            <p>
              Understood — we'll leave this with you. If the issue continues into next week we'll flag it again automatically.
            </p>
          </div>

          <p className="guided-hint">Need to revisit this? It's saved under Insights → Bath site → June 2025.</p>

          <div className="guided-done-row">
            <button className="guided-answer-btn" style={{ flex: 'unset', minWidth: 160 }} onClick={onDone}>
              Back to Insights
            </button>
          </div>
        </div>
      )}

      {/* STEP 2B — user said Yes */}
      {step === '2b' && (
        <div className="guided-step">
          <div className="agent-narrative">
            <div className="agent-narrative-header">
              <Sparkles size={12} strokeWidth={1.75} />
              <span>RED™ Agent</span>
            </div>
            <p>
              Got it — good to know. We'll note this as an expected variation and keep monitoring
              Bath. If the pattern continues beyond this week we'll flag it again.
            </p>
          </div>

          <div className="guided-done-row">
            <button className="action-btn action-btn--primary" onClick={onDone}>
              Done
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <MessageManagerModal
          onClose={() => setShowModal(false)}
          onSend={() => { setShowModal(false); onDone() }}
        />
      )}
    </div>
  )
}
