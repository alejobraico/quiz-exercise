'use strict'

const description = 'Bundles ES modules produced by TypeScript into IIFE modules with Rollup'

function usage()
{
  return require('../../utils/usage').composeUsageInformation([
    ['-d  --development ', `Uses development settings (see ${bold('run/tools/rollup/config.development.js')} for details)`],
    ['    --dependencies', `Bundles only dependencies (see ${bold('run/tools/rollup/config.dependencies.js')} for details)`],
    ['-s  --silent', 'No output unless errors are encountered by Rollup'],
    ['-w  --watch', 'Watches ES modules and rebundles development IIFE module on changes']
  ])
}

function run(args)
{
  const minimist = require('minimist')
  const {dependencies, development, silent, watch} = minimist(args, {
    alias: {d: 'development', s: 'silent', w: 'watch'},
    boolean: ['d', 'development', 'dependencies', 's', 'silent', 'w', 'watch'],
    unknown: value =>
    {
      const {bold} = require('chalk')

      throw new Error(`Invalid value ${bold(value)} passed to ${bold('rollup')} tool.`)
    }
  })
  const sequence = []

  if (watch)
    return require('../chokidar')('build/esm/**/*.js', 'node run rollup -d')

  if (!silent)
    sequence.push(`log -w Bundling${dependencies ? ' dependencies ' : ' '}JavaScript`)

  sequence.push(`rollup -c run/tools/rollup/config.${development ? 'development' : dependencies ? 'dependencies' : 'production'}.js --silent`)

  return sequence
}

module.exports = {description, usage, run}
