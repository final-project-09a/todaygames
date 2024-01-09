import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

// const app: Application = express();

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = function (app: Application): void {
  app.use(
    '/ISteamApps/GetAppList',
    createProxyMiddleware({
      target: 'https://api.steampowered.com',
      changeOrigin: true
    })
  );
};

// module.exports = function (app: Application): void {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:5000',
//       changeOrigin: true
//     })
//   );
// };
