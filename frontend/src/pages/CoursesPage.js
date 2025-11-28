import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../api/mockData';
import './CoursesPage.css';

function CoursesPage() {
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('enrolled'); // enrolled, wishlist, suggested
  const navigate = useNavigate();

  useEffect(() => {
    // Загружаем курсы при монтировании компонента
    getCourses()
      .then(data => {
        setAllCourses(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка загрузки курсов:', error);
        setLoading(false);
      });
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}/modules`);
  };

  // Фильтруем курсы по активному фильтру
  const filteredCourses = allCourses.filter(course => course.status === activeFilter);

  // Подсчитываем количество курсов в каждой категории
  const courseCounts = {
    enrolled: allCourses.filter(c => c.status === 'enrolled').length,
    wishlist: allCourses.filter(c => c.status === 'wishlist').length,
    suggested: allCourses.filter(c => c.status === 'suggested').length,
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Загрузка курсов...</p>
        </div>
      </div>
    );
  }

  const getFilterTitle = () => {
    switch(activeFilter) {
      case 'enrolled': return 'Курсы, которые я прохожу';
      case 'wishlist': return 'Курсы, которые хочу пройти';
      case 'suggested': return 'Предложенные курсы';
      default: return 'Мои курсы';
    }
  };

  const getFilterSubtitle = () => {
    switch(activeFilter) {
      case 'enrolled': return 'Продолжайте обучение по вашим активным курсам';
      case 'wishlist': return 'Запишитесь на интересующие вас курсы';
      case 'suggested': return 'Изучите новые курсы, подобранные для вас';
      default: return 'Выберите курс для продолжения обучения';
    }
  };

  return (
    <div className="courses-page">
      {/* Шапка */}
      <header className="courses-header">
        <div className="courses-header-content">
          <h1 className="courses-title">{getFilterTitle()}</h1>
          <p className="courses-subtitle">{getFilterSubtitle()}</p>
        </div>
      </header>

      <div className="courses-content">
        {/* Левая панель с фильтрами */}
        <aside className="courses-sidebar">
          <h2 className="sidebar-title">Категории</h2>
          <nav className="filter-nav">
            <button
              className={`filter-button ${activeFilter === 'enrolled' ? 'active' : ''}`}
              onClick={() => setActiveFilter('enrolled')}
            >
              <svg className="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="filter-text">Прохожу</span>
              <span className="filter-count">{courseCounts.enrolled}</span>
            </button>

            <button
              className={`filter-button ${activeFilter === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveFilter('wishlist')}
            >
              <svg className="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="filter-text">Хочу пройти</span>
              <span className="filter-count">{courseCounts.wishlist}</span>
            </button>

            <button
              className={`filter-button ${activeFilter === 'suggested' ? 'active' : ''}`}
              onClick={() => setActiveFilter('suggested')}
            >
              <svg className="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="filter-text">Предложенные</span>
              <span className="filter-count">{courseCounts.suggested}</span>
            </button>
          </nav>
        </aside>

        {/* Список курсов */}
        <main className="courses-main">
          {filteredCourses.length === 0 ? (
            <div className="empty-state">
              <p className="empty-message">Курсы не найдены</p>
              <p className="empty-hint">Попробуйте выбрать другую категорию</p>
            </div>
          ) : (
            <div className="courses-grid">
              {filteredCourses.map(course => (
            <div 
              key={course.id} 
              className="course-card"
              onClick={() => handleCourseClick(course.id)}
            >
              {/* Изображение курса */}
              <div className="course-image">
                <img
                  src={course.image}
                  alt={course.title}
                />
              </div>

              {/* Контент карточки */}
              <div className="course-content">
                <h2 className="course-title-text">
                  {course.title}
                </h2>
                <p className="course-description">
                  {course.description}
                </p>

                {/* Информация о курсе */}
                <div className="course-info">
                  <div className="course-info-item">
                    <svg className="course-info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {course.instructor}
                  </div>
                  <div className="course-info-item">
                    <svg className="course-info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </div>
                  <div className="course-info-item">
                    <svg className="course-info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {course.studentsCount} студентов
                  </div>
                </div>

                {/* Прогресс */}
                <div className="course-progress">
                  <div className="course-progress-header">
                    <span className="course-progress-label">Прогресс</span>
                    <span className="course-progress-value">{course.progress}%</span>
                  </div>
                  <div className="course-progress-bar-bg">
                    <div
                      className="course-progress-bar-fill"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Кнопка */}
                <button className="course-button">
                  {course.progress === 0 ? 'Начать курс' : course.progress === 100 ? 'Повторить' : 'Продолжить'}
                </button>
              </div>
            </div>
          ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default CoursesPage;