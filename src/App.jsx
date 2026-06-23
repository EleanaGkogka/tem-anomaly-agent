import { useState } from 'react'
import Sidebar from './components/Sidebar'
import EmailNotification from './components/EmailNotification'
import AnomalyDetail from './components/AnomalyDetail'
import InvestigationView from './components/InvestigationView'
import DismissedView from './components/DismissedView'
import './App.css'

function App() {
  const [activeNav, setActiveNav] = useState('Insights')
  const [route, setRoute] = useState(null)
  const [insightsBadge, setInsightsBadge] = useState(1)

  function handleNavigate(r) {
    setRoute(r)
    document.querySelector('.main-content')?.scrollTo({ top: 0 })
  }

  function handleDismiss() {
    setInsightsBadge(0)
    handleNavigate('insights/anomaly/bath-june-2025/resolved')
  }

  function handleBackToInsights() {
    setActiveNav('Insights')
    setRoute(null)
    document.querySelector('.main-content')?.scrollTo({ top: 0 })
  }

  return (
    <div className="app-shell">
      <Sidebar
        active={activeNav}
        insightsBadge={insightsBadge}
        onNavigate={(nav) => { setActiveNav(nav); setRoute(null) }}
      />
      <main className="main-content">
        {activeNav === 'Insights' && route === null && (
          <EmailNotification onNavigate={handleNavigate} />
        )}
        {activeNav === 'Insights' && route === 'insights/anomaly/bath-june-2025' && (
          <AnomalyDetail
            onBack={() => setRoute(null)}
            onNavigate={handleNavigate}
            onDismiss={handleDismiss}
          />
        )}
        {activeNav === 'Insights' && route === 'insights/anomaly/bath-june-2025/investigate' && (
          <InvestigationView
            onBack={() => setRoute('insights/anomaly/bath-june-2025')}
            onNavigate={handleNavigate}
            onDismiss={handleDismiss}
          />
        )}
        {activeNav === 'Insights' && route === 'insights/anomaly/bath-june-2025/resolved' && (
          <DismissedView onBack={handleBackToInsights} />
        )}
      </main>
    </div>
  )
}

export default App
