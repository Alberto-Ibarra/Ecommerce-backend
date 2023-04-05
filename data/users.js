const bcrypt = require('bcrypt'); 

const users = [
    {
        name: 'admin user',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Albert',
        email: 'albert@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Dylan Ibarra',
        email: 'dylan@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

module.exports = users