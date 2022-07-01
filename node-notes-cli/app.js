const notesJSON = require('./data.json');
const fs = require('fs');

if (process.argv[2] === 'read') {
  for (const key in notesJSON.notes) {
    console.log(`${key}: ${notesJSON.notes[key]}`);
  }
}

if (process.argv[2] === 'create') {
  fs.readFile('data.json', 'utf8', (err, data) => {
    const JSONParse = JSON.parse(data);
    if (err) throw err;
    else if (process.argv.length === 4) {
      const nextId = JSONParse.nextId++;
      JSONParse.notes[nextId] = process.argv[3];
    }

    fs.writeFile('data.json', JSON.stringify(JSONParse, null, 2), err => {
      if (err) throw err;
    });
  });
}

if (process.argv[2] === 'update') {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    else {
      const JSONParse = JSON.parse(data);

      for (const key in notesJSON.notes) {
        if (process.argv[3] === key) {
          JSONParse.notes[key] = process.argv[4];
        }
      }

      fs.writeFile('data.json', JSON.stringify(JSONParse, null, 2), err => {
        if (err) throw err;
      });
    }
  });
}

if (process.argv[2] === 'delete') {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    else {
      const JSONParse = JSON.parse(data);

      for (const key in notesJSON.notes) {
        if (process.argv[3] === key) {
          delete JSONParse.notes[key];
        }
      }

      fs.writeFile('data.json', JSON.stringify(JSONParse, null, 2), err => {
        if (err) throw err;
      });
    }
  });
}
