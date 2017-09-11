'use strict'

const description = 'Checks TypeScript for errors with TSLint'

function usage()
{
  return require('../../utils/usage').composeUsageInformation([
    ['-s  --silent', 'No output unless errors are encountered']
  ])
}

function run(args)
{
  const {silent} = require('minimist')(args, {
    alias: {s: 'silent',},
    boolean: ['s', 'silent'],
    unknown: value =>
    {
      const {bold} = require('chalk')

      throw new Error(`Invalid value ${bold(value)} passed to the ${bold('postcss')} tool.`)
    }
  })

  if (!silent)
    require('../../utils/log').wait('Checking TypeScript for errors with TSLint')

  return new Promise((resolve, reject) =>
  {
    const childProcess = require('cross-spawn')('tslint', ['-c', 'run/tools/tslint/config.json', '-p', 'run/tools/tsc/config.json', '--type-check', 'source/**/*.ts*'])
    let errors = ''

    childProcess.stderr.on('data', data => errors += data)
    childProcess.stdout.on('data', data => errors += data)

    childProcess.on('close', code =>
    {
      errors = errors.trim()

      if (errors)
        return reject(errors)

      resolve()
    })
  })
}

module.exports = {description, run, usage}
