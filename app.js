// Importation des modules nécessaires
// Framework ExpressJS
const express = require("express");                      
const url = require("url"); // Module URL pour manipuler les URL
const fs = require("fs"); // Module FS pour gérer les fichiers
const mysql2 = require("mysql2"); // Module pour se connecter à une base de données MySQL
const myConnection = require("express-myconnection"); // Middleware pour gérer les connexions MySQL dans Express
// Importe le module `express-myconnection` qui permet de gérer les connexions MySQL avec Express
const connection = require("express-myconnection");

// Importe le routeur `aproposRouter` depuis le fichier `routes/apropos.js`
// Ce routeur gère les routes liées à la page "À propos"
const aproposRouter = require("./routes/apropos");

// Importe le routeur `programmeTvRouter` depuis le fichier `routes/programmeTv.js`
// Ce routeur gère les routes liées à la page "Programme TV"
const programmeTvRouter = require('./routes/programmeTv'); 
const formulaireProgrammeTvRouter = require('./routes/formulaireProgrammeTv');




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



app.get("/formulaireProgrammeTv", (req, res) => {
  res.render("formulaireProgrammeTv");
});

// Route pour afficher le formulaire d'ajout de programme TV
// Route pour gérer l'ajout d'unformulaire programme TV
app.post("/formulaireProgrammeTv", (req, res) => {

  console.log("Corps de la requête Body:", req.body);       // Debug : affiche les données envoyées
  console.log("titre:", req.body.titre);                   // Debug : affiche le titre
  console.log("heure_debut:", req.body.heure_debut);       // Debug : affiche l'heure de début
  console.log("heure_fin:", req.body.heure_fin);           // Debug : affiche l'heure de fin
  console.log("lien_youtube:", req.body.lien_youtube);     // Debug : affiche le lien YouTube

  let titre = req.body.titre; // Correction de "titer" en "titre"
  let heure_debut = req.body.heure_debut;
  let heure_fin = req.body.heure_fin;
  let lien_youtube = req.body.lien_youtube;

  let id = req.body.id;
  let requeteSQL;
  let ordreDonnees;

  if (err) {
      id = null; // Aucun ID, donc insertion
      requeteSQL = "INSERT INTO programmediffusion (titre, heure_debut, heure_fin, lien_youtube) VALUES (?, ?, ?, ?)";
      ordreDonnees = [titre, heure_debut, heure_fin, lien_youtube]; // Correction du tableau
  } else {
      // Mise à jour d'un programme existant
      requeteSQL = "UPDATE programmediffusion SET titre = ?, heure_debut = ?, heure_fin = ?, lien_youtube = ? WHERE id = ?";
      ordreDonnees = [titre, heure_debut, heure_fin, lien_youtube, id];
  }

  // Connexion à la base pour exécuter la requête
  req.getConnection((err, connection) => {
      if (err) {
          console.log("Erreur de connexion à la base de données:", err);
      }

      connection.query(requeteSQL, ordreDonnees, (err, result) => {
          if (err) {
              console.log("Erreur lors de l'exécution de la requête SQL:", err);
          }

          console.log("Opération réussie !");
          res.status(300).redirect("/programmeTv"); // Redirection vers la liste des programmes après ajout/mise à jour
      });
  });
});


app.get("/login", (req, res) => {
  res.render("login"); // Il doit chercher 'views/login.ejs'
});


// Route POST pour gérer la connexion des utilisateurs
app.post('/login', async (req, res) => {
  // Récupération des données envoyées par le formulaire de connexion (email et mot de passe)
        const { email, password } = req.body;

  // Requête SQL pour rechercher l'utilisateur correspondant à l'email fourni
  connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) throw err; // En cas d'erreur SQL, on arrête l'exécution et affiche l'erreur

      // Vérifier si un utilisateur correspondant à l'email a été trouvé
      if (results.length > 0) {
        const user = results[0]; // Récupération du premier utilisateur trouvé

          // Comparaison du mot de passe saisi avec le mot de passe hashé stocké en base de données
        const validPassword = await bcrypt.compare(password, user.password);

          if (validPassword) {
              // Si le mot de passe est valide, on stocke l'ID de l'utilisateur en session
              req.session.userId = user.id;
              
              // Réponse envoyée à l'utilisateur indiquant une connexion réussie
              res.send('Connexion réussie ! <a href="/dashboard">Accéder au dashboard</a>');
          } else {
              // Si le mot de passe est incorrect, on affiche un message d'erreur
              res.send('Mot de passe incorrect.');
          }
      } else {
          // Si aucun utilisateur n'est trouvé avec cet email, on affiche un message d'erreur
          res.send('Email non trouvé.');
      }
  });
});


app.get("/signup", (req, res) => {
    res.render("signup"); // Il doit chercher 'views/signup.ejs'
});

// Route POST pour gérer l'inscription des utilisateurs
app.post('/signup', async (req, res) => {
  // Récupération des données envoyées par le formulaire d'inscription
      const { nom, prenom, email, datenaissance, motdepasse } = req.body;

  // Hachage du mot de passe avant de le stocker en base de données pour des raisons de sécurité
      const hashedPassword = await bcrypt.hash(motdepasse, 10);

  // Exécution de la requête SQL pour insérer un nouvel utilisateur dans la table `users`
  connection.query(
      'INSERT INTO users (nom, prenom, email, dob, password) VALUES (?, ?, ?, ?, ?)',
      [nom, prenom, email, date_naissance, hashedPassword], // Les valeurs à insérer dans la requête SQL
      (err, result) => {
          if (err) throw err; // En cas d'erreur SQL, on affiche l'erreur et on arrête l'exécution

          // Message de confirmation d'inscription avec un lien vers la page de connexion
          res.send('Inscription réussie ! <a href="/login">Se connecter</a>');
      }
  );
});


// Utilise le routeur `aproposRouter` pour gérer les requêtes à la racine (`/`)
app.use('/', aproposRouter);
app.use('/programmeTv', programmeTvRouter);
app.use('/formulaireProgrammeTv', formulaireProgrammeTvRouter);


// Exportation de l'application pour utilisation dans d'autres fichiers
module.exports = app;
