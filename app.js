const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const port = process.env.PORT || 3000;

const app = express();

const proxy = createProxyMiddleware({
  target: "http://www.example.org",
  changeOrigin: true, // needed for virtual hosted sites
  router: {
    "integration.localhost:3000": "http://localhost:3000/test",
  },
});

app.use("/api", proxy);

app.use("/test", (req, res) => {
  const { body } = res;
  res.json(body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
