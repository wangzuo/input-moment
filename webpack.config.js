module.exports = {
  entry: {
    'dist/input-moment': './index.js',
    'example/bundle': './example/app.js',
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader'},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.less$/, loader: "style-loader!css-loader!less-loader"}
    ]
  },
  externals: {
    'react': 'React',
    'reactdom': 'ReactDOM',
    'moment': 'moment'
  },
  devtool: 'source-map'
};
