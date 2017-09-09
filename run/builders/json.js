'use strict'

const description = 'Coverts TOML content files into JSON'

function usage()
{
  return require('../utils/usage').composeUsageInformation([
    ['-d  --development', 'Uses development settings (formatted JSON)'],
    ['-s  --silent', 'No output unless errors are encountered'],
    ['-w  --watch', 'Watches TOML files and rebuilds development JSON files after any changes']
  ])
}

function run(args)
{
  const {development, silent, watch} = require('minimist')(args, {
    alias: {d: 'development', s: 'silent', w: 'watch'},
    boolean: ['d', 'development', 's:', 'silent', 'w', 'watch'],
    unknown: value =>
    {
      const {bold} = require('chalk')

      throw new Error(`Invalid value ${bold(value)} passed to ${bold('json')} builder.`)
    }
  })

  if (watch)
    return require('../tools/chokidar')('content/*.toml', 'node run json -d + tsc')

  if (!silent)
    require('../utils/log').wait('Building JSON files')

  const {existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync} = require('fs')
  const {parse, resolve} = require('path')
  const {parseTOML} = require('../utils/toml')
  const rootDirectoryPath = resolve(__dirname, '../..')
  const buildDirectoryPath = resolve(rootDirectoryPath, 'build')
  const contentDirectoryPath = resolve(rootDirectoryPath, 'content')

  if (!existsSync(buildDirectoryPath))
    mkdirSync(buildDirectoryPath)

  readdirSync(contentDirectoryPath)
    .map(fileName => parse(fileName).name)
    .forEach(name =>
      writeFileSync(
        resolve(buildDirectoryPath, `${name}.json`),
        JSON.stringify(parseTOML(resolve(contentDirectoryPath, `${name}.toml`)), undefined, development ? 2 : 0)
      )
    )
}

module.exports = {description, usage, run}
