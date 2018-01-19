const mongoose = require('mongoose')
const generator = require('vsd-db-mongoose')(mongoose)
const modelData = require('./db.json')

/**
 * Generate mongoose schema from the data
 */
const schemas = generator.generateSchemas(modelData)

// Do any custom work on the schemas here.
// E.g. add statics and virtuals, register plugins.

/**
 * Generate mongoose models
 */
const models = generator.generateModels(schemas)

module.exports = models
