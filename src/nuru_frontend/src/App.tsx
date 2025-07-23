import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppProvider } from "./contexts/AppContext"
import HomePage from "./pages/HomePage"
import DashboardPage from "./pages/Dashboard"
import SavingsPage from "./pages/SavingsPage"
import YieldPage from "./pages/YieldPage"
import GovernancePage from "./pages/Governance"
import AdminPage from "./pages/AdminPage"

export function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/savings" element={<SavingsPage />} />
          <Route path="/yield" element={<YieldPage />} />
          <Route path="/governance" element={<GovernancePage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </AppProvider>
  )
}
