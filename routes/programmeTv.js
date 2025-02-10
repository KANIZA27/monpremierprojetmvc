// Importe le module Express pour pouvoir créer un routeur
const express = require('express'); 

// Importe le contrôleur `programmetvControllers` qui contient la fonction gérant l'affichage de la page "programmeTv"
const programmetvControllers = require('../controllers/programmeTv'); 

// Crée une nouvelle instance de routeur Express pour gérer les routes liées à "programmeTv"
const router = express.Router(); 

// Définit une route GET sur la racine `/`, qui appelle la fonction `programmetvView` du contrôleur
router.get('/', programmetvControllers.programmeTvView);

// Exporte le routeur pour pouvoir l'utiliser dans d'autres parties de l'application, comme `app.js`
module.exports = router;
