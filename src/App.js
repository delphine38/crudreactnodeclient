import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([])


  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((Response)=>{
    // console.log(Response.data);
    setMovieList(Response.data)
    })
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName, 
      moviReview: review
    }).then(()=>{
      alert("successful insert");
    });
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <h1>CRUD APPLICATION REACT.JS / NODE.JS</h1>
      <div className="form">
        <label>Nom : </label>
        {/* <input type="text" name="movieName"></input> */}
        <input type="text" name="movieName" onChange={(e)=>{
          setMovieName(e.target.value)
        }}></input>

        <label>Review : </label>
        {/* <input type="text" name="review"></input> */}
        <input type="text" name="review" onChange={(e)=>{
          setReview(e.target.value)
        }}></input>

        {/* <button >Envoi</button> */}
        <button onClick={submitReview}>Envoi</button>

        <span class="bravo">Bravo, les données ont été envoyé ! </span>
        {movieReviewList.map((value)=>{
          return <h1>MovieName : {value.movieName} | Movie Review : {value.moviReview}</h1>
        })}
      </div>

    </div>
  );
}

export default App;
