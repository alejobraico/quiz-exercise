'use strict'

const {existsSync, readFileSync} = require('fs')
const {parse} = require('toml')

function parseTOML(path)
{
  if (!existsSync(path))
    throw new Error(`TOML file not found at ${path}`)

  let json

  try
  {
    json = parse(readFileSync(path))
  }

  catch(error)
  {
    throw new Error([
      `TOML parser ${error.message.charAt(0).toLowerCase()}${error.message.substring(1)}`,
      `File: ${path}`,
      `Line: ${error.line}`,
      `Column: ${error.column}`
    ].join('\n'))
  }

  return json
}

module.exports = {parseTOML}
