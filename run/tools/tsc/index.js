'use strict'

const description = 'Transpiles TypeScript into JavaScript ES modules'

function usage()
{
  return require('../../utils/usage').composeUsageInformation([
    ['-s  --silent', 'No output unless errors are encountered by compiler'],
    ['-w  --watch', 'Run compiler in watch mode']
  ])
}

function run(args)
{
  const {silent, watch} = require('minimist')(args, {
    alias: {s: 'silent', w: 'watch'},
    boolean: ['s:', 'silent', 'w', 'watch'],
    unknown: value =>
    {
      const {bold} = require('chalk')

      throw new Error(`Invalid value ${bold(value)} passed to ${bold('tsc')} tool.`)
    }
  })

  if (watch)
    return new Promise((resolve, reject) =>
    {
      const {EOL} = require('os')
      const childProcess = require('cross-spawn')('tsc', ['-p', 'run/tools/tsc/config.json', '--watch'])
      const log = require('../../utils/log')
      let outputBuffering  = false
      let outputBuffer = ''

      childProcess.stdout.on('data', buffer =>
      {
        const value = buffer.toString().trim()

        if (value.includes('Compilation complete'))
        {
          if (outputBuffer)
          {
            console.log(`${outputBuffer}${EOL}`)

            outputBuffer = ''
          }

          else
            log.success('TypeScript transpile complete')
        }

        else if (!value.includes('File change detected'))
          outputBuffer += `${EOL}${value}`
      })

      childProcess.on('close', code => resolve())
    })

  const sequence = []

  if (!silent)
    sequence.push('log -w Transpiling TypeScript')

  sequence.push('tsc -p run/tools/tsc/config.json')

  return sequence
}

module.exports = {description, run, usage}
