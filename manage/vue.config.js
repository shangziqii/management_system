const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://3j783p6226.zicp.fun/student_manage/',
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
      }
    }
  }
})
