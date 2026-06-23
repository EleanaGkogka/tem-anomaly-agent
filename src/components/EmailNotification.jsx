import { Sparkles } from 'lucide-react'
import './EmailNotification.css'

export default function EmailNotification({ onNavigate }) {
  return (
    <div className="email-page">
      <div className="email-topbar">
        📧 Email received — 09 June, 08:47
      </div>

      <div className="email-container">
        {/* Header */}
        <div className="email-header">
          <div className="email-header-brand">
            <span className="email-wordmark">RED</span>
            <span className="email-wordmark-tm">™</span>
          </div>
          <p className="email-subject-line">We noticed something at your Bath site</p>
        </div>

        {/* Agent indicator */}
        <div className="agent-indicator">
          <Sparkles size={12} strokeWidth={1.75} />
          <span>RED™ Agent</span>
        </div>

        {/* Body */}
        <div className="email-body">
          <h1 className="email-headline">
            Your Bath site is using more energy than usual
          </h1>

          <p className="email-para">
            We've been monitoring your sites and noticed that Bath has used <strong>34% more energy than normal</strong> this week — that's around <strong>720 kWh</strong> above its usual pattern.
          </p>

          <p className="email-para">
            If this continues, it could add roughly <strong>£87</strong> to this month's bill. It might be nothing — but it's worth a quick look.
          </p>

          <p className="email-para">
            We've already started investigating. Here's what we found.
          </p>

          <button
            className="email-cta"
            onClick={() => onNavigate('insights/anomaly/bath-june-2025')}
          >
            See what we found →
          </button>
        </div>

        {/* Footer */}
        <div className="email-footer">
          <p>
            You're receiving this because you manage <strong>The Anchor Hotels</strong> account on RED™.{' '}
            <a href="#" className="email-footer-link">Manage notification preferences.</a>
          </p>
        </div>
      </div>
    </div>
  )
}
