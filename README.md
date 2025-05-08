README.md для Telegram бота на TypeScript

Описание

Этот проект представляет собой Telegram бота, написанного на TypeScript. Бот предназначен для закрепления теории для Frontend разработчика.

Установка

Требования

Node.js (версии 14 и выше)

npm или yarn

Telegram Bot API Token

Шаги по установке

Клонируйте репозиторий:

`git clone https://github.com/AlinaBorisova/interview-tg-bot-ts.git
cd interview-tg-bot-ts`


Установите зависимости:

npm install


или

yarn install


Настройте переменные окружения:

Создайте файл

.env

в корне проекта и добавьте ваш токен бота:



TELEGRAM_BOT_TOKEN=ваш_токен


Скомпилируйте TypeScript в JavaScript:

npm run build


или

yarn build


Запустите бота:

npm start


или

yarn start


Использование

После запуска бота, вы можете взаимодействовать с ним через Telegram. Просто найдите его по имени пользователя и начните чат.

Команды

/start

- Запуск бота и получение приветственного сообщения.


Структура проекта

/interview-tg-bot-ts
│
├── src
│   ├── bot.ts          # Основной файл бота
│   ├── types.ts        # Типы
│   └── utils.ts        # Утилиты и вспомогательные функции
│
├── .env                # Файл с переменными окружения
├── package.json        # Файл зависимостей
├── questions.json      # JSON с вопросами для бота
└── tsconfig.json       # Конфигурация TypeScript
