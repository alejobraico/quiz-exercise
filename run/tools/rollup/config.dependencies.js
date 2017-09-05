import config from './config.base'

export default Object.assign({}, config, {
  entry: 'build/esm/dependencies.js',
  dest: 'build/dependencies.js',
  moduleName: 'dependencies'
})
