// import required modules
const mysql = require('mysql');

// function to create a connection
function createConnection() {

  // creat the connection
  const connection = mysql.createConnection({
    host: '146.148.64.4',
    user: 'root',
    password: 'Password#1234',
    database: '3309db'
  });

  return connection;
}

// export the function
module.exports = createConnection;
