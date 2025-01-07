const express = require('express');
const { Todo } = require('../mongo')
const { setAsync, getAsync } = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  let addedTodos = await getAsync('added_todos');
  if (!addedTodos || isNaN(addedTodos)) {
    addedTodos = 0;
  } else {
    addedTodos = parseInt(addedTodos, 10);
  }
  await setAsync('added_todos', parseInt(addedTodos) + 1);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.deleteOne() 
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;

  req.todo.text = text;
  req.todo.done = done;

  const updatedTodo = await req.todo.save();

  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
