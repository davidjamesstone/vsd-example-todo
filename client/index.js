var IncrementalDom = require('incremental-dom')
var view = require('./todos.html')
var patch = IncrementalDom.patch
var fetch = window.fetch
var el = document.getElementById('todos')

function handleError (err) {
  console.error(err)
}

function render () {
  patch(el, view, ctrl)
}

var ctrl = {
  todos: [],
  addTodo: function (text) {
    var options = {
      method: 'POST',
      body: JSON.stringify({ text: text }),
      'Content-Type': 'application/json'
    }

    fetch('/todo', options)
      .then(function (response) {
        if (!response.ok) {
          return handleError(response.statusText)
        }

        response.json().then(function (todo) {
          ctrl.todos.push(todo)
          render()
        })
      })
      .catch(handleError)
  },
  updateTodo: function (todo) {
    var options = {
      method: 'PUT',
      body: JSON.stringify({
        text: todo.text,
        isCompleted: todo.isCompleted
      }),
      'Content-Type': 'application/json'
    }

    fetch('/todo/' + todo._id, options)
      .then(function (response) {
        if (!response.ok) {
          return handleError(response.statusText)
        }

        render()
      })
      .catch(handleError)
  },
  clearCompleted: function () {
    var ids = []
    var todos = ctrl.todos
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].isCompleted) {
        ids.push(todos[i]._id)
      }
    }

    var options = {
      method: 'DELETE',
      body: JSON.stringify(ids),
      'Content-Type': 'application/json'
    }

    fetch('/todo', options)
      .then(function (response) {
        if (!response.ok) {
          return handleError(response.statusText)
        }

        response.json().then(function (result) {
          var idx

          for (var i = 0; i < result.removed.length; i++) {
            idx = todos.findIndex(function (item) {
              return item._id === ids[i]
            })

            if (~idx) {
              todos.splice(idx, 1)
            }
          }

          render()
        })
      })
      .catch(handleError)
  },
  toggleCompleted: function (value) {
    ctrl.todos.forEach(function (item) {
      item.isCompleted = value
    })
    render()
  },
  hasCompletedItems: function () {
    return !!ctrl.todos.find(function (item) {
      return item.isCompleted
    })
  }
}

// Initialise todos
fetch('/todo')
  .then(function (response) {
    response.json().then(function (todos) {
      ctrl.todos = todos
      render()
    })
  })
  .catch(handleError)
