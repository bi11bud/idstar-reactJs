import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage } from './Pages/LoginPage';
import { EmployeePage } from "./Pages/EmployeePage";
import { EmployeeTrainingPage } from "./Pages/EmployeeTrainingPage";
import { TrainingPage } from "./Pages/TrainingPage";
import { AccountPage } from "./Pages/AccountPage";
import { NotFound } from './Pages/NotFoundPage';

function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/employee-training" element={<EmployeeTrainingPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    
  );
}

export default App;
