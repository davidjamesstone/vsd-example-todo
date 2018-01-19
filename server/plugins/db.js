const joi = require('joi')
const mongoose = require('mongoose')
const objectId = require('joi-objectid')
const config = require('../../config')

joi.objectId = objectId(joi)

/*
 * Registers the database and
 * initializes a mongo connection
 */
module.exports = {
  plugin: {
    name: 'db',
    register: async (server, options) => {
      await mongoose.connect(config.db.uri)
      const connection = mongoose.connection

      // Load data model
      require('../../db')

      server.log(['mongoose-connect', 'db'], 'Database connection open')

      // Close db connection if the server stops
      server.events.on('stop', () => {
        server.log(['mongoose-connect', 'plugin'], 'Database connection closed')
        connection.close()
      })
    }
  }
}
