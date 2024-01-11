import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';
import express from 'express';

const app: Application = express();

// 프록시 미들웨어 설정
app.use(
  '/ISteamApps/GetAppList',
  createProxyMiddleware({
    target: 'https://api.steampowered.com',
    changeOrigin: true,
    onError: (err, req, res) => {
      console.error('프록시 서버 오류:', err);
      res.status(500).send('Internal Server Error');
    }
  })
);
app.use('/api', createProxyMiddleware({ target: 'https://store.steampowered.com', changeOrigin: true }));
app.use(express.static('public'));

// // 서버 시작
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port http://localhost:${PORT}`);
// });
