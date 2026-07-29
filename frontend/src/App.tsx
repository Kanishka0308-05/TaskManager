import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './components/layout/DashboardLayout';
import { ToastProvider } from './components/toast/ToastProvider';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
