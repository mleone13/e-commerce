const { User } = require('../models');

const userData = [
  {
    username: 'mleone',
    email: 'marykleone@gmail.com',
    password: 'Soccerball'
  },
  {
    username: 'mikeleone',
    email: 'mmleone@gmail.com',
    password: 'Soccerball'
  },
  {
    username: 'ginaleone',
    email: 'gleone@gmail.com',
    password: 'Soccerball'
  },
 
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
