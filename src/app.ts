import express from 'express';
import bodyParser from 'body-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

const proxy = createProxyMiddleware({
  target: 'localhost:3000/test',
  router: function (req) {
    return 'localhost:4000/';
  },
  changeOrigin: true,
});

app.use('/', proxy);

app.use('/test', (req, res) => {
  res.send('hello world');
});

app.listen(PORT, () => {
  console.log(`Webhook proxy listening on port ${PORT}`);
});
