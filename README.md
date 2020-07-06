# @modernpoacher/nunjucks

[Nunjucks](http://mozilla.github.io/nunjucks/api.html) for [Hapi](https://hapi.dev/api).

## Usage

The example assumes:

* templates are in a directory named "views"
* templates have the extension "html"
* there is a template named "mytemplate"

```javascript
const Hapi = require('hapi')
const path = require('path')
const Vision = require('vision')
const Nunjucks = require('@modernpoacher/nunjucks')

const server = Hapi.server({ host, port })

server.register(Vision)
  .then(() => {
    server.views({
      relativeTo: currentDir,
        path: path.join(__dirname, 'views'),
        engines: {
          html: {
            module: Nunjucks
          }
        }
      }
    })

    server.route({
      method: 'GET',
      path: '/test',
      handler: (request, h) => (
        h.view('mytemplate', {
          myvariable: 'myvalue'
        })
      )
    })
  })
  .then(() => server.start())
```

### With Nunjucks filters, etc

To go beyond the default configuration of Nunjucks, you must configure an `environment`. (A `viewPath` is _required_.)

```javascript
const Nunjucks = require('@modernpoacher/nunjucks');

// set the view path
const viewPath = path.join(__dirname, 'views')

const env = Nunjucks.configure(viewPath)

// do anything you want to the env here
env.addFilter('somefilter', (str, count) => {
  // return some string
})

server.register(Vision)
  .then(() => {
    server.views({
      relativeTo: currentDir,
        path: viewPath,
        engines: {
          html: {
            module: Nunjucks
          }
        }
      }
    })

    server.route({
      method: 'GET',
      path: '/test',
      handler: (request, h) => (
        h.view('mytemplate', {
          myvariable: 'myvalue'
        })
      )
    })
  })
  .then(() => server.start())
```
