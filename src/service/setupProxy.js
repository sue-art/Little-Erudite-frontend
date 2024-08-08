const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://www.googleapis.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
