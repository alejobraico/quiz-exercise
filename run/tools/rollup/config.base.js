import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const resolvePreactDevTools = {
  resolveId: importee =>
  {
    if (importee === 'preact/devtools')
      return 'node_modules/preact/devtools/index.js'
  }
}

export default {
  format: 'iife',
  plugins: [
    resolvePreactDevTools,
    resolve(),
    commonjs()
  ]
}
