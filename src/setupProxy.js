const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('*', {
      target: process.env.REACT_APP_BASE_URL,
      changeOrigin: true,
    }),
  );
};
