import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import JobResultsPage from './pages/JobResultsPage';
import JobDetailsPage from './pages/JobDetailsPage';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobResultsPage />} />
          <Route path="/job/:jobId" element={<JobDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}