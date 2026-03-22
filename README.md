# Nashmaster.pro

Одностраничный сайт-визитка: отделочный ремонт, сантехника, электрика.

Публичный домен: **https://nashmaster.pro/** — при смене хостинга обновите **`canonical`**, **`og:url`**, **JSON-LD** (`url`) и **`siteUrl`** в `public/assets/js/site-config.js`.

## Технологии

- **HTML5** — разметка
- **Tailwind CSS** — через CDN (`cdn.tailwindcss.com`)
- **Font Awesome 6** — иконки (CDN)
- **JavaScript** — конфиг сайта, данные галереи/отзывов, UI (меню, якоря, галерея)
- **Google Fonts (Manrope, Plus Jakarta Sans)** — шрифты

## Структура

Корень репозитория — документация и CI. **Всё, что отдаётся на сайт, лежит в `public/`.** GitHub Actions деплоит только эту папку.

```
public/
  index.html
  robots.txt          — индексация и ссылка на sitemap
  sitemap.xml         — карта сайта (при крупных правках обновите `lastmod`)
  CNAME               — кастомный домен для GitHub Pages (в файле: `nashmaster.pro`)
  site.webmanifest
  favicon.ico, favicon-*.png, apple-touch-icon.png, android-chrome-*.png
  assets/
    css/styles.css    — кастомные стили (layout, галерея, отзывы, FAB, цены)
    js/
      site-config.js  — телефон, мессенджеры, URL сайта, фон hero; `data-contact` в разметке
      data.js         — слайды галереи и тексты отзывов
      app.js          — рендер галереи/отзывов, меню, плавный скролл, стрелки галереи
    images/           — max.svg, gallery/
```

Подключение в `public/index.html` (в конце `body`): **`assets/js/site-config.js` → `data.js` → `app.js`**.

## Локальный просмотр

Откройте **`public/index.html`** в браузере или поднимите статический сервер с корнем **`public/`**, например:

```bash
cd public && python3 -m http.server 8080
```

Затем перейдите на `http://localhost:8080/`.

## Правки контента и контактов

- **Телефон, ссылки Telegram / Max / Mail, фон hero** — `public/assets/js/site-config.js` (объект `SITE`, глобально доступен как `window.__SITE_CONFIG`).
- **Галерея и отзывы** — `public/assets/js/data.js` (`__GALLERY_ITEMS`, `__REVIEWS`).
- В разметке ссылки помечены **`data-contact`** (`tel`, `telegram`, `max`, `mail`); отображаемый номер — элемент с **`data-contact-display="phone"`**.

После смены телефона или домена обновите также **JSON-LD** в `public/index.html` (поля `telephone`, `url`), **canonical**, **og:image** при необходимости. Тексты **FAQ** на странице и блок **FAQPage** в JSON-LD должны совпадать.

## SEO

- В **`public/robots.txt`** указан `Sitemap: https://nashmaster.pro/sitemap.xml`.
- После деплоя добавьте сайт в **[Яндекс.Вебмастер](https://webmaster.yandex.ru/)** и **[Google Search Console](https://search.google.com/search-console)** и укажите sitemap `https://nashmaster.pro/sitemap.xml`.
- Для локального поиска полезны карточки **Яндекс.Бизнес** и **Google Business Profile** (оформляются вне репозитория).
- Для соцсетей в мета-тегах используется изображение `https://nashmaster.pro/android-chrome-512x512.png`; при желании замените на отдельный баннер 1200×630 в `public/assets/images/` и обновите `og:image` / `twitter:image` в `index.html`.

## Деплой

Workflow **Deploy static site to GitHub Pages** выкладывает содержимое каталога **`public/`**. Для сайта **Nashmaster.pro** в настройках Pages укажите custom domain `nashmaster.pro` и при необходимости включите **Enforce HTTPS**.
