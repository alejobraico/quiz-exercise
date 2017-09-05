'use strict'

function chokidar(files, script)
{
  return `chokidar '${typeof files === 'string' ? files : files.join(`' '`)}' -c '${script}' --silent`
}

module.exports = chokidar
