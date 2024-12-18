const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello employees!');
});

app.use('/employees', require('./employeesRoute'));

app.use((req, res, next) => {
  res
    .status(404)
    .send('404 Not Found - The requested resource does not exist.');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// app.get('/employees', (req, res) => {
//   res.json(employees);
// });

// app.get('/employees/random', (req, res) => {
//   const i = Math.floor(Math.random() * employees.length);
//   res.json(employees[i]);
// });

// app.get('/employees/:id', (req, res) => {
//   const { id } = req.params;
//   const employee = employees.find((e) => e.id === +id);
//   if (employee) {
//     res.json(employee);
//   } else {
//     res.status(404).send(`There is no employee with id ${id}.`);
//   }
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
