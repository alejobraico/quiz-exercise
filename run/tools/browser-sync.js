'use strict'

const VALID_COMMANDS = ['reload', 'start']

const description = 'Starts Browsersync server and refreshes connected browsers after file changes'

function usage()
{
  const {bold} = require('chalk')
  const {EOL} = require('os')
  const commands = new Map([
    ['start ', 'Starts Browsersync server'],
    ['reload', 'Refreshes connected web browsers'],
  ])
  const args = `${bold('<command>')}`
  const body = `${bold('Commands:')}${EOL}${EOL}${Array.from(commands.keys()).map(key => `  ${bold(key)}    ${commands.get(key)}`).join(EOL)}`

  return {args, body}
}

function run(args)
{
  const {bold} = require('chalk')

  if (args.length === 0)
    throw new Error(`A command is required to use the ${bold('git')} tool. Accepts ${bold('start')} and ${bold('reload')}.`)

  const command = args[0]

  if (!VALID_COMMANDS.includes(command))
    throw new Error(`Invalid command ${bold(command)} passed to ${bold('browser-sync')} tool. Accepts ${bold('start')} and ${bold('reload')}.`)

  switch (command)
  {
    case 'start':
      return [[
        'browser-sync start --logLevel silent --no-notify --no-ui --server --serveStatic build',
        require('./chokidar')(['build/index.html', 'build/main.css', 'build/main.js', 'build/**/*.json'], 'node run browser-sync reload')
      ]]

    case 'reload':
      return [
        'log -w Refreshing connected browsers',
        'browser-sync reload'
      ]
  }
}

module.exports = {description, usage, run}
