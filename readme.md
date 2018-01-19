# vsd-example-todo

Todo list example demonstrating how to use a simple routing table and database model in [vsd](https://github.com/davidjamesstone/vsd).

## Install
Clone the repo and install dependencies using

`$ npm install`

Ensure mongodb is installed and running. 
Use the `server/config.json` to view or change the default connection details.

Start the app

`$ node index`

Open your browser at `http://127.0.0.1:3003/`

## Data model
The data model is very simple containing a single schema `Todo` that defines a collection in a mongo db.
It has two keys `text` and `isCompleted`. 

The data model is converted to a set of mongoose models in the `db/index.js` file.

A connection is made to the mongo db using the `hapi-mongoose-connect` plugin.
Connection details are contained in the `config/server.json` file.

## Routes
The application has 6 routes.

Each route maps to a file ("resource") where the `hapi` [route configuration](http://hapijs.com/api#route-configuration) lives.

An optional `name` can be supplied allowing multiple route configurations to be defined in a single file.


1. Home page
GET	/ =>	./


2. Public directories
GET	/public/{path*} => ./public


3. Get the list of todos
GET	/todo =>	./todo[list]


4. Create a new todo
POST	/todo =>	./todo[create]


5. Updates a todo
PUT	/todo/{id} =>	./todo[update]


6. Delete a batch of todo id's
DELETE	/todo	=>	./todo[remove]


The route configuration defines validation and handlers for our api.

The route handlers use the mongoose data model to do the CRUD on our mongo db.



## Client

The client is a basic todo list UI and uses [superviews.js](https://github.com/davidjamesstone/superviews.js) for [IncrementalDom](https://github.com/google/incremental-dom)

