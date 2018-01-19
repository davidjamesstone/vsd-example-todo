const Joi = require('joi')
const Boom = require('boom')
const db = require('../../db')

module.exports = {
  list: {
    handler: async (request, h) => {
      try {
        const todos = await db.Todo.find({}).exec()
        return todos
      } catch (err) {
        return Boom.badRequest('Failed to read todos', err)
      }
    }
  },
  create: {
    handler: async (request, h) => {
      try {
        const todo = new db.Todo(request.payload)
        await todo.save()
        return todo
      } catch (err) {
        return Boom.badRequest('Failed to create todo', err)
      }
    },
    validate: {
      payload: {
        text: Joi.string().required().max(100)
      }
    }
  },
  update: {
    handler: async (request, h) => {
      const id = request.params.id
      const data = request.payload
      const options = { new: true }

      try {
        const todo = await db.Todo.findByIdAndUpdate(id, data, options).exec()

        return todo
      } catch (err) {
        return Boom.badRequest('Failed to create todo', err)
      }
    },
    validate: {
      params: {
        id: Joi.objectId().required()
      },
      payload: {
        text: Joi.string().required().max(100),
        isCompleted: Joi.boolean().required()
      }
    }
  },
  remove: {
    handler: async (request, h) => {
      const ids = request.payload

      try {
        await db.Todo.remove({ _id: { $in: ids } }).exec()

        return {
          removed: ids
        }
      } catch (err) {
        return Boom.badRequest('Failed to delete todos: ' + ids, err)
      }
    },
    validate: {
      payload: Joi
        .array()
        .required()
        .items(Joi.objectId().required())
    }
  }
}
