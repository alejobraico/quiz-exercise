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
  const {development, silent} = require('minimist')(args, {
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
    writeFileSync(
      resolve(buildDirectoryPath, 'index.html'),
      html
        .replace('</head>', `  <link rel="stylesheet" href="/main.css">\n  </head>`)
        .replace('</body>', `\n    <script src="/dependencies.js"></script>\n    <script src="/main.js"></script>\n  </body>`)
    )

  else
  {
    const cssPath = resolve(buildDirectoryPath, 'main.css')
    const jsPath = resolve(buildDirectoryPath, 'main.js')

    if (!existsSync(cssPath))
      throw new Error(`No CSS file found at ${cssPath}. CSS must be built before HTML for production builds.`)

    if (!existsSync(jsPath))
      throw new Error(`No JavaScipt file found at ${jsPath}. JavaScript must be built before HTML for production builds.`)

    const {JSDOM, VirtualConsole} = require('jsdom')
    const htmlclean = require('htmlclean')
    const optimizeJS = require('optimize-js')
    const {minify} = require('uglify-es')
    const virtualConsole = new VirtualConsole()
    const css = readFileSync(cssPath).toString()
    const js = optimizeJS(minify(readFileSync(jsPath).toString(), {compress: {negate_iife: false}}).code)

    html = htmlclean(
      html
        .split('</head>').join(`<style>${css}</style></head>`)
        .split('</body>').join(`<script>fetch = () => new Promise(resolve => '')</script><script>${js}</script></body>`)
      )

    // const document = new JSDOM(htmlclean(html.replace('</head>', `<style>${css}</style></head>`).replace('</body>', `<script>${js}</script></body>`)), {runScripts: 'dangerously'}).window.document
    const document = new JSDOM(html, {runScripts: 'dangerously'}).window.document
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

    verifyPageRender(document)
      .then(() =>
      {
        const scriptElements = document.body.querySelectorAll('script')

        scriptElements.forEach(scriptElement => document.body.removeChild(scriptElement))

        writeFileSync(
          resolve(buildDirectoryPath, 'index.html'),
          document.documentElement.innerHTML.split('</body>').join(`${scriptElements[1].outerHTML}</body>`)
        )
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
