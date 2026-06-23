import {
  LayoutDashboard,
  Lightbulb,
  FileText,
  BarChart2,
  User,
} from 'lucide-react'
import './Sidebar.css'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Insights', icon: Lightbulb, badge: 1 },
  { label: 'Invoices', icon: FileText },
  { label: 'Consumption', icon: BarChart2 },
  { label: 'Account', icon: User },
]

export default function Sidebar({ active, onNavigate, insightsBadge = 1 }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-mark">RED</span>
        <span className="logo-tm">™</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ label, icon: Icon }) => {
          const badge = label === 'Insights' ? insightsBadge : null
          return (
          <button
            key={label}
            className={`nav-item ${active === label ? 'nav-item--active' : ''}`}
            onClick={() => onNavigate(label)}
          >
            <Icon size={18} strokeWidth={1.75} />
            <span>{label}</span>
            {badge != null && badge > 0 && (
              <span className="nav-badge">{badge}</span>
            )}
          </button>
        )})}
      </nav>

      <div className="sidebar-footer">
        <div className="user-dot" />
        <div className="user-info">
          <span className="user-name">Eleana G.</span>
          <span className="user-plan">Business</span>
        </div>
      </div>
    </aside>
  )
}
