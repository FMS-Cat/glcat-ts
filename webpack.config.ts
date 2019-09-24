/* eslint-env node */

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as path from 'path';
import webpack from 'webpack';
import packageJson from './package.json';

export default ( env: any, argv: any ) => {
  const VERSION = packageJson.version;
  const PROD = argv.mode === 'production';
  console.info( `Webpack: Building ${packageJson.name} ${VERSION} under ${argv.mode} mode...` );

  const banner = PROD
    ? `${packageJson.name} v${VERSION} - (c) ${packageJson.author}, MIT License`
    : `${packageJson.name} v${VERSION}
${packageJson.description}

Copyright (c) 2019 ${packageJson.author}
${packageJson.name} is distributed under the MIT License
https://opensource.org/licenses/MIT

Repository: ${packageJson.repository.url}`;

  return {
    entry: {
      [PROD ? 'glcat.min.js' : 'glcat.js']: './src/index.ts'
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
      minimize: PROD
    },
    plugins: [
      new webpack.BannerPlugin( banner ),
      new webpack.DefinePlugin( {
        'process.env': { PROD },
      } ),
      ...( PROD ? [
        // nothing in there
      ] : [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin( { checkSyntacticErrors: true } ),
      ] ),
    ],
    devtool: PROD ? false : 'inline-source-map'
  };
};
