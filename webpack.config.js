const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserJSPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./client/**/*.js", "./client/**/*.jsx"],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})

module.exports = (env, args) => {
  return {
    mode: args.mode || "development",
    entry: ["@babel/polyfill", "./client/app"],
    output: {
      path: path.resolve(__dirname, "./public/"),
      filename: "./dist/js/bundle.js"
    },
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    resolve: {
      extensions: [".js", ".jsx", ".scss", ".css"]
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
              ? { loader: "style-loader", options: { sourceMap: true } }
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    esModule: true
                  }
                },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: args.mode === "production"
              }
            }, // translates CSS into CommonJS
            {
              loader: "postcss-loader",
              options: {
                sourceMap: args.mode === "production",
                ident: "postcss",
                plugins: [
                  require("tailwindcss")("./tailwind.config.js"),
                  require("autoprefixer"),
                  ...(args.mode === "production" ? [purgecss] : [])
                ]
              }
            },
            {
              loader: "sass-loader",
              options: { sourceMap: args.mode === "production" }
            } // compiles Sass to CSS, using Node Sass by default
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "/dist/style/[name].css",
        chunkFilename: "/dist/style/[id].css"
      })
    ]
  }
}
