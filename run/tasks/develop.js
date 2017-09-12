'use strict'

const description = 'Run initial development build of site and then starts file watchers and Browsersync server'

function run()
{
  const buildConcurrentRunnables = [
    'node run html -ds',
    `node run postcss -ds`,
    `node run scripts -s`,
    'node run tsc -s + rollup -ds'
  ]
  const watchConcurrentRunnables = [
    'node run browser-sync start',
    'node run postcss -w',
    'node run rollup -w',
    'node run tsc -w'
  ]

  return [
    'log -w Running initial development build',
    'shx rm -rf build',
    'shx mkdir build',
    `concurrently -rs first '${buildConcurrentRunnables.map(script => script.replace(/'/g, '\"')).join(`' '`)}'`,
    'shx mkdir -p build/esm',
    'log -w "Starting tools in watch mode and Browsersync server (system default web browser should open http://localhost:3000; another port may be used if 3000 is unavailable)"',
    `concurrently -c blue,green,magenta,cyan,yellow -p time -t 'HH:mm:ss' '${watchConcurrentRunnables.map(script => script.replace(/'/g, '\"')).join(`' '`)}'`
  ]
}

module.exports = {description, run}
