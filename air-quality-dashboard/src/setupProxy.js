const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/login",
    createProxyMiddleware({
      target: "http://backend.hanseojin.shop:8088",
      changeOrigin: true,
    })
  );
};
