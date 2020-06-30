const config = require('../../config');

module.exports = {
  publicPath: './',
  
  devServer: {
    proxy: {
      '/api/*': {
        target: `http://${config.http.hostname}:${config.http.port}`,
        secure: false
      },
      
      '/static_files/*': {
        target: `http://${config.http.hostname}:${config.http.port}`,
        secure: false
      }
    }
  }
};
