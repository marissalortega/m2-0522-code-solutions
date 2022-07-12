const express = require('express');
const app = express();

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server is listening on port 3000!');
});

// const nextId = 5;

const notes = {
  1: {
    content: 'The event loop is how a JavaScript runtime pushes asynchronous callbacks onto the stack once the stack is cleared.',
    id: 1
  },
  2: {
    content: 'Prototypal inheritance is how JavaScript objects delegate behavior.',
    id: 2
  },
  3: {
    content: 'In JavaScript, the value of `this` is determined when a function is called; not when it is defined.',
    id: 3
  },
  4: {
    content: 'A closure is formed when a function retains access to variables in its lexical scope.',
    id: 4
  }
};

app.get('/api/notes', (req, res) => {
  const notesArr = [];

  for (const key in notes) {
    notesArr.push(notes[key]);
  }

  res.json(notesArr);

});

app.get('/api/notes/:id', (req, res) => {

  if (req.params.id >= 0 && notes[req.params.id] === undefined) {
    res.status(404).send({ error: `cannot find note with id ${req.params.id}` });
  } else if (req.params.id <= 0) {
    res.status(400).send({ error: 'id must be a postive integer' });
  } else if (req.params.id > 0) {
    res.status(200).send(notes[req.params.id]);
  }

});

// http GET localhost:3000/api/notes
