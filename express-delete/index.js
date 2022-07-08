const express = require('express');
const app = express();

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server is listening!');
});

const grades = {
  12: {
    id: 12,
    name: 'Tim Berners-Lee',
    course: 'HTML',
    score: 95
  },
  47: {
    id: 47,
    name: 'Brendan Eich',
    course: 'JavaScript',
    score: 100
  },
  273: {
    id: 273,
    name: 'Forbes Lindsay',
    course: 'JavaScript',
    score: 92
  }
};

app.get('/api/grades', (req, res) => {

  const gradesArr = [];

  for (const key in grades) {
    gradesArr.push(grades[key]);
  }

  res.json(gradesArr);
});

app.delete('/api/grades/:id', (req, res) => {

  delete grades[req.params.id];

  res.sendStatus(204);
});
