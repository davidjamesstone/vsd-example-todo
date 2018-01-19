const Lab = require('lab')
const Code = require('code')
const glupe = require('glupe')
const lab = exports.lab = Lab.script()
const { manifest, options } = require('../server')

lab.experiment('Simple test', () => {
  let server

  lab.before(async () => {
    server = await glupe.compose(manifest, options)
  })

  lab.test('Server starts', async () => {
    Code.expect(server).to.be.an.object()
  })
})
