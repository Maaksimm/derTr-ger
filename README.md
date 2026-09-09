# der Träger — клон сайта (React + TS фронтенд, Django REST бэкенд)

Репозиторий состоит из двух частей, которые работают вместе:

- **/** (этот каталог) — фронтенд: React 19 + TypeScript + Vite, SPA на
  react-router. **По умолчанию пытается получать данные с Django API**
  (список рейсов, остановки, отправка всех четырёх форм); если бэкенд
  недоступен (не запущен, сеть не настроена и т.п.), автоматически
  откатывается на встроенные моковые данные — сайт всё равно остаётся
  полностью рабочим и просматриваемым сам по себе.
- **/backend** — Django + Django REST Framework API: модели, сериализаторы
  и вьюсеты для тех же сущностей, что и во фронтенде, плюс админка и
  команда для сидирования демоданных.

Проверено вживую в связке: оба сервера подняты одновременно, CORS-запрос с
`http://127.0.0.1:5173` на `http://127.0.0.1:8000/api/...` отдаёт списки
рейсов и успешно принимает POST заявки (`201 Created`).

## Страницы фронтенда

1. `/trips` — список прямых рейсов (вкладки Одесса/Киев, фильтры, карточки
   рейсов с таймлайном остановок). Данные — с `GET /api/trips/`, с
   fallback на моки.
2. Формы, на которые ведут кнопки в карточке рейса (отправляют `POST` на
   соответствующий эндпоинт API):
   - **«Заявка на поездку» / «Записаться в очередь»** (`/trip/:tripId/passenger`)
   - **«Оформить посылку»** (`/trip/:tripId/package`)
3. Информационные страницы услуг:
   - **«Пассажирские перевозки»** (`/transportation`)
   - **«Доставка посылок»** (`/delivery`)
   - **«Отслеживание посылки»** (`/tracking`)
   - **«Перевозка машин»** (`/lafet`) + форма заказа (`/lafet/order`,
     `POST /api/car-applications/`)
   - **«Склады и остановки»** (`/points`, данные — с `GET /api/points/`) —
     фильтры, клик по адресу открывает Google Maps в новой вкладке, клик по
     названию — карточку остановки (`/point/:id`, `GET /api/points/<id>/`)
   - **«Программа лояльности»** (`/reward`) + форма участия (`/reward/join`,
     `POST /api/reward-signups/`)
   - **«Отчёт по рейсам»** (`/reports/trips`) — вкладки по водителям,
     содержимое «У вас нет доступа к этому материалу» — как в оригинале
     (это закрытый служебный отчёт, публично он и не должен быть виден)
   - **«Оплата картой»** (`/cardpayment`) — статическая информационная
     страница

## Переключение языка (RU / UA) — на всех страницах

Кнопки **RU / UA** в шапке переключают язык на любой странице сайта и
сохраняют выбор в `localStorage`. Переведено **всё**: меню, шапка, футер,
список и карточки рейсов, фильтры, все информационные страницы, все 47
вопросов FAQ (пассажирские перевозки, доставка, перевозка машин, программа
лояльности) вместе с таблицей доплат за спецгруз, все подписи и подсказки
полей всех четырёх форм, страница отслеживания посылки, отчёт по рейсам,
оплата картой, страница остановки. Единый словарь — `src/i18n/translations.ts`
(`translate(lang, key, vars?)` с подстановкой переменных вида `{{number}}`);
списки FAQ и спецгрузов вынесены в отдельные `data/faq*.tsx` /
`data/specialCargo*.ts` как функции `getXxxFaq(lang)`, а не как плоские
строки — просто и predictably расширяется.

## Важно про данные

Оригинальный сайт (`dertrager.com`) закрыт для автоматического обхода
(`robots.txt`), поэтому визуально сайт я не видел — вёрстка и данные взяты
из присланных вами HTML-страниц и переработаны в типизированную
демо-выборку. Список городов в `src/data/cities.ts`, список спецгрузов в
`src/data/specialCargo.ts` — точная выгрузка опций из присланных форм.
Список остановок в `src/data/points.ts` / посеянных в бэкенде — представительная
выборка (в оригинале 70+ точек).

## Запуск (оба сервера вместе)

\`\`\`bash
# 1. Бэкенд
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo_data   # демо-рейсы и точки
python manage.py runserver        # http://127.0.0.1:8000/api/

# 2. Фронтенд (в отдельном терминале)
cd ..
npm install
npm run dev                       # http://localhost:5173
\`\`\`

По умолчанию фронтенд обращается к `http://127.0.0.1:8000/api` — при
необходимости переопределите через `.env.local` (см. `.env.example`):

\`\`\`
VITE_API_BASE_URL=http://127.0.0.1:8000/api
\`\`\`

Если бэкенд не запущен — ничего не сломается, просто вместо API-данных
подставятся встроенные моки (`src/data/trips.ts`, `src/data/points.ts`), а
отправка форм покажет сообщение об ошибке вместо экрана успеха.

\`\`\`bash
npm run build     # production-сборка в dist/
npm run preview   # локальный просмотр production-сборки
\`\`\`

⚠️ Это SPA с client-side роутингом. При деплое на статический хостинг
настройте fallback всех путей на `index.html` (иначе прямой переход по
`/trip/20612/passenger` даст 404).

Подробности эндпоинтов, схемы данных, CORS/production-заметки — в
`backend/README.md`.

## Структура фронтенда

\`\`\`
src/
  components/       общие UI-компоненты (Header, SlideoutMenu, TripCard,
                     Accordion, PriceTable, InfoPage, ...)
  components/form/  переиспользуемые поля форм (TextField, SelectField,
                     MultiSelectField, PhoneListField, PhotoListField,
                     FormPage / ServiceFormPage — каркасы страниц форм,
                     оба поддерживают показ ошибки отправки)
  data/             моковые рейсы, список городов, список спецгрузов и их
                     доплат, тексты FAQ (getXxxFaq(lang) в faq*.tsx),
                     точки (points.ts), пункты меню
  hooks/            useTheme, useTrips / useTrip / usePoints / usePoint —
                     обёртки над lib/api.ts с fallback на моки
  i18n/             translations.ts (полные словари RU/UK) +
                     LanguageContext.tsx
  lib/              api.ts — типизированный клиент Django API
                     (fetch + мапперы snake_case → camelCase)
  pages/            TripsPage, PassengerFormPage, PackageFormPage,
                     TransportationPage, DeliveryPage, TrackingPage,
                     LafetPage, CarFormPage, PointsPage, PointDetailPage,
                     RewardPage, RewardFormPage, ReportsPage, CardPaymentPage
  styles/           CSS-токены (цвета, шрифты, радиусы)
  types.ts          типы Trip, Stop, Point, PassengerInfo и т.д.
\`\`\`

## Стек

- Фронтенд: React 19 + TypeScript, Vite 8, react-router-dom, чистый CSS
  (без UI-фреймворков). Шрифты: Space Grotesk (заголовки), IBM Plex Sans
  (текст), IBM Plex Mono (номера рейсов, время).
- Бэкенд: Django 6 + Django REST Framework + django-cors-headers, SQLite
  по умолчанию.
