// Importation des modules nécessaires
// Framework ExpressJS
const express = require("express");                      
//const url = require("url"); // Module URL pour manipuler les URL
//const fs = require("fs"); // Module FS pour gérer les fichiers
const mysql2 = require("mysql2"); // Module pour se connecter à une base de données MySQL
const myConnection = require("express-myconnection"); // Middleware pour gérer les connexions MySQL dans Express
// Importe le module `express-myconnection` qui permet de gérer les connexions MySQL avec Express
//const connection = require("express-myconnection");
const bcrypt = require('bcryptjs'); //Importation du module bcryptjs pour le hachage des mots de passe
// Importe le routeur `aproposRouter` depuis le fichier `routes/apropos.js`
// Ce routeur gère les routes liées à la page "À propos"
const aproposRoutes = require("./router/apropos");

// Importe le routeur `programmeTvRouter` depuis le fichier `routes/programmeTv.js`

const programmeTvRoutes = require('./router/programmeTv'); // Ce routeur gère les routes liées à la page "Programme TV"
// Importation des routeurs
const formulaireProgrammeTvRoutes = require('./router/formulaireProgrammeTv');
// Importe les routes définies dans le fichier 'login.js' pour gérer les demandes liées à la connexion des utilisateurs
const loginRoutes = require('./router/login'); 
const signupRoutes = require('./router/signup');



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
// Middleware pour parser les données des formulaires
app.use(express.urlencoded({ extended: true }));

// Middleware pour servir des fichiers statiques (comme les images, CSS, JS) depuis le dossier 'public'
app.use(express.static("public"));


// Utilise le routeur `aproposRouter` pour gérer les requêtes à la racine (`/`)
app.use('/', aproposRoutes); // Charge les routes pour la gestion du programme TV à partir de la racine "/"
// Exemple : si "programmeTvRoutes" contient "/programme", alors la page sera accessible via "/programme"

app.use('/', programmeTvRoutes); // Charge les routes pour la gestion du programme TV à partir de la racine "/"
// Exemple : si "programmeTvRoutes" contient "/programme", alors la page sera accessible via "/programme"

app.use('/', formulaireProgrammeTvRoutes); // Charge les routes liées au formulaire pour ajouter/modifier des programmes TV

app.use('/', loginRoutes); // Charge les routes liées à la connexion des utilisateurs
// Exemple : "/login" affichera la page de connexion définie dans "loginRoutes"

app.use('/',signupRoutes); // Charge les routes liées à l'inscription des utilisateurs
// Exemple : "/signup" affichera la page d'inscription définie dans "signupRoutes"


// Exportation de l'application pour utilisation dans d'autres fichiers
module.exports = app;
