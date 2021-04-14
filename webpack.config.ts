import webpack from "webpack";
import path from "path";
import fs from "fs";
import WebpackUserscript from 'webpack-userscript';

const config: webpack.Configuration = {
  entry: "./src/index.ts",
  optimization: {

  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: {
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      }
    }]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "script.user.js"
  },
  resolve: {
    modules: [
      "node_modules",
      "src"
    ],
    extensions: [".ts", ".js"],
  },
  plugins: [
/*     new webpack.BannerPlugin({
      banner: fs.readFileSync(path.resolve(__dirname, "src/index.ts"), "utf-8").replace(/(==\/UserScript==)[\s\S]+$/, "$1"),
      entryOnly: true,
      raw: true
    }), */
     new WebpackUserscript({
        headers: {
          name: 'Vk music downloader',
          version: '23.08.2020.22.42',
          match: '*://*.vk.com/*',
          grant: [
            'GM_setValue',
            'GM_getValue'
          ],
          require: [],
          "run-at":'document-body'
        },
        pretty: false,
        proxyScript: {
          baseUrl: 'http://127.0.0.1:8080',
          filename: 'script.proxy.user.js',
          enable: true
        }
      })
    ],
    
};

export default config;
