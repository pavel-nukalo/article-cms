# Article CMS

### О проекте
Данный проект позволяет пользователям, без знаний программироавния, создать статейный сайт. Редактировать страницы очень легко, за эту возможность отвечает библиотека [Editor.js](https://editorjs.io/).

На изображении ниже приведена панель администратора, вкладка редактирование статьи.

![Превью проекта](preview.jpg?raw=true)

Данный проект использует следующие технологии:

  - UI/UX архитектура и дизайн (Material Design)
  - Javascript ES8, ES9
  - MongoDB
  - Express.js
  - Node.js
  - i18n
  - Passport.js
  - REST API
  - Vue.js
  - Vuetify
  - Vuex
  - Vue router
  - Editor.js
  - HTML5
  - CSS3
  - Mobile friendly
  - Twitter Bootstrap 4
  

### Установка

Article CMS требует [Node.js](https://nodejs.org/) v8+ для запуска.
Установите все необходимые пакеты:

```sh
$ cd article-cms
$ npm install
```

### Конфигурирование

1. Установите MongoDB или создайте облачный MongoDB сервер, например с помощью сервиса [mLab](https://mlab.com/).
3. Заполните файл `config.js` параметрами доступа к БД.

Создайте одного или несколько пользователей:
```sh
$ npm run create-user
```

Инициализируйте БД:
```sh
$ npm run initialize-db
```

### Запуск
Запустите проект, используя следующую команду:

```sh
$ npm run start
```
Лицензия
----

MIT

Copyright (c) 2020 [Павел Нукало](https://pavel-nukalo.com/)

Данная лицензия разрешает лицам, получившим копию данного программного обеспечения и сопутствующей документации (в дальнейшем именуемыми «Программное обеспечение»), безвозмездно использовать Программное обеспечение без ограничений, включая неограниченное право на использование, копирование, изменение, слияние, публикацию, распространение, сублицензирование и/или продажу копий Программного обеспечения, а также лицам, которым предоставляется данное Программное обеспечение, при соблюдении следующих условий:

  - Указание ссылки на автора данного ПО.

Указанное выше уведомление об авторском праве и данные условия должны быть включены во все копии или значимые части данного Программного обеспечения.