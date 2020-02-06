/* eslint-env node */

const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );
const path = require( 'path' );
const webpack = require( 'webpack' );
const packageJson = require( './package.json' );

module.exports = ( env, argv ) => {
  const isProd = argv.mode === 'production';
  console.info( `Webpack: Building ${packageJson.name} ${packageJson.version} under ${argv.mode} mode...` );

  const banner = isProd
    ? `${packageJson.name} v${packageJson.version} - (c) ${packageJson.author}, MIT License`
    : `${packageJson.name} v${packageJson.version}
${packageJson.description}

Copyright (c) 2019 ${packageJson.author}
${packageJson.name} is distributed under the MIT License
https://opensource.org/licenses/MIT

Repository: ${packageJson.repository.url}`;

  return {
    entry: {
      [isProd ? 'glcat.min.js' : 'glcat.js']: './src/index.ts'
    },
    output: {
      path: path.join( __dirname, 'dist' ),
      filename: '[name]',
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: { happyPackMode: true, transpileOnly: true }
            }
          ]
        }
      ]
    },
    resolve: {
      modules: [ 'node_modules' ],
      extensions: [ '.ts', '.js' ]
    },
    devServer: {
      contentBase: path.resolve( __dirname, './' ),
      publicPath: '/dist/',
      openPage: 'example/example.html',
      watchContentBase: true,
      inline: true
    },
    optimization: {
      minimize: isProd
    },
    plugins: [
      new webpack.BannerPlugin( banner ),
      new webpack.DefinePlugin( {
        'process.env': { PROD: isProd },
      } ),
      ...( isProd ? [
        // nothing in there
      ] : [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin( { checkSyntacticErrors: true } ),
      ] ),
    ],
    devtool: isProd ? false : 'inline-source-map'
  };
};
