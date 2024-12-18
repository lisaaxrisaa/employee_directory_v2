const express = require('express');
const router = express.Router();
let employees = require('./employees');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
  res.status(200).send(employees);
});

router.get('/random', (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === Number(id));
  if (employee) {
    res.status(200).json(employee);
  } else {
    res.status(404).send('Employee not found');
  }
});

router.post('/', (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Name is required');
  }
  const newEmployee = { id: uuidv4(), name };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

module.exports = router;
