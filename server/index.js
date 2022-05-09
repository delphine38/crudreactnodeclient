const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql')

// const de noms qui relie la DB
const db = mysql.createPool({
    host: 'localhost',
    user: 'cruddatabase',
    password: 'cruddatabase',
    database: 'cruddatabase'
});

// erveur : npm install corse
app.use(cors());

// npm install express body-parser mysql
app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}));

//get pour selectionner tout ce qui vient de la table movie_reviews
app.get("/api/get", (req, res)=>{
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result)=>{
        res.send(result);
        // console.log(result);
    });
});


// post pour inserer toutes les valeurs dans la db
app.post("/api/insert", (req, res)=>{
    const movieName = req.body.movieName;
    const moviReview = req.body.moviReview;
    
    const sqlInsert = "INSERT INTO movie_reviews(movieName, moviReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, moviReview], (err, result)=>{
        console.log(result);
        // bravo[0].style.visibility='visible';
    })
});

//fonction pour supprimer
app.delete('/api/delete/:movieName', (req, res)=>{
    const name =  req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";

    db.query(sqlDelete, name, (err, result)=>{
       if (err) console.log(err);
    });
});
//fonction pour modifier
app.put('/api/update', (req, res)=>{
    const name =  req.body.movieName;
    const review =  req.body.moviReview;
    const sqlUpdate = "UPDATE movie_reviews SET moviReview = ? WHERE movieName = ?";

    db.query(sqlUpdate,[review, name], (err, result)=>{
       if (err) console.log(err);
    });
});

//vérification que le serveur fonctionne
app.listen(3001,()=>{
    console.log('running on port 3001');
});