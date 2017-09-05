'use strict'

const description = 'Verifies that build completes succesfully and then commits changes to Git repository'

function usage()
{
  return require('../utils/usage').composeUsageInformation([
    ['-p  --push', 'Pushes commit to Github'],
    ['-r  --release', 'Increments semver patch number in package.json file, creates tag with new version number and pushes commit and tag to Github']
  ])
}

function run(args)
{
  const minimist = require('minimist')
  const {_, push, release} = minimist(args, {
    alias: {p: 'push', r: 'release'},
    boolean: ['p', 'push', 'r', 'release']
  })

  if (_.length === 0)
    throw new Error('A commmit message is required')

  const sequence = [
    'log -w Verifying that code does not contain any TSLint errors and build completes successfully',
    'tslint -s',
    'build -s',
    'shx rm -rf build' // ,
    // `git commit ${_.join(' ')}`
  ]

  if (release)
    sequence.push('-b npm version patch')

  if (push || release)
    sequence.push('git push')

  return sequence
}

module.exports = {description, usage, run}
