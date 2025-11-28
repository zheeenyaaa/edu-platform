// Моки данных для курсов
// status: 'enrolled' - прохожу, 'wishlist' - хочу пройти, 'suggested' - предложенные
export const mockCourses = [
  {
    id: 1,
    title: 'Основы React',
    description: 'Изучите основы React: компоненты, хуки, состояние и жизненный цикл',
    progress: 65,
    instructor: 'Иван Петров',
    duration: '8 недель',
    studentsCount: 234,
    image: 'https://via.placeholder.com/400x200/3b82f6/ffffff?text=React+Basics',
    status: 'enrolled',
  },
  {
    id: 2,
    title: 'JavaScript Advanced',
    description: 'Продвинутый JavaScript: замыкания, прототипы, асинхронность',
    progress: 40,
    instructor: 'Мария Сидорова',
    duration: '6 недель',
    studentsCount: 189,
    image: 'https://via.placeholder.com/400x200/f59e0b/ffffff?text=JS+Advanced',
    status: 'enrolled',
  },
  {
    id: 3,
    title: 'Web Design Fundamentals',
    description: 'Основы веб-дизайна: композиция, типографика, цвет',
    progress: 20,
    instructor: 'Анна Козлова',
    duration: '4 недели',
    studentsCount: 156,
    image: 'https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Web+Design',
    status: 'enrolled',
  },
  {
    id: 4,
    title: 'Node.js Backend Development',
    description: 'Создание серверных приложений на Node.js и Express',
    progress: 0,
    instructor: 'Дмитрий Волков',
    duration: '10 недель',
    studentsCount: 312,
    image: 'https://via.placeholder.com/400x200/10b981/ffffff?text=Node.js',
    status: 'wishlist',
  },
  {
    id: 5,
    title: 'Database Design with PostgreSQL',
    description: 'Проектирование баз данных, SQL запросы, оптимизация',
    progress: 85,
    instructor: 'Ольга Смирнова',
    duration: '5 недель',
    studentsCount: 201,
    image: 'https://via.placeholder.com/400x200/ef4444/ffffff?text=PostgreSQL',
    status: 'enrolled',
  },
  {
    id: 6,
    title: 'Git и GitHub для разработчиков',
    description: 'Система контроля версий: основы Git, работа с GitHub',
    progress: 100,
    instructor: 'Алексей Новиков',
    duration: '3 недели',
    studentsCount: 445,
    image: 'https://via.placeholder.com/400x200/6366f1/ffffff?text=Git+%26+GitHub',
    status: 'enrolled',
  },
  {
    id: 7,
    title: 'Docker и контейнеризация',
    description: 'Основы работы с Docker: контейнеры, образы, docker-compose',
    progress: 0,
    instructor: 'Сергей Кузнецов',
    duration: '4 недели',
    studentsCount: 278,
    image: 'https://via.placeholder.com/400x200/0ea5e9/ffffff?text=Docker',
    status: 'wishlist',
  },
  {
    id: 8,
    title: 'Python для начинающих',
    description: 'Изучите основы Python: синтаксис, структуры данных, ООП',
    progress: 0,
    instructor: 'Елена Васильева',
    duration: '8 недель',
    studentsCount: 512,
    image: 'https://via.placeholder.com/400x200/eab308/ffffff?text=Python',
    status: 'suggested',
  },
  {
    id: 9,
    title: 'UI/UX Design Pro',
    description: 'Продвинутый курс по дизайну интерфейсов и пользовательского опыта',
    progress: 0,
    instructor: 'Михаил Соколов',
    duration: '6 недель',
    studentsCount: 198,
    image: 'https://via.placeholder.com/400x200/a855f7/ffffff?text=UI/UX+Pro',
    status: 'suggested',
  },
  {
    id: 10,
    title: 'Тестирование веб-приложений',
    description: 'Unit-тесты, интеграционное тестирование, E2E тесты',
    progress: 0,
    instructor: 'Андрей Морозов',
    duration: '5 недель',
    studentsCount: 167,
    image: 'https://via.placeholder.com/400x200/14b8a6/ffffff?text=Testing',
    status: 'suggested',
  },
];

// Моки данных для модулей курса
export const mockModules = {
  1: [
    { id: 1, title: 'Введение в React', lessonsCount: 5, duration: '2 часа', completed: true },
    { id: 2, title: 'Компоненты и Props', lessonsCount: 8, duration: '3 часа', completed: true },
    { id: 3, title: 'Состояние и жизненный цикл', lessonsCount: 6, duration: '2.5 часа', completed: false },
    { id: 4, title: 'Хуки React', lessonsCount: 10, duration: '4 часа', completed: false },
    { id: 5, title: 'Работа с формами', lessonsCount: 7, duration: '3 часа', completed: false },
  ],
  2: [
    { id: 1, title: 'Замыкания в JavaScript', lessonsCount: 4, duration: '1.5 часа', completed: true },
    { id: 2, title: 'Прототипы и наследование', lessonsCount: 6, duration: '2 часа', completed: false },
    { id: 3, title: 'Асинхронное программирование', lessonsCount: 8, duration: '3 часа', completed: false },
    { id: 4, title: 'Промисы и async/await', lessonsCount: 5, duration: '2 часа', completed: false },
  ],
  3: [
    { id: 1, title: 'Основы композиции', lessonsCount: 5, duration: '2 часа', completed: true },
    { id: 2, title: 'Типографика в вебе', lessonsCount: 6, duration: '2.5 часа', completed: false },
    { id: 3, title: 'Цветовая теория', lessonsCount: 4, duration: '1.5 часа', completed: false },
    { id: 4, title: 'UI/UX принципы', lessonsCount: 7, duration: '3 часа', completed: false },
  ],
  4: [
    { id: 1, title: 'Введение в Node.js', lessonsCount: 5, duration: '2 часа', completed: false },
    { id: 2, title: 'Express.js основы', lessonsCount: 8, duration: '3 часа', completed: false },
    { id: 3, title: 'REST API разработка', lessonsCount: 10, duration: '4 часа', completed: false },
    { id: 4, title: 'Middleware и роутинг', lessonsCount: 6, duration: '2.5 часа', completed: false },
  ],
  5: [
    { id: 1, title: 'Введение в PostgreSQL', lessonsCount: 4, duration: '1.5 часа', completed: true },
    { id: 2, title: 'SQL запросы', lessonsCount: 8, duration: '3 часа', completed: true },
    { id: 3, title: 'Индексы и оптимизация', lessonsCount: 6, duration: '2.5 часа', completed: true },
    { id: 4, title: 'Транзакции', lessonsCount: 5, duration: '2 часа', completed: true },
  ],
  6: [
    { id: 1, title: 'Основы Git', lessonsCount: 5, duration: '2 часа', completed: true },
    { id: 2, title: 'Ветвление и слияние', lessonsCount: 6, duration: '2.5 часа', completed: true },
    { id: 3, title: 'Работа с GitHub', lessonsCount: 7, duration: '3 часа', completed: true },
    { id: 4, title: 'Git Flow', lessonsCount: 4, duration: '1.5 часа', completed: true },
  ],
};

// Функция для получения всех курсов (имитация API запроса)
export const getCourses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCourses);
    }, 500); // имитация задержки сети
  });
};

// Функция для получения курса по ID
export const getCourseById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const course = mockCourses.find(c => c.id === parseInt(id));
      if (course) {
        resolve(course);
      } else {
        reject(new Error('Курс не найден'));
      }
    }, 300);
  });
};

// Функция для получения модулей курса по ID курса
export const getCourseModules = (courseId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const modules = mockModules[courseId];
      if (modules) {
        resolve(modules);
      } else {
        reject(new Error('Модули не найдены'));
      }
    }, 300);
  });
};
