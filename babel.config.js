const debug = require('debug')

const log = debug('@modernpoacher/nunjucks')

const {
  env: {
    DEBUG = '@modernpoacher/nunjucks',
    NODE_ENV = 'development'
  }
} = process

debug.enable(DEBUG)

function env () {
  log({ NODE_ENV })

  return (
    NODE_ENV === 'production'
  )
}

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

module.exports = (api) => {
  if (api) api.cache.using(env)

  return {
    compact: true,
    comments: false,
    presets
  }
}
