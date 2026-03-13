import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';

// Pages Placeholder
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BudgetManager from './pages/BudgetManager';
import SipScheduler from './pages/SipScheduler';
import RentManager from './pages/RentManager';
import ExpenseTracker from './pages/ExpenseTracker';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/welcome" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/budget" element={<BudgetManager />} />
            <Route path="/sip" element={<SipScheduler />} />
            <Route path="/rent" element={<RentManager />} />
            <Route path="/expenses" element={<ExpenseTracker />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
