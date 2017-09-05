'use strict'

const description = 'Runs complete build of site'

function usage()
{
  return require('../utils/usage').composeUsageInformation([
    ['-d  --development', 'Runs development build'],
    ['-s  --silent', 'No output unless errors are encountered by tools']
  ])
}

function run(args)
{
  const minimist = require('minimist')
  const {development, silent} = minimist(args, {
    alias: {d: 'development', s: 'silent'},
    boolean: ['d', 'development', 's', 'silent']
  })
  const sequence = [
    'shx rm -rf build',
    [
      `tsc${silent ? ' -s' : ''}`,
      `postcss${development ? ' -d' : ''}${silent ? ' -s' : ''}`,
      `json${development ? ' -d' : ''}${silent ? ' -s' : ''}`
    ]
  ]

  if (development)
  {
    sequence[1].push(`html -d${silent ? ' -s' : ''}`)
    sequence.push(
      `rollup --dependencies${silent ? ' -s' : ''}`,
      `rollup -d${silent ? ' -s' : ''}`,
      'shx rm -rf build/esm'
    )
  }

  else
    sequence.push(
      `rollup${silent ? ' -s' : ''}`,
      `html${silent ? ' -s' : ''}`,
      'shx rm -rf build/esm build/main.css build/main.js'
    )

  if (!silent)
    sequence.push('log -s Build complete')

  return sequence
}

module.exports = {description, run, usage}
