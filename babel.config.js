const debug = require('debug')

const log = debug('@modernpoacher/nunjucks')

const {
  env: {
    DEBUG = '@modernpoacher/nunjucks',
    NODE_ENV = 'development'
  }
} = process

debug.enable(DEBUG)

const presets = [
  [
    '@babel/env', {
      useBuiltIns: 'entry',
      targets: {
        node: 'current'
      },
      corejs: 3
    }
  ]
]

function using () {
  log({ NODE_ENV })

  return NODE_ENV === 'production'
}

module.exports = (api) => {
  if (api) api.cache.using(using)

  return {
    compact: true,
    comments: false,
    presets
  }
}
