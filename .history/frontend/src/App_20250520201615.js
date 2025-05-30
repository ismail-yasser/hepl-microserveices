import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ResourceLibraryPage from './pages/ResourceLibraryPage';
import HelpCenterPage from './pages/HelpCenterPage';
import HelpDetailPage from './pages/HelpDetailPage';
import PartnershipPage from './pages/PartnershipPage';
import CanvasIntegrationPage from './pages/CanvasIntegrationPage';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="d-flex">
          <Sidebar />
          <div className="flex-grow-1 p-3">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route path="/resources" element={<ResourceLibraryPage />} />
              <Route path="/help-center" element={<HelpCenterPage />} />
              <Route path="/help/:id" element={<HelpDetailPage />} />
              <Route 
                path="/partnerships" 
                element={
                  <PrivateRoute>
                    <PartnershipPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/canvas" 
                element={
                  <PrivateRoute>
                    <CanvasIntegrationPage />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
