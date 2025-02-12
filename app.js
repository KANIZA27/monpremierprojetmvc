// Importation des modules nécessaires
// Framework ExpressJS
const express = require("express");                      
const url = require("url"); // Module URL pour manipuler les URL
const fs = require("fs"); // Module FS pour gérer les fichiers
const mysql2 = require("mysql2"); // Module pour se connecter à une base de données MySQL
const myConnection = require("express-myconnection"); // Middleware pour gérer les connexions MySQL dans Express
// Importe le module `express-myconnection` qui permet de gérer les connexions MySQL avec Express
const connection = require("express-myconnection");
//const bcrypt = require('bcrypt');
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


// Route GET pour afficher le formulaire d'ajout de programme TV
/*app.get("/formulaireProgrammeTv", (req, res) => {
  res.render("formulaireProgrammeTv");
});*/
/*
// Route pour afficher le formulaire d'ajout de programme TV
// Route pour gérer l'ajout d'unformulaire programme TV
// Route POST pour ajouter un programme TV
app.post("/formulaireProgrammeTv", (req, res) => {
  const { titre, heure_debut, heure_fin, video } = req.body; // Récupération des données du formulaire

  if (!titre || !heure_debut || !heure_fin || !video) {
    return res.status(400).send("Veuillez remplir tous les champs.");
  }

  // Connexion à la base de données
  req.getConnection((err, connection) => {
    if (err) {
      console.error("Erreur de connexion à la base de données:", err);
      return res.status(500).send("Erreur serveur");
    }

    const requeteSQL = "INSERT INTO programmediffusion (titre, heure_debut, heure_fin, lien_youtube) VALUES (?, ?, ?, ?)";
    const ordreDonnees = [titre, heure_debut, heure_fin, video];

    connection.query(requeteSQL, ordreDonnees, (err, result) => {
      if (err) {
        console.error("Erreur SQL:", err);
        return res.status(500).send("Erreur lors de l'ajout du programme TV");
      }

      console.log("Programme TV ajouté avec succès !");
      res.redirect("/programmeTv");
    });
  });
});*/

/*app.get("/login", (req, res) => {
  res.render("login"); // Il doit chercher 'views/login.ejs'
});*/


// Route POST pour gérer la connexion des utilisateurs
// Route POST pour traiter la connexion utilisateur
/*app.post("/login", (req, res) => {

    const email.req.body.email;
    const password.req.body.password;

  if (!email || !password) {
    return res.status(400).send("Veuillez remplir tous les champs.");
  }

  // Connexion à la base de données
  req.getConnection((err, connection) => {
    if (err) {
      console.error("Erreur de connexion à la base de données:", err);
      return res.status(500).send("Erreur serveur");
    }

    const sql = "SELECT * FROM utilisateur WHERE email = ?";
    connection.query(sql, [email], async (err, results) => {
      if (err) {
        console.error("Erreur SQL:", err);
        return res.status(500).send("Erreur serveur");
      }

      if (results.length === 0) {
        return res.status(401).send("Email non trouvé.");
      }

      const user = results[0];

      // Vérification du mot de passe hashé
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).send("Mot de passe incorrect.");
      }

      // Enregistrement de l'utilisateur en session
      req.session.userId = user.id;
      req.session.email = user.email;

      res.redirect("/programmeTv");
    });
  });
});*/

/*app.get("/signup", (req, res) => {
    res.render("signup"); // Il doit chercher 'views/signup.ejs'
});*/

// Route POST pour gérer l'inscription des utilisateurs
/*app.post("/signup", async (req, res) => {
  // Récupération des valeurs du formulaire envoyé par l'utilisateur
   const nom = req.body.nom; // Récupère la valeur du champ "nom" dans la requête HTTP
   const prenom = req.body.prenom; // Récupère la valeur du champ "prenom" dans la requête HTTP
   const email = req.body.email; // Récupère la valeur du champ "email" dans la requête HTTP
   const dateNaissance = req.body.dateNaissance; // Récupère la valeur du champ "dateNaissance" dans la requête HTTP
   const motdePasse = req.body.motdePasse; // Récupère la valeur du champ "motdePasse" dans la requête HTTP

// Vérification si tous les champs sont remplis
  if (!nom || !prenom || !email || !dateNaissance || !motdePasse) {
    return res.status(400).send("Veuillez remplir tous les champs."); // Retourne une erreur si un champ est manquant
  }

  // Hashage du mot de passe avant de le stocker dans la base de données
  const hashedPassword = await bcrypt.hash(motdePasse, 10);

  // Connexion à la base de données 
  req.getConnection((err, connection) => {
    if (err) {
      console.error("Erreur de connexion à la base de données:", err); // Affichage de l'erreur dans la console
      return res.status(500).send("Erreur serveur"); // Retourne une erreur au client
    }

    // Requête SQL pour insérer un nouvel utilisateur dans la base de données
    const sql = "INSERT INTO utilisateur (nom, prenom, email, dateNaissance, motdePasse) VALUES (?, ?, ?, ?, ?)";
    const values = [nom, prenom, email, dateNaissance, hashedPassword];

    // Exécution de la requête SQL
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error("Erreur SQL:", err); // Affichage de l'erreur SQL dans la console
        return res.status(500).send("Erreur lors de l'inscription"); // Retourne une erreur au client
      }

      // Message de succès après une inscription réussie
      res.send('Inscription réussie ! <a href="/login">Se connecter</a>');
    });
  });
});*/


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
