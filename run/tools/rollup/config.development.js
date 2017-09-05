import config from './config.application'

export default Object.assign({}, config,
{
  external: [
    'preact',
    'preact-router/match'
  ],
  globals: {
    'preact': 'dependencies.Preact',
    'preact-router/match': 'dependencies.Match'
  }
})
