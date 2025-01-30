// Importation des modules nécessaires
const express = require("express"); // Framework ExpressJS
const url = require("url"); // Module URL pour manipuler les URL
const fs = require("fs"); // Module FS pour gérer les fichiers
const mysql2 = require("mysql2"); // Module pour se connecter à une base de données MySQL
const myConnection = require("express-myconnection"); // Middleware pour gérer les connexions MySQL dans Express
const connection = require("express-myconnection");



// Configuration de la base de données MySQL
const optionConnection ={
  host: "localhost", // Adresse du serveur MySQL
  user: "root", // Nom d'utilisateur MySQL
  password: "Saindoumy15@e", // Mot de passe MySQL
  port: 3306, // port Mysql par défau
  database: "chainetv", // Nom de la base de données
};
// Initialisation de l'application Express
const app = express();

// Middleware pour gérer la connexion à la base de données
// Ici, je utilise une stratégie de pool pour optimiser les performances
app.use(myConnection(mysql2, optionConnection, "pool"));

// Middleware pour analyser les données envoyées dans le corps des requêtes (format URL-encoded)
app.use(express.urlencoded({extended: false}));


// Configuration d'Express pour utiliser EJS comme moteur de vues
app.set("views", "./views"); // Définit le dossier des vues
app.set("view engine", "ejs"); // Définit le moteur de rendu sur EJS

// Middleware pour servir des fichiers statiques (comme les images, CSS, JS) depuis le dossier 'public'
app.use(express.static("public"));

// Route pour afficher la page "À propos"
app.get("/apropos", (req, res) => {
  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log("Erreur de connexion à la base de données:", erreur);
    } else {

    }
    connection.query("SELECT * FROM equipe", [], (err, resultat) => {
      if (err) {
        console.log("Erreur lors de l'exécution de la requête :", err);
      } else {

      }
      console.log("Résultat :", resultat);
      res.render("apropos", { equipe: resultat }); // Envoi des données à la vue
    });
  });
});


  // Route pour afficher le formulaire d'ajout de programme TV
app.get("/programmeTv", (req, res) => {
  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log("Erreur de connexion à la base de données:", erreur);
       // Ajout d'une gestion d'erreur côté client
    }

    // Exécution de la requête SQL
    connection.query("SELECT * FROM programmediffusion", [], (err, resultat) => {
      if (err) {
        console.log("Erreur lors de l'exécution de la requête :", err);
   // Gestion d'erreur côté client
      }
      
      console.log("Résultat :", resultat); // Affichage correct des résultats dans la console
      res.render("programmeTv", { programmediffusion: resultat }); // Rendu de la vue avec les données récupérées
    });
  });
});

// Route pour afficher le formulaire d'ajout de programme TV
app.get("/formulaireProgrammeTv", (req, res) => {
  res.render("formulaireProgrammeTv"); // Affiche le formulaire d'ajout
});

// Route pour gérer l'ajout d'un programme TV
app.post("/formulaireProgrammeTv", (req, res) => {
  const { titre, heure_debut, heure_fin } = req.body;

  if (!titre || !heure_debut || !heure_fin) {
    return res.status(400).send("Tous les champs sont obligatoires");
  }

  req.getConnection((err, connection) => {
    if (err) {
      console.log("Erreur de connexion à la base de données :", err);
      return res.status(500).send("Erreur de connexion à la base de données");
    }

    // Insertion du programme dans la base de données
    const query = "INSERT INTO programmediffusion (titre, heure_debut, heure_fin) VALUES (?, ?, ?)";
    connection.query(query, [titre, heure_debut, heure_fin], (err, result) => {
      if (err) {
        console.log("Erreur lors de l'insertion des données :", err);
        return res.status(500).send("Erreur lors de l'insertion des données");
      }

      res.redirect("/programmeTv"); // Redirection vers la liste des programmes après ajout
    });
  });
});



// Exportation de l'application pour utilisation dans d'autres fichiers
module.exports = app;


