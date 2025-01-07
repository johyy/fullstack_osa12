const express = require('express');
const router = express.Router();
const redis = require('../redis')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET added todos */
router.get('/statistics', async (r_, res) => {
  const addedTodos = await redis.getAsync('added_todos') || 0;
  const addedTodosInt = parseInt(addedTodos);
  res.json({ added_todos: addedTodosInt });
})

module.exports = router;
