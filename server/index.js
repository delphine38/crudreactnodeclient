const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'cruddatabase',
    password: 'cruddatabase',
    database: 'cruddatabase'
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res)=>{
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result)=>{
        res.send(result);
        // console.log(result);
    });
});


app.post("/api/insert", (req, res)=>{
    const movieName = req.body.movieName;
    const moviReview = req.body.moviReview;
    
    const sqlInsert = "INSERT INTO movie_reviews(movieName, moviReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, moviReview], (err, result)=>{
        console.log(result);
        // bravo[0].style.visibility='visible';
    })
});

app.listen(3001,()=>{
    console.log('running on port 3001');
});