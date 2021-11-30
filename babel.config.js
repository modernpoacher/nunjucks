const debug = require('debug')

const log = debug('@modernpoacher/nunjucks')

const {
  env: {
    NODE_ENV = 'development'
  }
} = process

log('`@modernpoacher/nunjucks` is awake')

function env () {
  log({ NODE_ENV })

  return (
    NODE_ENV === 'production'
  )
}

const presets = [
  [
    '@babel/env', {
      targets: {
        node: '16.13.0'
      },
      useBuiltIns: 'usage',
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
