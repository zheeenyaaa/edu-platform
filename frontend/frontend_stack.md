# Frontend Tech Stack (React + JavaScript, optimized for student track LMS)

Этот стек создан специально под твой кейс: **React, без TypeScript**, быстрый, простой и надёжный для хакатона.  
Он закрывает все потребности фронта для трека студента: логин → курсы → материалы → задания → загрузка решения → просмотр оценки.

---

# 1. Базовый стек фронтенда

### Основные технологии

- **React (JavaScript)**
- **React Router** — система маршрутов
- **Fetch / axios** — запросы к backend API
- **Context API + useState/useReducer** — управление состоянием (без Redux)
- **UI-библиотека** (по выбору):
  - `MUI`
  - или `Chakra UI`
  - или простые CSS-модули

### Почему так
- Всё на **JS**, без изучения TS.
- Стек максимально лёгкий.
- Всё поддерживается, много примеров в интернете.
- Подходит для фронта, который должен успеть сделать рабочий UX/интерфейс за короткое время.

---

# 2. Рекомендуемая структура проекта

```text
src/
  api/               # функции для запросов к backend API
    auth.js
    courses.js
    assignments.js
    submissions.js

  components/        # переиспользуемые UI-компоненты
    Layout/
    Header/
    Button/
    FileUploader/

  pages/             # страницы приложения (привязаны к маршрутам)
    LoginPage/
    CoursesPage/
    CoursePage/
    AssignmentPage/
    SubmissionPage/

  context/           # контекст авторизации
    AuthContext.js

  hooks/             # полезные кастомные хуки
    useAuth.js
    useApi.js

  router/
    AppRouter.js     # все маршруты приложения

  utils/             # вспомогательные функции (формат дат, загрузка файлов и т.д.)

  App.js
  main.jsx
```

---

# 3. Маршрутизация (React Router)

Необходимые маршруты:

- `/login`
- `/courses`
- `/courses/:courseId`
- `/assignments/:assignmentId`
- `/submissions/:submissionId`

### Компонент ProtectedRoute
- Если нет токена — перекидывает на `/login`.
- Иначе — рендерит нужную страницу.

---

# 4. API-слой (папка `api/`)

Один файл для HTTP-запросов:

```js
// api/http.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: \`Bearer ${token}\` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(\`\${API_BASE_URL}\${path}\`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(\`API error: \${res.status}\`);
  }

  return res.json();
}
```

Дальше модули API:

```js
// api/auth.js
import { apiRequest } from './http';

export function login(email, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}
```

Точно так же: `api/courses.js`, `api/assignments.js`, `api/submissions.js`.

---

# 5. Авторизация: AuthContext

Хранит:

- `user`
- `token`
- `isLoading`

Методы:

- **login(email, password)** — вызывает API, сохраняет токен, user.
- **logout()** — очищает состояние и localStorage.

### Поведение при загрузке приложения

1. Прочитать токен из `localStorage`.
2. Если он есть, вызвать `GET /users/me`.
3. Если ответ ок — сохранить `user`.
4. Иначе — выполнить logout.

---

# 6. Основные страницы (трека студента)

## LoginPage
- форма логина
- после успеха → `navigate('/courses')`

## CoursesPage
- запрос: `GET /courses`
- список карточек:
  - название курса
  - описание
  - прогресс
  - кнопка «Открыть»

## CoursePage
- запросы:
  - `GET /courses/:id`
  - `GET /courses/:id/modules` (или один объединённый эндпоинт)
- показывает:
  - модули
  - материалы
  - домашние задания
  - прогресс курса

## AssignmentPage
- запросы:
  - `GET /assignments/:id`
  - `GET /assignments/:id/my-submission`
- содержит:
  - условие задания
  - дедлайн
  - текущую сдачу
  - форму загрузки файлов
  - кнопку отправки

## SubmissionPage
- запрос: `GET /submissions/:id/feedback`
- показывает:
  - оценку
  - комментарии преподавателя
  - статус проверки

---

# 7. Минимальные необходимые библиотеки

### Базовые:
```bash
npm install react react-dom react-router-dom
```

### HTTP (если не хочешь fetch):
```bash
npm install axios
```

### UI (выбери **одну**):
```bash
# MUI
npm install @mui/material @emotion/react @emotion/styled
```

или

```bash
# Chakra UI
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

---

# 8. Что важно для хакатона

- Делай **минимальный жизненно необходимый UX**, не украшай лишнего.
- Держи логику в `api/` и `context/`, чтобы компоненты оставались чистыми.
- Делай каждый экран **простым, но завершённым**.
- Обеспечь **полный маршрут студента**:
  1. логин  
  2. список курсов  
  3. курс  
  4. модуль / материал  
  5. домашка  
  6. загрузка решения  
  7. просмотр оценки  

Если весь путь работает → это **идеальный MVP для хакатона**.

---

# 9. Дополнительные улучшения (если останется время)

- уведомления о дедлайнах
- отображение истории сдач
- красивые skeleton loaders
- превью материалов (PDF, видео)
- адаптивный дизайн

---

Готово! Фронтенд-стек для твоего кейса сформирован, лёгкий, понятный и боевой.  
Если нужно — могу сгенерировать starter-project (структура папок + болванки компонентов).
