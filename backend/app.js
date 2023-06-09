const express = require('express')  // npm install express
const app = express()
const coursesRouter = require('./routes/courses')
const userRouter = require('./routes/user')
const mongoose = require('mongoose') // npm install mongoose
const bodyParser = require('body-parser')   //  npm install body-parser
const { logger2 } = require('./middleware/logger')
const corsMiddleware = require('./middleware/cors');
const mysql = require('mysql2') //npm install mysql2


require('dotenv').config() //installed using  npm install dotenv



//middleware  start
app.use(bodyParser.json())
app.use(logger2)
app.use(corsMiddleware)
app.use('/REST/courses', coursesRouter.router)
app.use('/REST/user', userRouter.router)

//middleware  end

// mysql connection start

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
})

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  
  // Execute your queries using the 'connection' object
  connection.query('SELECT * FROM user', (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return;
    }
    
    // Process the query results
    console.log(results);
    
    // Release the connection back to the pool
    connection.release();
  });
});



// mysql connection end

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})
