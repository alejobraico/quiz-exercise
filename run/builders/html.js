'use strict'

const description = 'Builds site HTML file'

function usage()
{
  return require('../utils/usage').composeUsageInformation([
    ['-d  --development', 'Uses development settings'],
    ['-s  --silent', 'No output unless errors are encountered']
  ])
}

function run(args)
{
  const minimist = require('minimist')
  const {development, silent} = minimist(args, {
    alias: {d: 'development', s: 'silent'},
    boolean: ['d', 'development', 's:', 'silent'],
    unknown: value =>
    {
      const {bold} = require('chalk')

      throw new Error(`Invalid value ${bold(value)} passed to ${bold('html')} builder.`)
    }
  })

  if (!silent)
    require('../utils/log').wait('Building HTML file')

  const {existsSync, mkdirSync, readFileSync, writeFileSync} = require('fs')
  const {parse, resolve} = require('path')
  const rootDirectoryPath = resolve(__dirname, '../..')
  const buildDirectoryPath = resolve(rootDirectoryPath, 'build')
  const sourceDirectoryPath = resolve(rootDirectoryPath, 'source')
  let html = readFileSync(resolve(sourceDirectoryPath, 'index.html')).toString()

  if (!existsSync(buildDirectoryPath))
    mkdirSync(buildDirectoryPath)

  if (development)
  {
    html = html
      .replace('</head>', `  <link rel="stylesheet" href="/main.css">\n  </head>`)
      .replace('</body>', `\n    <script src="/dependencies.js"></script>\n    <script src="/main.js"></script>\n  </body>`)

    writeFileSync(resolve(buildDirectoryPath, 'index.html'), html)
  }

  else
  {
    const cssPath = resolve(buildDirectoryPath, 'main.css')
    const jsPath = resolve(buildDirectoryPath, 'main.js')
    const jsonPath = resolve(buildDirectoryPath, 'question-1.json')

    if (!existsSync(cssPath))
      throw new Error(`No CSS file found at ${cssPath}. CSS must be built before HTML for production builds.`)

    if (!existsSync(jsPath))
      throw new Error(`No JavaScipt file found at ${jsPath}. JavaScript must be built before HTML for production builds.`)

    if (!existsSync(jsonPath))
      throw new Error(`No JSON file found at ${jsonPath}. JSON must be built before HTML for production builds.`)

    const {JSDOM, VirtualConsole} = require('jsdom')
    const htmlclean = require('htmlclean')
    const optimizeJS = require('optimize-js')
    const {minify} = require('uglify-es')
    const virtualConsole = new VirtualConsole()
    const js = readFileSync(jsPath).toString()
    const json = readFileSync(jsonPath).toString()
    const renderCheckTimeLimit = 500
    const renderCheckInterval = 20

    function verifyPageRender(document)
    {
      let currentTime = 0

      return new Promise((resolve, reject) =>
      {
        const timeout = setInterval(() =>
        {
          if (document.querySelector('.quiz'))
          {
            clearInterval(timeout)

            return resolve()
          }

          if (currentTime === renderCheckTimeLimit)
          {
            clearInterval(timeout)

            return reject()
          }

          currentTime += renderCheckInterval

        }, renderCheckInterval)
      })
    }

    html = htmlclean(
      html
        .replace('</head>', `<style>${readFileSync(cssPath).toString()}</style></head>`)
        .replace('</body>', `<script>${optimizeJS(minify(js.replace('questionsData = []', `questionsData = [${json}]`), {compress: {negate_iife: false}}).code)}</script></body>`)
    )

    const document = new JSDOM(html, {virtualConsole, runScripts: 'dangerously'}).window.document

    verifyPageRender(document)
      .then(() =>
      {
        const script = document.body.removeChild(document.body.querySelector('script'))

        html = document.documentElement.innerHTML
          .replace('</body>', `${script.outerHTML}</body>`)

        writeFileSync(resolve(buildDirectoryPath, 'index.html'), html)
      })
      .catch(error =>
      {
        const {red} = require('chalk')

        console.error(red('Error encountered during production HTML page pre-render.'))

        writeFileSync(resolve(buildDirectoryPath, 'index.html'), html)
      })
  }
}

module.exports = {description, usage, run}
