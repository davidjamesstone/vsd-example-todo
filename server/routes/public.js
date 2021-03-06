const path = require('path')

module.exports = {
  handler: {
    directory: {
      path: path.resolve(__dirname, '../public'),
      listing: true,
      index: true
    }
  },
  cache: {
    privacy: 'private',
    expiresIn: 60 * 1000 * 2880
  }
}
