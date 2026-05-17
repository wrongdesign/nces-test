### Тестовое задание на позицию Middle Frontend Developer React - Национальный центр электронных услуг,РУП

Это `Next.js` SPA с маршрутизацией `App Router` и по архитектуре `Feature-Sliced Design (FSD)`.

Проект включает в себя:

- Шаг авторизации (тестовый email: `email@email.com`, тестовый пароль: `12345678`)
- Шаг ввода OTP (тестовый код: `111111`)
- Страницу `dashboard` со списком задач и фильтрацией
- Страницу с деталями задачи и возможностью редактирования/удаления
- Страницу создания задачи

Также, реализован отдельный API слой на Node.js (имитация backend), приближенной к реальному backend flow.

---

### Технический стек

- **Next.js**: `16.2.6 (App Router)`, `Webpack`
- **React**: `19.2.4`
- **Language**: `TypeScript`
- **State management**: `Redux, Redux-Persist`
- **Query**: `RTK Query`
- **Styling**: `Tailwind CSS 4.3.0`, `CSS`, `tailwind-merge`
- **Form**: `react-hook-form`, `zod`, `@hookform/resolvers`
- **UI**: `shadcn-ui`, `lucide-react`
- **Lint**: `Biome`
- **Architecture**: `Feature-Sliced Design (FSD)`

---

### Структура проекта (основное)

Проект построен на основе методологии Feature-Sliced Design (FSD)

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
│   ├── api/                 # RTK Query base query configuration
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

---

### Функциональные возможности

- Реализован mock backend на `Next.js Route Handlers`:
    - с поддержкой CRUD-операций
    - проверки Bearer Token
    - хранением "живых" данных через файловую систему (`tasks.json`, `tags.json`)
- Авторизация построена через двухфакторный flow:
    - логин пользователя
    - OTP подтверждение
- Реализована централизованная обработка ошибок авторизации через кастомную шину событий `EventBus`
- Добавлен HOC `withAuth` для защиты приватных страниц и автоматического logout при получении `401/403`
- Используется `Redux Toolkit` + `RTK Query` для state management и работы с API
- Реализовано сохранение состояния приложения через `redux-persist`
- Поддерживается смена темы (`light/dark`) через `next-themes`
- Реализованы:
    - поиск задач
    - фильтрация по `status`, `priority` и `tag`
    - сортировка по `createdAt` и `deadline`
    - пагинация с выбором количества отображаемых элементов на странице
- Добавлена возможность быстрого обновления статуса задачи из списка задач
- Реализована фильтрация задач по нажатию на `tag` в карточке списка
- Просроченные задачи визуально выделяются в интерфейсе
- Создание и редактирование задачи построены на переиспользуемых компонентах (`TaskDetails`, `TaskDetailsInfoForm`)
- Формы и их валидация построены на `react-hook-form` + `zod`
- Реализованы переиспользуемые form wrappers и controlled UI-компоненты
- Проект построен на основе Feature-Sliced Design (FSD) методологии

---

### Запуск

Требования:

- Node.js 20.9.0+ (рекомендуется 22+)
- npm / pnpm / yarn / bun (любой менеджер пакетов)

Установка зависимостей:

```bash
pnpm install
```

Запуск разработки:

```bash
pnpm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

Сборка production‑бандла:

```bash
pnpm run build
```

Старт production‑сервера (после build):

```bash
pnpm start
```

Проверка линтера:

```bash
pnpm run lint
```

## Скрипты

- `dev` — запуск дев‑сервера Next.js с Webpack
- `build` — сборка приложения
- `start` — запуск собранного приложения
- `lint` — проверка кода Biome
- `format` - форматирование кода Biome