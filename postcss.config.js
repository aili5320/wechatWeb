module.exports = {
  //...其他配置
  css: {
      loaderOptions: {
          postcss: {
              plugins: [
                  require('postcss-pxtorem')({
                      rootValue: 37.5,
                      propList: ['*']
                  })
              ]
          },
              sass: {
                  // 配置scss文件全局变量,没有分号会报错
                  data: `@import "@ui/common.scss";` // 旧版sass-loader写法(8.0以下)
                  // prependData: `@import "@ui/common.scss";` // 新版scss-loader(8.0及以上)
              }
      }
  },
}
module.exports = {
  "plugins": {
      'postcss-pxtorem': {
          rootValue: 37.5,
          propList: ['*']
      }
  }
}