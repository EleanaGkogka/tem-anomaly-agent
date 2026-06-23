import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Sparkles, Thermometer, CalendarX, Clock } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'
import './AnomalyDetail.css'

const chartData = [
  { date: 'May 27', actual: 312, baseline: 308 },
  { date: 'May 28', actual: 295, baseline: 302 },
  { date: 'May 29', actual: 318, baseline: 310 },
  { date: 'May 30', actual: 301, baseline: 305 },
  { date: 'May 31', actual: 289, baseline: 298 },
  { date: 'Jun 1',  actual: 307, baseline: 304 },
  { date: 'Jun 2',  actual: 315, baseline: 306 },
  { date: 'Jun 3',  actual: 311, baseline: 309 },
  { date: 'Jun 4',  actual: 304, baseline: 307 },
  { date: 'Jun 5',  actual: 391, baseline: 311 },
  { date: 'Jun 6',  actual: 398, baseline: 308 },
  { date: 'Jun 7',  actual: 421, baseline: 305 },
  { date: 'Jun 8',  actual: 435, baseline: 310 },
  { date: 'Jun 9',  actual: 419, baseline: 307 },
]

const FINDINGS = [
  {
    icon: Thermometer,
    label: 'HVAC left on overnight',
    confidence: 'High confidence',
    confidenceLevel: 'high',
    detail: 'Heating appears active between 23:00–05:00 on 6 of the last 7 nights.',
  },
  {
    icon: CalendarX,
    label: 'Weekend schedule not applied',
    confidence: 'Medium confidence',
    confidenceLevel: 'medium',
    detail: 'Saturday consumption matched a weekday profile — possible scheduling error.',
  },
  {
    icon: Clock,
    label: 'Extended operating hours',
    confidence: 'Medium confidence',
    confidenceLevel: 'medium',
    detail: 'Activity detected until 22:30 on weekdays, versus the usual 19:00 cutoff.',
  },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name === 'actual' ? 'Actual' : 'Baseline'}: {p.value} kWh
        </p>
      ))}
    </div>
  )
}

export default function AnomalyDetail({ onBack, onNavigate, onDismiss }) {
  return (
    <div className="anomaly-page">

      {/* SECTION 1 — Header */}
      <button className="anomaly-back" onClick={onBack}>
        <ArrowLeft size={14} strokeWidth={2} />
        Insights
      </button>
      <div className="anomaly-header">
        <div className="anomaly-site-label">Bath site · The Anchor Hotels</div>
        <h1 className="anomaly-title">Energy anomaly detected</h1>
        <div className="anomaly-date-range">3 Jun – 9 Jun 2025 · 7 days</div>
      </div>

      {/* SECTION 2 — Stat cards */}
      <div className="anomaly-stats">
        <div className="stat-card">
          <span className="stat-value stat-value--alert">+34%</span>
          <span className="stat-label">Above normal usage</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">720 <span className="stat-unit">kWh</span></span>
          <span className="stat-label">Excess this week</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">£87</span>
          <span className="stat-label">Projected added cost</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">5 Jun</span>
          <span className="stat-label">Anomaly started</span>
        </div>
      </div>

      {/* SECTION 3 — Chart */}
      <div className="anomaly-section">
        <div className="section-header">
          <h2 className="section-title">Consumption vs baseline</h2>
          <span className="section-subtitle">Daily kWh · Bath site</span>
        </div>
        <div className="chart-card">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
              <CartesianGrid stroke="#1f1f1f" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="date"
                ticks={['May 27', 'May 29', 'May 31', 'Jun 2', 'Jun 4', 'Jun 6', 'Jun 8']}
                tick={{ fill: '#666', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#666', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceArea
                x1="Jun 5"
                x2="Jun 9"
                fill="rgba(255,63,16,0.06)"
                stroke="rgba(255,63,16,0.2)"
                strokeWidth={1}
              />
              <ReferenceLine
                x="Jun 5"
                stroke="rgba(255,63,16,0.4)"
                strokeDasharray="4 4"
              />
              <Line
                type="monotone"
                dataKey="baseline"
                stroke="#444"
                strokeWidth={1.5}
                dot={false}
                strokeDasharray="5 3"
                name="baseline"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="rgb(255,63,16)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'rgb(255,63,16)', strokeWidth: 0 }}
                name="actual"
              />
              <Legend
                wrapperStyle={{ fontSize: '12px', color: '#666', paddingTop: '16px' }}
                formatter={(value) => value === 'actual' ? 'Actual usage' : 'Normal baseline'}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECTION 4 — Agent narrative */}
      <div className="agent-narrative">
        <div className="agent-narrative-header">
          <Sparkles size={12} strokeWidth={1.75} />
          <span>RED™ Agent</span>
        </div>
        <p>Bath used 2,820 kWh this week — 720 kWh above its usual pattern of around 2,100 kWh.</p>
        <p>The spike started on Tuesday 3 June and has continued every day since. It is consistent across all 6 days, not a one-off reading.</p>
        <p>If this continues for the rest of June, it will likely add around £87 to your bill.</p>
      </div>

      {/* SECTION 5 — Possible causes */}
      <div className="anomaly-section">
        <div className="section-header">
          <h2 className="section-title">What RED™ found</h2>
          <span className="section-subtitle">Possible causes, ranked by likelihood</span>
        </div>
        <div className="findings-list">
          {FINDINGS.map(({ icon: Icon, label, confidence, confidenceLevel, detail }) => (
            <div key={label} className="finding-card">
              <div className="finding-icon-wrap">
                <Icon size={16} strokeWidth={1.75} />
              </div>
              <div className="finding-content">
                <div className="finding-header">
                  <span className="finding-label">{label}</span>
                  <span className={`finding-confidence finding-confidence--${confidenceLevel}`}>
                    {confidence}
                  </span>
                </div>
                <p className="finding-detail">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6 — Actions */}
      <div className="anomaly-actions">
        <button className="action-btn action-btn--primary" onClick={onDismiss}>
          This makes sense — dismiss
        </button>
        <button
          className="action-btn action-btn--secondary"
          onClick={() => onNavigate('insights/anomaly/bath-june-2025/investigate')}
        >
          Help me look into this
        </button>
      </div>

    </div>
  )
}
