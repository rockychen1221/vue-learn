const path = require("path");

const port = 7895;
// const port = process.env.port || process.env.npm_config_port || 7895;
const API = {
  gate_prefix: "/g/",
};

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  assetsDir: "assets",
  outputDir: "dist",
  productionSourceMap: false,
  devServer: {
    // can be overwritten by process.env.HOST
    host: "0.0.0.0",
    port: port,
    open: true,
    https: false,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // name: name,
    // 路径别名，如用“@”指代“src”等
    // Path alias, such as "@" for "src", etc.
    resolve: {
      alias: {
        "vue$": 'vue/dist/vue.esm.js',
        "@": resolve("src"),
        src: resolve("src"),
        views: resolve("src/views"),
        static: resolve("src/assets"),
        components: resolve("src/components"),
      },
    },
  },
  chainWebpack: (config) => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload');
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    
    // svg config
    // const svgRule = config.module.rule("svg");
    // svgRule.uses.clear();
    // svgRule
    //   .use("svg-sprite-loader")
    //   .loader("svg-sprite-loader")
    //   .options({
    //     symbolId: "icon-[name]",
    //   });
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          icon: "./public/app.ico",
        },
        mac: {
          icon: "./public/app.png",
        },
        productName: "Harbour",
      },
    },
    // i18n config
    i18n: {
      locale: "zh_CN",
      fallbackLocale: "en_US",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false,
    loaderOptions: {
      sass: {
        additionalData: `
            @import "~@/styles/scss/index.scss";
        `,
      },
      less: {
        // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            hack: `true; @import "~@/styles/less/index.less";`,
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};
