import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CoursesPage from './pages/CoursesPage';
import CourseModulesPage from './pages/CourseModulesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id/modules" element={<CourseModulesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
