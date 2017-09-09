'use strict'

const description = 'Transpiles and bundles CSS using PostCSS with cssnext and cssnano'

function usage()
{
  return require('../utils/usage').composeUsageInformation([
    ['-d  --development', 'Uses development settings (no minification)'],
    ['-s  --silent', 'No output unless errors are encountered by PostCSS'],
    ['-w  --watch', 'Watches source CSS files and rebuilds site CSS on changes']
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

      throw new Error(`Invalid value ${bold(value)} passed to the ${bold('postcss')} tool.`)
    }
  })

  if (watch)
    return require('./chokidar')('source/**/*.css', 'node run postcss -d')

  if (!silent)
  {
    const log = require('../utils/log')

    log.wait('Bundling CSS')
  }

  const {existsSync, mkdirSync, readFileSync, writeFileSync} = require('fs')
  const {resolve} = require('path')
  const postcss = require('postcss')
  const rootDirectoryPath = resolve(__dirname, '../..')
  const buildDirectoryPath = resolve(rootDirectoryPath, 'build')
  const sourceDirectoryPath = resolve(rootDirectoryPath, 'source')
  const css = readFileSync(resolve(sourceDirectoryPath, 'main.css')).toString()
  const plugins = [
    require('postcss-import')({root:sourceDirectoryPath}),
    require("stylelint")({
      extends:'stylelint-config-standard',
      rules:{
        'at-rule-empty-line-before': null,
        'comment-empty-line-before': null,
        'number-leading-zero': null,
        'rule-empty-line-before': null,
        'selector-list-comma-newline-after': null
      }
    }),
    require('postcss-cssnext')({browsers:require('./browserslist.json'), warnForDuplicates:false}),
    require('postcss-reporter')
  ]

  if (!development)
    plugins.push(require('cssnano')())

  if (!existsSync(buildDirectoryPath))
    mkdirSync(buildDirectoryPath)

  return postcss(plugins)
    .process(css)
    .then(result => writeFileSync(resolve(rootDirectoryPath, 'build', 'main.css'), result.css))
}

module.exports = {description, usage, run}
