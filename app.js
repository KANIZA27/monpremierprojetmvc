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
  req.getConnection((erreur, connection) => { // Établir une connexion à la base de données
    if (erreur) {
      console.log("Erreur de connexion à la base de données:", erreur); // Affichage de l'erreur en cas d'échec de connexion
    } else {
      
    }
    connection.query("SELECT * FROM equipe", [], (err, resultat) => { // Exécution de la requête SQL pour récupérer les données de l'équipe
      if (err) {
        console.log("Erreur lors de l'exécution de la requête :", err); // Affichage de l'erreur en cas d'échec de la requête
      } else {
        
      }
      console.log("Résultat :", resultat); // Affichage des résultats obtenus dans la console
      res.render("apropos", { equipe: resultat }); // Envoi des données à la vue pour affichage
    });
  });
});

// Route pour afficher le formulaire d'ajout de programme TV
app.get("/programmeTv", (req, res) => {
  req.getConnection((erreur, connection) => { // Établir une connexion à la base de données
    if (erreur) {
      console.log("Erreur de connexion à la base de données:", erreur); // Affichage de l'erreur en cas d'échec de connexion
       // Ajout d'une gestion d'erreur côté client
    }

    // Exécution de la requête SQL pour récupérer les programmes de diffusion
    connection.query("SELECT * FROM programmediffusion", [], (err, resultat) => {
      if (err) {
        console.log("Erreur lors de l'exécution de la requête :", err); // Affichage de l'erreur en cas d'échec de la requête
   // Gestion d'erreur côté client
      }
      
      console.log("Résultat :", resultat); // Affichage des résultats obtenus dans la console
      res.render("programmeTv", { programmediffusion: resultat }); // Envoi des données à la vue pour affichage
    });
  });
});

// Route pour gérer l'ajout d'un programme TV
app.post("/formulaireProgrammeTv", (req, res) => {
  req.getConnection((err, connection) => { // Établir une connexion à la base de données
    if (err) {
      console.log("Erreur de connexion à la base de données :", err); // Affichage de l'erreur en cas d'échec de connexion
    }
    // Insertion du programme dans la base de données
    const query = "INSERT INTO programmediffusion (titre, heure_debut, heure_fin) VALUES (?, ?, ?)";
    connection.query(query, [titre, heure_debut, heure_fin], (err, result) => { // Exécution de la requête d'insertion
      if (err) {
        console.log("Erreur lors de l'insertion des données :", err); // Affichage de l'erreur en cas d'échec de l'insertion
      }
      res.render("/programmeTv"); // Redirection vers la liste des programmes après ajout
    });
  });
});

// Exportation de l'application pour utilisation dans d'autres fichiers
module.exports = app;
