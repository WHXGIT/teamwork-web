module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      'api/*': {
        target: 'http://127.0.0.1:10001',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  publicPath:
    process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/'
}
