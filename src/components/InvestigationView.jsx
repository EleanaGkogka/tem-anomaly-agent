import { useState, useRef } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ArrowLeft, Check, Sparkles, Loader, X } from 'lucide-react'
import MessageManagerModal from './MessageManagerModal'
import GuidedConversation from './GuidedConversation'
import './InvestigationView.css'

const LOG_STEPS = [
  {
    status: 'done',
    label: 'Pulled half-hourly meter data',
    result: '336 intervals analysed across Jun 3–9.',
  },
  {
    status: 'done',
    label: 'Compared against 4-week baseline',
    result: 'Deviation first appears at 23:10 on Tuesday 3 June.',
  },
  {
    status: 'done',
    label: 'Isolated overnight consumption window',
    result: '23:00–05:00 accounts for 412 kWh of the 720 kWh excess.',
  },
  {
    status: 'done',
    label: 'Cross-referenced site schedule',
    result: 'No scheduled overnight activity logged for this period.',
  },
  {
    status: 'active',
    label: 'Analysing overnight consumption pattern',
    result: 'Heating activity between 23:00–05:00 accounts for 412 kWh of the excess.',
  },
]

const overnightData = [
  { day: 'Tue 3',  daytime: 320, overnightNormal: 18, overnightAnom: 0 },
  { day: 'Wed 4',  daytime: 340, overnightNormal: 17, overnightAnom: 0 },
  { day: 'Thu 5',  daytime: 349, overnightNormal: 0,  overnightAnom: 128 },
  { day: 'Fri 6',  daytime: 339, overnightNormal: 0,  overnightAnom: 122 },
  { day: 'Sat 7',  daytime: 349, overnightNormal: 0,  overnightAnom: 134 },
  { day: 'Sun 8',  daytime: 361, overnightNormal: 0,  overnightAnom: 138 },
  { day: 'Mon 9',  daytime: 354, overnightNormal: 0,  overnightAnom: 130 },
]

const LABEL_MAP = {
  daytime: 'Daytime',
  overnightNormal: 'Normal overnight',
  overnightAnom: 'Anomalous overnight',
}

const COLOR_MAP = {
  daytime: '#3a3a3a',
  overnightNormal: '#555555',
  overnightAnom: 'rgb(255,63,16)',
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.filter(p => p.value > 0).map((p) => (
        <p key={p.dataKey} style={{ color: COLOR_MAP[p.dataKey] }}>
          {LABEL_MAP[p.dataKey]}: {p.value} kWh
        </p>
      ))}
    </div>
  )
}

export default function InvestigationView({ onBack, onNavigate, onDismiss }) {
  const [showModal, setShowModal] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [activeTab, setActiveTab] = useState('transparency')
  const pageRef = useRef(null)

  function handleSend() {
    setShowModal(false)
    setShowBanner(true)
    setTimeout(() => {
      const el = pageRef.current?.closest('.main-content')
      if (el) el.scrollTop = 0
    }, 0)
  }

  return (
    <div className="investigation-page" ref={pageRef}>

      {/* Confirmation banner */}
      {showBanner && (
        <div className="confirm-banner">
          <div className="confirm-banner-body">
            <div className="confirm-banner-icon">
              <Check size={12} strokeWidth={2.5} />
            </div>
            <div className="confirm-banner-main">
              <p className="confirm-banner-title">Message sent to James at Bath — 22 Jun, 11:47</p>
              <p className="confirm-banner-sub">We'll follow up with you in 48 hours if this hasn't been resolved.</p>
            </div>
            <button className="confirm-banner-close" onClick={() => setShowBanner(false)}>
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="investigation-topbar">
        <button className="anomaly-back" onClick={onBack}>
          <ArrowLeft size={14} strokeWidth={2} />
          Anomaly detail
        </button>
        <div className="investigation-toggle">
          <button
            className={`investigation-toggle-btn${activeTab === 'transparency' ? ' investigation-toggle-btn--active' : ''}`}
            onClick={() => setActiveTab('transparency')}
          >
            Data
          </button>
          <button
            className={`investigation-toggle-btn${activeTab === 'guided' ? ' investigation-toggle-btn--active' : ''}`}
            onClick={() => setActiveTab('guided')}
          >
            Conversation
          </button>
        </div>
      </div>

      <div className="investigation-header">
        <div>
          <div className="anomaly-site-label">Bath site · The Anchor Hotels</div>
          <h1 className="anomaly-title">We think we've found it</h1>
        </div>
      </div>

      {/* Guided conversation view */}
      {activeTab === 'guided' && (
        <GuidedConversation onDone={() => onNavigate && onNavigate('insights')} />
      )}

      {/* Agent transparency content */}
      {activeTab === 'transparency' && <>

      {/* Section 1 — Agent log */}
      <div className="anomaly-section">
        <div className="section-header">
          <h2 className="section-title">What RED™ has checked so far</h2>
        </div>
        <div className="log-card">
          {LOG_STEPS.map(({ status, label, result }, i) => (
            <div key={i} className={`log-step log-step--${status}`}>
              <div className="log-step-icon">
                {status === 'done'   && <Check size={12} strokeWidth={2.5} />}
                {status === 'active' && <Loader size={12} strokeWidth={2} className="spin" />}
              </div>
              <div className="log-step-content">
                <span className="log-step-label">{label}</span>
                <span className="log-step-result">{result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 — Agent narrative */}
      <div className="agent-narrative">
        <div className="agent-narrative-header">
          <Sparkles size={12} strokeWidth={1.75} />
          <span>RED™ Agent</span>
        </div>
        <p>
          The evidence points to overnight HVAC activity at the Bath site. Heating zones appear active
          between 23:00–05:00 every night this week — a window when the building should be drawing
          almost nothing. Here's the pattern.
        </p>
      </div>

      {/* Section 3 — Overnight chart */}
      <div className="anomaly-section">
        <div className="section-header">
          <h2 className="section-title">What we're looking at now</h2>
          <span className="section-subtitle">Daytime vs overnight kWh · Bath site · Jun 3–9</span>
        </div>
        <div className="chart-card">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={overnightData} margin={{ top: 8, right: 8, bottom: 0, left: -10 }} barGap={3} barCategoryGap="30%">
              <CartesianGrid stroke="#1f1f1f" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: '#666', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#666', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.35)' }} />
              <Bar dataKey="daytime"        fill="#888888"        radius={[3, 3, 0, 0]} />
              <Bar dataKey="overnightNormal" fill="#3a3a3a"         radius={[3, 3, 0, 0]} />
              <Bar dataKey="overnightAnom"   fill="rgb(255,63,16)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            <span className="legend-item">
              <span className="legend-dot" style={{ background: '#888888' }} />
              Daytime
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{ background: '#3a3a3a', border: '1px solid #555' }} />
              Normal overnight
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{ background: 'rgb(255,63,16)' }} />
              Anomalous overnight
            </span>
          </div>
        </div>
      </div>

      {/* Section 4 — Actions */}
      <div className="investigation-actions">
        <div className="investigation-cta-row">
          <button className="action-btn action-btn--primary" onClick={onDismiss}>This makes sense — dismiss</button>
          <button className="action-btn action-btn--secondary" onClick={() => setShowModal(true)}>Message site manager</button>
        </div>
      </div>

      </>}

      {showModal && (
        <MessageManagerModal
          onClose={() => setShowModal(false)}
          onSend={handleSend}
        />
      )}

    </div>
  )
}
