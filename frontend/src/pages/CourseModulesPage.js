import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, getCourseModules } from '../api/mockData';
import './CourseModulesPage.css';

function CourseModulesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Загружаем данные курса и модулей
    Promise.all([
      getCourseById(id),
      getCourseModules(id)
    ])
      .then(([courseData, modulesData]) => {
        setCourse(courseData);
        setModules(modulesData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка загрузки данных:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Загрузка курса...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="error-container">
        <p>Курс не найден</p>
        <button onClick={() => navigate('/courses')}>Вернуться к курсам</button>
      </div>
    );
  }

  return (
    <div className="course-modules-page">
      {/* Левая панель - информация о курсе */}
      <aside className="course-sidebar">
        <button className="back-button" onClick={() => navigate('/courses')}>
          <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад к курсам
        </button>

        <div className="course-icon">
          <img src={course.image} alt={course.title} />
        </div>

        <h2 className="course-sidebar-title">{course.title}</h2>

        <div className="course-progress-section">
          <h3 className="progress-title">Прогресс курса</h3>
          <div className="progress-circle">
            <svg className="progress-ring" width="120" height="120" viewBox="0 0 120 120">
              <circle
                className="progress-ring-circle-bg"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="transparent"
                r="52"
                cx="60"
                cy="60"
              />
              <circle
                className="progress-ring-circle"
                stroke="#2563eb"
                strokeWidth="8"
                fill="transparent"
                r="52"
                cx="60"
                cy="60"
                transform="rotate(-90 60 60)"
                style={{
                  strokeDasharray: `${2 * Math.PI * 52}`,
                  strokeDashoffset: `${2 * Math.PI * 52 * (1 - course.progress / 100)}`,
                }}
              />
              <text x="60" y="65" textAnchor="middle" className="progress-text">
                {course.progress}%
              </text>
            </svg>
          </div>
        </div>

        <div className="course-description-section">
          <h3 className="description-title">Описание</h3>
          <p className="course-description">{course.description}</p>
        </div>

        <div className="course-meta">
          <div className="meta-item">
            <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{course.instructor}</span>
          </div>
          <div className="meta-item">
            <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{course.duration}</span>
          </div>
          <div className="meta-item">
            <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{course.studentsCount} студентов</span>
          </div>
        </div>
      </aside>

      {/* Правая панель - модули курса */}
      <main className="modules-main">
        <div className="modules-header">
          <h1 className="modules-title">Модули курса</h1>
          <p className="modules-subtitle">Всего модулей: {modules.length}</p>
        </div>

        <div className="modules-container">
          {modules.map((module, index) => (
            <div 
              key={module.id} 
              className={`module-card ${module.completed ? 'completed' : ''}`}
            >
              <div className="module-number">Модуль {index + 1}</div>
              {module.completed && (
                <div className="completed-badge">
                  <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <h3 className="module-title">{module.title}</h3>
              <div className="module-info">
                <div className="module-info-item">
                  <svg className="module-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {module.lessonsCount} уроков
                </div>
                <div className="module-info-item">
                  <svg className="module-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {module.duration}
                </div>
              </div>
              <button className="module-button">
                {module.completed ? 'Повторить' : 'Начать'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default CourseModulesPage;

