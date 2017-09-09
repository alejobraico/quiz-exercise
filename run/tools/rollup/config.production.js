import babel from 'rollup-plugin-babel'
import config from './config.base'

export default Object.assign({}, config, {
  dest: 'build/main.js',
  entry: 'build/esm/main.js',
  plugins: config.plugins.concat([
    babel({
      babelrc: false,
      presets: [
        ['env', {
          modules: false,
          targets: {
            browsers: require('../browserslist.json')
          }
        }]
      ]
    })
  ])
})
