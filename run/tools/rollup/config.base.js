import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'build/esm/main.js',
  output: {
    file: 'build/main.js',
    format: 'iife'
  },
  plugins: [
    resolve()
  ]
}
