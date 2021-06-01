// const CompressionPlugin = require("compression-webpack-plugin");

const pkgDate = (() => {
  const DATE = new Date();
  let m = DATE.getMonth() + 1;
  let d = DATE.getDate();
  m = m >= 10 ? m : `0${m}`;
  d = d >= 10 ? d : `0${d}`;
  return `${m}${d}`;
})();
const pkgName = process.env.dist_package_name;
const zipPath = `./dist/${pkgName}-${pkgDate}-01.zip`;

// console.log("打包路径：", zipPath);
// console.log("author:", process.env.VUE_APP_AUTHOR);

const cdn = {
  css: ["https://unpkg.com/element-ui@2.15.1/lib/theme-chalk/index.css"],
  js: [
    "https://unpkg.com/vue@2.6.11/dist/vue.min.js",
    "//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js",
    "//unpkg.com/vuex@3.1.1/dist/vuex.min.js",
    "//unpkg.com/axios@0.19.0/dist/axios.min.js",
    "//unpkg.com/element-ui@2.10.1/lib/index.js"
  ]
};

const path = require("path");
const resolve = dir => {
  return path.join(__dirname, dir); //path.join()  拼接路径
};
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // assetsDir: "static",
  filenameHashing: false,
  assetsDir: "static",
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    // 打包忽略文件
    externals: {
      vue: "Vue",
      // "element-ui": "ELEMENT",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios"
      // moment: "moment",
      // xlsx: "XLSX",
    }
  },
  chainWebpack: config => {
    //HtmlWebpackPlugin插件参数
    config.plugin("html").tap(args => {
      // console.log("args:", args[0]);
      args[0].title = "vuetest_project";
      args[0].isDevelop = process.env.NODE_ENV === "development" ? true : false;
      args[0].cdn = cdn;
      return args;
    });

    //配置路径别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("Views", resolve("src/views"))
      .set("Assets", resolve("src/assets"))
      .set("Components", resolve("src/components"));

    // 开启图片压缩
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        bypassOnDebug: true
      })
      .end();
    // disable: false //此处为ture的时候不会启用压缩处理,目的是为了开发模式下调试速度更快,网上错误示例直接写为disable:true,如果不去查看文档肯定是要被坑的
    if (process.env.NODE_ENV === "production") {
      config.plugin("zip").use(require("filemanager-webpack-plugin"), [
        {
          onEnd: {
            delete: [zipPath],
            archive: [
              {
                source: "./dist",
                destination: zipPath
              }
            ]
          }
        }
      ]);
    }
    // 开启js、css压缩
    /* if (process.env.NODE_ENV === "production") {
      config.plugin("compressionPlugin").use(
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: true // 不删除源文件
        })
      );
    } */
  }
};
