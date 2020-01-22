const Nunjucks = require('nunjucks')

let ENVIRONMENT

function compile (src, options = {}, next) {
  const template = Nunjucks.compile(src, ENVIRONMENT || (ENVIRONMENT = options.environment), (Reflect.has(options, 'filename') ? Reflect.get(options, 'filename') : null))

  return (next instanceof Function)
    ? next(null, (context, options, next) => template.render(context, next))
    : (context) => template.render(context)
}

function prepare (options = {}, next = () => {}) {
  const {
    path,
    compileOptions = {}
  } = options

  options.compileOptions = {
    ...compileOptions,
    environment: ENVIRONMENT || configure(path, { watch: false })
  }

  return next()
}

function configure (path, options = { watch: false }) {
  return (
    ENVIRONMENT = Nunjucks.configure(path, options)
  )
};

module.exports = {
  ...Nunjucks,
  compile,
  prepare,
  configure
}
