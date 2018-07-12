/* globals Promise */
import path from 'path';
import sass from 'node-sass';
import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss-modules';
import image from 'rollup-plugin-image';
// import resolve from 'rollup-plugin-node-resolve';
import autoprefixer from 'autoprefixer';

export default {
  input: './src/index.ts',
  output: {
    moduleName: 'MLClassifierUI',
    external: [
      'react',
      'react-dom',
    ],
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'React': 'React',
      'ReactDOM': 'ReactDOM',
    },
    name: 'MLClassifierUI',
    file: './dist/index.js',
    format: 'umd',
  },
  plugins: [
    // resolve({
    //   jsnext: true,
    // }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    commonjs({
      ignoreGlobal: false,  // Default: false
    }),
    image(),
    postcss({
      preprocessor: (content, id) => new Promise(resolve => {
        const result = sass.renderSync({ file: id });
        resolve({ code: result.css.toString() });
      }),
      extract: true,
      plugins: [autoprefixer()],
      writeDefinitions: true,
      modules: true,
      extensions: [
        '.css',
        '.scss',
      ],
      use: [
        [
          'sass',
          {
            includePaths: [
              path.resolve('node_modules'),
            ],
          },
        ],
      ],
    }),
    typescript({
    }),
  ],
};
