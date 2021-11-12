const express = require("express");
const mysql = require("mysql2");

//create connection string
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Welcome61605!',
    //establish connection to newly created db
    database: 'fullstack'
});

// establish a connection
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("MySQL Database established successfully")
});

//Set up express server
const app = express();

//Create a test database
app.get('/CreateDB', (req,res) => {
    let sql = 'CREATE DATABASE fullstack'
    //Run sql command
    db.query(sql, (err,result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.send('fullstack Database created successfully') 

    })
})

//Create a table
app.get('/CreateTable', (req,res) => {
    let sql = 'CREATE TABLE Table1( id INT AUTO_INCREMENT, name VARCHAR(50), c1 VARCHAR(100), c2 VARCHAR(100), PRIMARY KEY(id))'
    //Run sql command
    db.query(sql, (err,result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.send('Table Table1 created successfully') 

    })
})

//insert one row at a time
app.get('/InsertRow1', (req,res) => {
    let post = {c1: 'Post' , name: 'Name goes here'};
    let sql = 'INSERT INTO Table1 SET ?';
    //Run sql command
    db.query(sql, post, (err,result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.send('Row  1 inserted successfully in Table1') 

    })
})

//execute SELECT query
app.get('/SELECTALL', (req,res) => {
    let sql = 'SELECT * FROM Table1';
    //Run sql command
    db.query(sql,(err,result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.send('Select executed successfully') 

    })
})

//Select a specific query using WHERE clause
app.get('/SELECTONE/:id', (req,res) => {
    let sql = `SELECT * FROM Table1 WHERE id = ${req.params.id}`;
    //Run sql command
    db.query(sql, (err,result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.send('Select one executed successfully') 

    })
})
//Update query
app.get('/UPDATEONE/:id', (req,res) => {
    let c1 = 'Data updated'
    let sql = `UPDATE Table1 SET c1 = '${c1}' WHERE id = ${req.params.id}`;
    //Run sql command
    db.query(sql, (err,result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.send('update one executed successfully') 

    })
})


//Delete query
app.get('/DELETEONE/:id', (req,res) => {
   
    let sql = `DELETE FROM Table1 WHERE id = ${req.params.id}`;
    //Run sql command
    db.query(sql, (err,result) => {
        if(err){
            throw err;
        }
        console.log(result)
        res.send('DELETE one executed successfully') 

    })
})





//Open and listen from the port
app.listen('9000', () => {
    console.log("Local Web server up and running");
});

