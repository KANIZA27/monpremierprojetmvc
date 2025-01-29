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
  const programmes = [
    { titre: 'Chigoma', heure_debut: '14:00:00', heure_fin: '15:00:00' },
    { titre: 'Débat', heure_debut: '16:00:00', heure_fin: '17:30:00' },
    { titre: 'Mazaraka', heure_debut: '18:00:00', heure_fin: '19:00:00' },
    { titre: 'Chants', heure_debut: '20:00:00', heure_fin: '21:00:00' },
    { titre: 'Documentaire', heure_debut: '22:00:00', heure_fin: '23:30:00' }
  ];

  res.render("programmeTv", { programmes }); // Rendu correct de la vue avec les programmes
});

app.get("/formulaire")

// Exportation de l'application pour utilisation dans d'autres fichiers
module.exports = app;


