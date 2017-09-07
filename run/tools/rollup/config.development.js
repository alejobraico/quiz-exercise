import config from './config.base'

export default Object.assign({}, config,
{
  dest: 'build/main.js',
  entry: 'build/esm/main.js',
  external: [
    'preact'
  ],
  globals: {
    'preact': 'dependencies.Preact'
  }
})
