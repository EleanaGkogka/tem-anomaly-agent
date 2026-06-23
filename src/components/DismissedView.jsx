import { CheckCircle, Sparkles, ArrowLeft } from 'lucide-react'
import './DismissedView.css'

export default function DismissedView({ onBack }) {
  return (
    <div className="dismissed-page">
      <button className="anomaly-back" onClick={onBack}>
        <ArrowLeft size={14} strokeWidth={2} />
        Insights
      </button>

      <div className="dismissed-content">
        <CheckCircle size={48} strokeWidth={1.5} color="rgb(255,63,16)" />

        <h1 className="dismissed-headline">Got it — anomaly dismissed</h1>
        <p className="dismissed-sub">Bath site · 3–9 June 2025</p>

        <div className="agent-narrative">
          <div className="agent-narrative-header">
            <Sparkles size={12} strokeWidth={1.75} />
            <span>RED™ Agent</span>
          </div>
          <p>
            We've noted this as an expected variation. We'll keep monitoring Bath and let you know
            if the pattern continues or a new anomaly appears.
          </p>
        </div>

        <p className="dismissed-footnote">
          The Insights badge has been cleared. You can find this record under Bath site → June 2025.
        </p>

        <button className="guided-answer-btn dismissed-cta" onClick={onBack}>
          Back to Insights
        </button>
      </div>
    </div>
  )
}
