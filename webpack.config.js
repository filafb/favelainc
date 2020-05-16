const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserJSPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./client/**/*.js", "./client/**/*.jsx"],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})

module.exports = (env, args) => {
  const isProd =
    args.mode === "production" || process.env.NODE_ENV === "production"
  return {
    mode: args.mode || "development",
    entry: ["@babel/polyfill", "./client/app"],
    output: {
      path: path.join(__dirname, "public/"),
      filename: "dist/bundle.js",
      publicPath: "/"
    },
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    resolve: {
      extensions: [".js", ".jsx", ".scss", ".css"]
    },
    devtool: isProd ? false : "source-map",
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
                sourceMap: !isProd
              }
            }, // translates CSS into CommonJS
            {
              loader: "postcss-loader",
              options: {
                sourceMap: !isProd,
                ident: "postcss",
                plugins: [
                  require("tailwindcss")("./tailwind.config.js"),
                  require("autoprefixer"),
                  ...(isProd ? [purgecss] : [])
                ]
              }
            },
            {
              loader: "sass-loader",
              options: { sourceMap: !isProd }
            } // compiles Sass to CSS, using Node Sass by default
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "dist/[name].css",
        chunkFilename: "dist/[id].css"
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/template/index.html"),
        title: "Favela Inc App",
        scriptLoading: "defer",
        filename: "dist/index.html"
      })
    ]
  }
}
