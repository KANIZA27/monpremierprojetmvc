// Importe le module Express pour pouvoir créer un routeur
const express = require('express'); 

// Importe le contrôleur `aproposControllers` qui contient la fonction gérant l'affichage de la page "formulaireProgrammeTv"
const formulaireProgrammeTvControllers = require('../controllers/formulaireProgrammeTv'); 

// Ici, je crée une nouvelle instance de routeur Express pour gérer les routes liées à "formulaireProgrammeTv"
const router = express.Router(); 

//  Je définit une route GET sur la racine (`/`), qui appelle la fonction `formulaireProgrammeTvView` du contrôle
router.get('/formulaireProgrammeTv', formulaireProgrammeTvControllers.formulaireProgrammeTvView);

// Exporte le routeur pour pouvoir l'utiliser dans d'autres parties de l'application, comme `app.js`
module.exports = router;


