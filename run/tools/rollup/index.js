'use strict'

const description = 'Bundles ES modules produced by TypeScript into IIFE modules with Rollup'

function usage()
{
  return require('../../utils/usage').composeUsageInformation([
    ['-d  --development ', `Uses development settings (see ${bold('run/tools/rollup/config.development.js')} for details)`],
    ['-s  --silent', 'No output unless errors are encountered by Rollup'],
    ['-w  --watch', 'Watches ES modules and rebundles development IIFE module on changes']
  ])
}

function run(args)
{
  const {development, silent, watch} = require('minimist')(args, {
    alias: {d: 'development', s: 'silent', w: 'watch'},
    boolean: ['d', 'development', 's', 'silent', 'w', 'watch'],
    unknown: value =>
    {
      const {bold} = require('chalk')

      throw new Error(`Invalid value ${bold(value)} passed to ${bold('rollup')} tool.`)
    }
  })

  if (watch)
    return require('../chokidar')('build/esm/**/*.js', 'node run rollup -d')

  return (silent ? [] : [`log -w Bundling JavaScript`]).concat([`rollup -c run/tools/rollup/config.${development ? 'development' : 'production'}.js --silent`])
}

module.exports = {description, usage, run}
