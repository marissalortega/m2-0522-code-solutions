const express = require('express');
const app = express();
const fs = require('fs');

// Clients can GET a list of notes.
app.get('/api/notes', (req, res) => {

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;

    const dataJSON = JSON.parse(data);

    const dataArr = [];

    for (const key in dataJSON.notes) {
      dataArr.push(dataJSON.notes[key]);
    }

    res.send(dataArr);

  });
});

// Clients can GET a single note by id.
app.get('/api/notes/:id', (req, res) => {

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;

    var dataJSON = JSON.parse(data);

    if (req.params.id > 0 && typeof dataJSON.notes[req.params.id] === 'object') {
      res.status(200).json(dataJSON.notes[req.params.id]);
    } else if (req.params.id < 0) {
      res.status(400).json({ error: 'id must be a postive integer' });
    } else if (req.params.id >= 0 && typeof dataJSON.notes[req.params.id] === 'undefined') {
      res.status(404).json({ error: `cannot find note with id ${req.params.id}` });
    }

  });
});

// Clients can POST a new note.
app.use(express.json());

app.post('/api/notes', (req, res) => {

  fs.readFile('data.json', 'utf8', (err, data) => {

    const dataJSON = JSON.parse(data);

    if (err) throw err;

    else if (req.body.content === undefined) {

      res.status(400).json({ error: 'content is a required field' });
    } else if (Object.keys(req.body)[0] === 'content') {

      const nextNoteId = dataJSON.nextId++;
      dataJSON.notes[nextNoteId] = req.body;
      dataJSON.notes[nextNoteId].id = nextNoteId;
      const newData = JSON.stringify(dataJSON, null, 2);

      fs.writeFile('data.json', newData, err => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'An unexpected error occurred.' });
        } else {
          res.status(201).send(dataJSON.notes[nextNoteId]);
        }
      });

    }
  });
});

// Clients can DELETE a note by id.
app.delete('/api/notes/:id', (req, res) => {

  fs.readFile('data.json', 'utf8', (err, data) => {

    const dataJSON = JSON.parse(data);

    if (err) throw err;

    else if (req.params.id <= 0) {
      res.status(400).json({ error: 'id must be a positive integer' });
    } else if (req.params.id > 0 && !dataJSON.notes[req.params.id]) {
      res.status(404).json({ error: `cannot find note with id ${req.params.id}` });
    } else if (req.params.id > 0 && dataJSON.notes[req.params.id]) {

      delete dataJSON.notes[req.params.id];

      const newData = JSON.stringify(dataJSON, null, 2);

      fs.writeFile('data.json', newData, err => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'An unexpected error occurred.' });
        } else {
          res.sendStatus(204);
        }
      });

    }
  });
});

// Clients can replace a note (PUT) by id.
app.put('/api/notes/:id', (req, res) => {

  fs.readFile('data.json', 'utf8', (err, data) => {
    const dataJSON = JSON.parse(data);

    if (err) console.error(err);

    else if (req.params.id <= 0) {
      res.status(400).json({ error: 'id must be a positive integer' });

    } else if (Object.keys(req.body)[0] !== 'content') {
      res.status(404).json({ error: 'content is a required field' });

    } else if (req.params.id > 0 && Object.keys(req.body)[0] === 'content') {
      dataJSON.notes[req.params.id].content = req.body.content;

      const newData = JSON.stringify(dataJSON, null, 2);

      fs.writeFile('data.json', newData, err => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'An unexpected error occurred.' });
        } else {
          res.status(200).json(dataJSON.notes[req.params.id]);
        }
      });

    }
  });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server is listening on port 3000!');
});
