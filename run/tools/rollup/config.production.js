import babel from 'rollup-plugin-babel'
import config from './config.application'

export default Object.assign({}, config, {
  plugins: config.plugins.concat([
    babel({
      babelrc: false,
      presets: [
        ['env', {
          modules: false,
          targets: {
            browsers: ['>= 5%']
          }
        }]
      ]
    })
  ])
})
