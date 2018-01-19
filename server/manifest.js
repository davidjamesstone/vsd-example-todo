const path = require('path')
const config = require('../config')

const manifest = {
  server: {
    port: config.server.port,
    host: config.server.host,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    }
  },
  register: {
    plugins: [
      'inert',
      {
        plugin: 'good',
        options: config.logging
      },
      {
        plugin: 'vision',
        options: {
          engines: {
            html: require('handlebars')
          },
          layout: true,
          relativeTo: __dirname,
          path: 'views',
          isCached: config.views.cache,
          helpersPath: 'views/helpers',
          partialsPath: 'views/partials',
          context: {
            meta: {
              title: 'Hapi Glupe',
              description: 'My Hapi Website',
              keyowrds: 'foo, bar',
              author: '@me'
            }
          }
        }
      },
      // {
      //   plugin: 'hapi-mongoose-connect',
      //   options: {
      //     mongooseUri: config.db.uri
      //   }
      // },
      {
        plugin: 'vsd-plugin-router',
        options: {
          routes: path.join(__dirname, 'routes/routes')
        }
      },
      './plugins/db',
      './plugins/log-errors',
      './plugins/error-pages'
    ]
  }
}

module.exports = manifest
