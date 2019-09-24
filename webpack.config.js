const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );
const os = require( 'os' );
const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = ( env, argv ) => {
  const DEBUG = argv.mode === 'development';

  return {
    entry: {
      'glcat.js': './src/index.ts'
    },
    output: {
      path: path.join( __dirname, 'dist' ),
      filename: '[name]',
      library: 'GLCat',
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
      host: '0.0.0.0',
      port: 3000,
      contentBase: path.resolve( __dirname ),
      publicPath: '/dist/',
      openPage: 'examples/index.html',
      watchContentBase: true,
      inline: true,
      historyApiFallback: true,
      noInfo: true
    },
    optimization: {
      minimize: !DEBUG
    },
    plugins: [
      new webpack.DefinePlugin( {
        'process.env': { DEBUG: DEBUG },
      } ),
      ...( DEBUG ? [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin( { checkSyntacticErrors: true } ),
      ] : [
        // nothing in there
      ] ),
    ],
    devtool: DEBUG ? 'inline-source-map' : false
  }
};