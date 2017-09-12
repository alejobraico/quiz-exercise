'use strict'

const description = 'Copies development dependency scripts into build'

function usage()
{
  return require('../utils/usage').composeUsageInformation([
    ['-s  --silent', 'No output unless errors are encountered']
  ])
}

function run(args)
{
  const {silent} = require('minimist')(args, {
    alias: {s: 'silent'},
    boolean: ['s:', 'silent'],
    unknown: value =>
    {
      const {bold} = require('chalk')

      throw new Error(`Invalid value ${bold(value)} passed to ${bold('scripts')} builder.`)
    }
  })

  return (silent ? [] : ['log -w Copying development dependency scripts into build']).concat([
    'shx mkdir -p build',
    `shx cp -r ${paths.map(path => `node_modules/${path}`).join(' ')} build`
  ])
}

const paths = [
  'preact/dist/preact.dev.js'
]

module.exports = {description, usage, run, paths}
