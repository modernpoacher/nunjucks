const Nunjucks = require('nunjucks')

const debug = require('debug')

const log = debug('@modernpoacher/nunjucks')

log('`@modernpoacher/nunjucks` is awake')

let ENVIRONMENT

function compile (src, options = {}, next = null) {
  log('compile')

  const fileName = ('filename' in options ? options.filename : null)
  const template = Nunjucks.compile(src, ENVIRONMENT || (ENVIRONMENT = options.environment), fileName)

  return (next instanceof Function)
    ? next(null, (context, options, next) => template.render(context, next))
    : (context) => template.render(context)
}

function prepare (options = {}, next = () => {}) {
  log('prepare')

  const {
    path,
    compileOptions = {}
  } = options

  options.compileOptions = {
    ...compileOptions,
    environment: (
      ENVIRONMENT || configure(path, { watch: false })
    )
  }

  return next()
}

function configure (path, options = { watch: false }) {
  log('configure')

  return (
    ENVIRONMENT = Nunjucks.configure(path, options)
  )
}

module.exports = {
  ...Nunjucks,
  compile,
  prepare,
  configure
}
