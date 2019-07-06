const path = require('path');

const shared = {
  mode: 'production',
  entry: {
    index: './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};

module.exports = [
  {
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'dist/cjs'),
      filename: '[name].js',
      libraryTarget: 'commonjs2',
    },
    externals: {
      react: 'react',
      'react-dom/server': 'react-dom/server',
    },
    ...shared,
  },
  {
    output: {
      path: path.resolve(__dirname, 'dist/umd'),
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'ReactCodePenPrefillEmbed',
    },
    externals: {
      react: 'React',
      'react-dom/server': 'ReactDOMServer',
    },
    ...shared,
  },
];
