const express = require("express");
const bodyParser = require("body-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

const proxy = createProxyMiddleware({
  router: function (req) {
    // TODO: Prase the Environment Ingress URL
    console.log(req?.body);
    return req?.body?.url || "http://localhost:3000/test";
  },
  changeOrigin: true,
});

app.use("/", proxy);

app.use("/test", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`Webhook proxy listening on port ${PORT}`);
});
