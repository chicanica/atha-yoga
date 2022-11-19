const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  context: path.resolve(__dirname, 'src'),
  entry: './index.jsx',
  output: {
    path: path.resolve(__dirname, './dist/assets'),
    filename: 'main.js',
    clean: true,
  },

  watch: NODE_ENV === 'development',
  watchOptions: {
    aggregateTimeout: 100,
  },

  devtool: NODE_ENV === 'development' ? 'eval-source-map' : false,

  resolve: {
    modules: ['node_modules'],
    extensions: ['', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: 'favicon.ico',
      templateContent: `
        <html><body><div id="root"></div></body></html>
      `,

    }),
    new MiniCssExtractPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(css|scss|)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'scoped-css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[ext]',
        },
      },
    ],
  },

  devServer: {
    host: 'localhost',
    port: 8080,
    static: './dist',
    hot: NODE_ENV === 'development',
    open: true,
  },

};
