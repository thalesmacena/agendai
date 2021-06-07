const withImages = require('next-images');

module.exports = withImages({
  esModule: true,
  env: {
    API_URL:
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:3333/'
        : 'http://localhost:3333/',
    RU_URL:
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:8080/'
        : 'http://localhost:8080/',
    LOGIN_URL:
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:3000/api'
        : 'http://localhost:3000/api',
    SECRET_COOKIE_PASSWORD: 'GWbBorjVtqutY2RdZMNACZ7jcG3n6ZGq'
  }
});
