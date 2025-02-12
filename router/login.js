const express = require('express');// Importation du module Express
const router = express.Router();// Création d'un routeur Express pour gérer les routes liées à la connexion
const loginControllers = require('../controllers/login'); // Importation du contrôleur de connexion

// Définition de la route GET pour afficher la page de connexion
router.get('/login', loginControllers.loginView); // Route pour afficher la page de connexion

router.post('/login', loginControllers.loginValidation); // Lorsque l'utilisateur soumet le formulaire d'inscription, la fonction "signupValidation" du contrôleur "signupControllers" est exécutée
// Cette fonction gère la validation des données et l'inscription de l'utilisateur dans la base de données


module.exports = router; // Exportation du routeur pour l'utiliser dans l'application principale
