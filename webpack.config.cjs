const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const moduleDirs = [path.resolve(__dirname, "node_modules")];

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const libraryName = "react_app";

  return {
    devServer: {
      static: {
        directory: path.join(__dirname, "src"),
      },
      compress: true,
      port: 9000,
      allowedHosts: "all",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      modules: moduleDirs,
      fullySpecified: false,
      alias: {
        consola: path.resolve(__dirname, "node_modules/consola"),
      },
    },
    entry: "./src/index.tsx",
    output: {
      filename: `${libraryName}.[name].bundle.js`,
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /.m?js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
        // instead of using .babelrc, we can use babel-loader options
        {
          test: /.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-transform-runtime"],
              presets: ["@babel/preset-env", "es2015", "es2016"],
            },
          },
        },
        {
          include: /node_modules|src/,
          test: /\.css$/,
          resolve: {
            fullySpecified: false,
          },
          sideEffects: true,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve("css-loader"),
              options: {
                url: false,
              },
            },
          ],
        },
        {
          //exclude: /(node_modules)/,
          test: /\.(ts|tsx)$/,
          resolve: {
            fullySpecified: false,
          },
          use: [
            {
              loader: require.resolve("ts-loader"),
              options: {
                configFile: "tsconfig.json",
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /locale\.json$/, // match JSON files to optimize
          loader: "webpack-json-access-optimizer",
        },
        // Fixes for not importing `default` from ESM modules
        {
          test: /node_modules\/i18next\/dist\/cjs\/i18next\.js$/,
          loader: "string-replace-loader",
          options: {
            search: "module.type",
            replace: "(module.type||module.default.type)",
          },
        },
        {
          test: /node_modules\/@prosopo\/procaptcha-\w+\/dist\/cjs\/web-components\/dist\/\w+\.cjs$/,
          loader: "string-replace-loader",
          options: {
            search: /styled\.div/g,
            replace: "(styled.div||styled.default.div)",
          },
        },
        {
          test: /account\/dist\/extension\/\w+\.cjs$/,
          loader: "string-replace-loader",
          options: {
            search: /new Signer/g,
            replace: "new Signer.default",
          },
        },
        // Fix for import.meta.url
        {
          test: /packageInfo.js$/,
          loader: "string-replace-loader",
          options: {
            search: /import\.meta && import\.meta\.url/g,
            replace: "false",
          },
        },
      ],
    },

    plugins: [
      new NodePolyfillPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "extr.[contenthash].css",
      }),
    ],
    optimization: {
      noEmitOnErrors: true,
      minimize: isProduction,
      minimizer: isProduction
        ? [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
          ]
        : undefined,
      usedExports: true,
    },
  };
};
