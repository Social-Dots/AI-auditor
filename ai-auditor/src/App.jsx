import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import FinancialReports from './pages/FinancialReports';
import ComplianceCenter from './pages/ComplianceCenter';
import FraudDetection from './pages/FraudDetection';
import CostOptimization from './pages/CostOptimization';
import GrantOpportunities from './pages/GrantOpportunities';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/financial-reports" element={<FinancialReports />} />
              <Route path="/compliance-center" element={<ComplianceCenter />} />
              <Route path="/fraud-detection" element={<FraudDetection />} />
              <Route path="/cost-optimization" element={<CostOptimization />} />
              <Route path="/grant-opportunities" element={<GrantOpportunities />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;