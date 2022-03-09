const { createProxyMiddleware } = require('http-proxy-middleware');

export default function (app) {
  app.use(
    createProxyMiddleware('*', {
      target: 'https://accounts.spotify.com',
      changeOrigin: true,
    }),
  );
}
