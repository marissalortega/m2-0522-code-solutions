const express = require('express');
const app = express();

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server is listening!');
});

let nextId = 1;

const grades = {};

app.get('/api/grades', (req, res) => {

  const gradesArr = [];

  for (const key in grades) {
    gradesArr.push(grades[key]);
  }

  res.json(gradesArr);

});

app.use(express.json());

app.post('/api/grades', (req, res) => {

  grades[nextId] = req.body;

  grades[nextId].id = nextId;

  res.status(201).send(grades[nextId]);

  nextId++;

});
