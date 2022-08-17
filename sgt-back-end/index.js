const pg = require('pg');
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

const express = require('express');
const app = express();

let gradesArr = [];

// Returns the rows from the "grades" table.
app.get('/api/grades', (req, res, next) => {

  const sql = `
    select "gradeId",
      "name",
      "course",
      "score",
      "createdAt"
      from "grades"
  `;

  const params = gradesArr;

  db.query(sql, params)
    .then(result => {

      const grade = result.rows;
      gradesArr = grade;
      res.status(200).json(gradesArr);

    })
    .catch(err => {

      console.error(err);

      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.use(express.json());

// Inserts a new grade into the "grades" table.
app.post('/api/grades', (req, res, next) => {
  const gradesObj = {};

  for (let i = 0; i <= gradesArr.length; i++) {
    gradesObj[i] = gradesArr[i];
  }

  if (!req.body.name || !req.body.course || !req.body.score) {
    res.status(400).json({
      error: '"grade" is invalid. Missing "name", "course" or "score".'
    });
  } else if (req.body.score <= 0) {
    res.status(400).json({
      error: '"score" must be a postive integer.'
    });
    return;
  }
  const sql = `
    insert into "grades" ("name", "course", "score")
    values ('${req.body.name}', '${req.body.course}', ${req.body.score})
    returning *
  `;

  const params = gradesArr;

  db.query(sql, params)
    .then(result => {
      const grade = result.rows[0];
      res.status(200).json(grade);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error has occurred.'
      });
    });
});

// Updates the grade in the "grades" table.
app.put('/api/grades/:gradeId', (req, res, next) => {

  const gradeId = Number(req.params.gradeId);

  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    res.status(400).json({
      error: '"gradeId" must be a postive integer'
    });
  } else if (!req.body.name || !req.body.course || !req.body.score) {
    res.status(400).json({
      error: '"grade" is invalid. Missing "name", "course" or "score".'
    });
    return;
  }

  const sql = `
    update "grades"
      set "name"    = '${req.body.name}',
          "course"  = '${req.body.course}',
          "score"   = ${req.body.score}
      where "gradeId" = ${gradeId}
    returning *;
  `;

  const params = gradesArr;

  db.query(sql, params)
    .then(result => {

      const grade = result.rows[0];

      if (!grade) {
        res.status(404).json({
          error: 'Cannot find grade with "gradeId"'
        });
      } else {
        res.status(200).json(grade);
      }

    })
    .catch(err => {

      console.error(err);

      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

// Deletes grade from the "grades" table.
app.delete('/api/grades/:gradeId', (req, res, next) => {

  const gradeId = Number(req.params.gradeId);

  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    res.status(400).json({
      error: '"gradeId" must be a postive integer'
    });
    return;
  }

  const sql = `
    delete from "grades"
      where "gradeId" = ${gradeId}
    returning *;
  `;

  db.query(sql)
    .then(result => {

      const grade = result.rows[0];

      if (!grade) {
        res.status(404).json({
          error: 'Cannot find grade with "gradeId"'
        });
      } else {
        res.sendStatus(204);
      }
    })

    .catch(err => {

      console.error(err);

      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');
});
