import globals from 'globals'
import merge from '@sequencemedia/eslint-config-standard/merge'

export default (
  merge({
    files: [
      '*.{cjs,mjs}'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  })
)
