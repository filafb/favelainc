const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env, args) => {
  console.log(path.resolve(__dirname, "./public/style"))
  return {
    mode: args.mode || "development",
    entry: ["@babel/polyfill", "./client/app"],
    output: {
      path: path.resolve(__dirname, "./public/"),
      filename: "./js/bundle.js"
    },
    resolve: {
      extensions: [".js", ".jsx", ".scss"]
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          exclude: /node_modules/,
          use: [
            args.mode !== "production"
              ? "style-loader"
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    esModule: true
                  }
                },
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "/style/[name].css",
        chunkFilename: "/style/[id].css"
      })
    ]
  }
}
