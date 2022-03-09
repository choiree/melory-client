const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('*', {
      target: 'https://accounts.spotify.com',
      changeOrigin: true,
    }),
  );
};
