import config from './config.base'

export default Object.assign({}, config,
{
  external: [
    'preact'
  ],
  globals: {
    'preact': 'preact'
  }
})
