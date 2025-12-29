import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import KioskView from './components/KioskView'
import AdminDashboard from './components/AdminDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KioskView />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
