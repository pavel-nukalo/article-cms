module.exports = {
  http: {
    hostname: 'localhost',
    port: 3203
  },

  https: {
    hostname: '0.0.0.0',
    port: 443,
    ssl: {
      key: '',
      cert: ''
    },
    enable: false
  },

  mongodb: {
    url: ''
  },

  expressSession: {
    secret: 'mySecretKey',
    resave: true,
    saveUninitialized: true,
    name: 'sessionId',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365
    }
  },

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    cookie: 'language'
  },

  pagination: {
    limit: 9
  },

  app: {
    configure: app => {
      
    }
  },

  staticFilesDirectory: '../static_files'
};