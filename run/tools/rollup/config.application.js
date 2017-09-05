import {readdirSync} from 'fs'
import {parse, resolve, sep} from 'path'
import config from './config.base'

const populateQuestionCount = {
  transform: (code, id) =>
  {
    if (id.endsWith(`build${sep}esm${sep}main.js`))
      return {
        code: code.replace(
          'questionCount = 0',
          `questionCount = ${readdirSync(resolve(__dirname, '../../../questions')).length}`
        )
      }
  }
}

export default Object.assign({}, config,
{
  entry: 'build/esm/main.js',
  dest: 'build/main.js',
  plugins: config.plugins.concat([populateQuestionCount])
})
