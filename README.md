### Тестовое задание на позицию Middle Frontend Developer React - Национальный центр электронных услуг,РУП

Это `Next.js` SPA с маршрутизацией `App Router` и по архитектуре `Feature-Sliced Design (FSD)`. 

Проект включает в себя: 
- Шаг авторизации (тестовый email: `email@email.com`, тестовый пароль: `12345678`)
- Шаг ввода OTP (тестовый код: `111111`)
- Страницу `dashboard` со списком задач и фильтрацией
- Страницу с деталями задачи и возможностью редактирования/удаление
- Страницу создания задачи

Также, реализован отедельный API слой на Node.js (иммитация backend), приближенной к production варианту.

### Технический стек

- **Next.js**: `16.2.6 (App Router)`, `Webpack`
- **React**: `19.2.4`
- **Language**: `TypeScript`
- **State management**: `Redux, Redux-Persist`
- **Query**: `RTK Query`
- **Language**: `TypeScript`
- **Styling**: `Tailwind CSS 4.3.0`, `CSS`, `tailwind-merge`
- **Form**: `react-hook-form`, `zod`, `@hookform/resolvers`
- **UI**: `shadcn-ui`, `lucide-react`
- **Lint**: `Biome`
- **Architecture**: `Feature-Sliced Design (FSD)`

### Структура проекта (основное)

Проект построен на основе Feature-Sliced Design (FSD) методологии

```
src/
├── app/                     # Слой маршрутизации приложения (App Router)
│   ├── api/                 # Mock backend API (Next.js Route Handlers)
│   │   ├── auth/            # Auth API
│   │   │   ├── login/       # Логин пользователя
│   │   │   └── otp/         # Подтверждение OTP
│   │   │
│   │   ├── config/          # Общие backend-конфиги
│   │   │
│   │   ├── task/            # API задач
│   │   │   ├── [id]/        # Получение/обновление/удаление задачи
│   │   │   ├── create/      # Создание задачи
│   │   │   ├── status/[id]/ # Обновление статуса задачи
│   │   │   ├── tags/        # API тегов
│   │   │   │   └── create/  # Создание нового тега
│   │   │   ├── mocks/       # Mock данные задач (tasks.json) и тегов (tags.json)
│   │   │   └── utils/       # Утилитарные функции (валидация Bearer токена, чтение/запись файлов)
│   │
│   ├── auth/                # Страницы авторизации
│   │   └── otp/
│   │
│   └── (home)/              # Основной layout приложения (точка входа)
│       ├── create-task/     # Создание задачи
│       ├── task/[id]/       # Детали задачи
│       └── page.tsx         # Главная страница со списком задач
│
├── entities/                # Бизнес-сущности (task, user)
│
├── features/                # Функциональные модули
│   ├── auth/
│   │   ├── api/hooks/       # API-хуки работы с авторизацией
│   │   ├── model/schemas/   # Zod-схема и тип формы авторизации
│   │   └── ui/              # UI-компоненты авторизации
│   │
│   ├── providers/           # Провайдеры (ReduxProvider, Providers)
│   │
│   └── task/
│       ├── api/hooks/       # API-хуки работы с задачами
│       ├── model/           # config/constants/schemas/types
│       └── ui/              # UI-компоненты задачи
│
├── shared/                  # Shared слой
│   ├── api/                 # RTK Query базовый фетчер
│   ├── model/
│   │   ├── constants/
│   │   ├── HOC/
│   │   ├── hooks/
│   │   ├── store/           # Redux (middleware, redirect, reducers, store)
│   │   │   ├── api/         # RTK Query API services (auth, task)
│   │   │   ├── event/       # Кастомная шина событий
│   │   │   └── slices/      # Redux slices (auth, task)
│   │   ├── types/
│   │   └── utils/
│   │
│   └── ui/                  # Переиспользуемые UI-компоненты
│
└── widgets/                 # Крупные UI-блоки с собственной логикой
```

