const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
const port = 3000;
 
app.use(express.json());
 
const connect = mysql.createConnection({
  host: "localhost",
  user: "js",
  password: "azerty",
  database: "films_db",
});


//DB
let data;

async function getData() {
  const q = 'SELECT * FROM films';
  connect.query(q, (err, results) => {
  if (err) {
      data = {message:"Erreur"};
      throw err;
  }
  data = results;
  });
}

getData();

//KEY
const validkey = (req, res, next) => {
    const apiKey = req.headers["api_key"];
   
    if (apiKey === "azerty") {
      next();
    } else {
      res.status(403).json({ message: "Clé invalide" });
    }
  };


 
connect.connect((error) => {
  if (error) {
    console.error("Erreur", error);
  }
  console.log("connecté");
});


//GET
app.get('/films', validkey, (req, res) => {
    const q = 'SELECT * FROM films';
    connect.query(q, (err, results) => {
      if (err) {
        throw err;
      }
      res.json(results);
    });
  }); 
  

//POST
app.post('/add', validkey, (req, res) => {
    const { titre, date, description } = req.body;
  
    if (!(titre || date || description)) {
      return res.status(400).json({ error: 'champs incorrects' });
    }
  
    const query = 'INSERT INTO films (titre, date, description) VALUES (?, ?, ?)';
    connect.query(query, [titre, date, description], (err, result) => {
      if (err) {
        return res.status(400).json({ message: `Erreur ${err}` });
      }
      res.status(201).json({ 
        message: 'Film ajouté'
    });
    });
  });


//PUT
app.put("/put/:id", validkey, (req, res) => {

  getData();

    const filmId = parseInt(req.params.id);
    const film = data.find((film) => film.id === filmId);

    if (!film) {
        return res.status(404).json({ message: "Le film n'existe pas." });
    }

    const { titre, date, description } = req.body;

    const query = "UPDATE films SET titre = ?, date = ?, description = ? WHERE id = ?";
    connect.query(query, [titre || film.titre, date || film.date, description || film.description, filmId], (err, result) => {
        if (err) {
            return res.status(400).json({ message: "Erreur" });
        }
        res.status(200).json({ message: "film modifié" });
    });
});


//DELETE
app.delete("/del/:id", validkey, (req, res) => {
    const filmId = parseInt(req.params.id);

    const query = "DELETE FROM films WHERE id = ?";
    connect.query(query, [filmId], (err, result) => {
        if (err) {
            return res.status(400).json({ message: "Erreur" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Le film n'existe pas." });
        }
        res.status(200).json({ message: "Film supprimé" });
    });
});



app.listen(port, () => {
  console.log("Ecoute sur le port 3000");
});