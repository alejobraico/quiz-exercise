import babel from 'rollup-plugin-babel'
import config from './config.base'

export default Object.assign({}, config, {
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
