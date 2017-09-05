'use strict'

const description = 'Run initial development build of site and then starts file watchers and Browsersync server'

const run = [
  'log -w Running initial development build',
  `concurrently -rs first '${[
    'node run tsc -s + rollup -s --dependencies + rollup -ds',
    'node run postcss -ds',
    'node run json -ds',
    'node run html -ds'
  ].map(script => script.replace(/'/g, '\"')).join(`' '`)}'`,
  'shx mkdir -p build/esm',
  'log -w "Starting tools in watch mode and Browsersync server (system default web browser should open http://localhost:3000; another port may be used if 3000 is unavailable)"',
  `concurrently -c blue,green,magenta,cyan,yellow -p time -t 'HH:mm:ss' '${[
    'node run tsc -w',
    'node run rollup -w',
    'node run postcss -w',
    'node run json -w',
    'node run browser-sync start'
  ].map(script => script.replace(/'/g, '\"')).join(`' '`)}'`
]

module.exports = {description, run}
