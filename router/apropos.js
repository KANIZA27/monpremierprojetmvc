// Importe le module Express pour pouvoir créer un routeur
const express = require('express'); 

// Importe le contrôleur `aproposControllers` qui contient la fonction gérant l'affichage de la page "À propos"
const aproposControllers = require('../controllers/apropos'); 

// Ici, je crée une nouvelle instance de routeur Express pour gérer les routes liées à "À propos"
const router = express.Router(); 

//  Je définit une route GET sur la racine (`/`), qui appelle la fonction `aproposView` du contrôleur
router.get('/apropos', aproposControllers.aproposView);

// Exporte le routeur pour pouvoir l'utiliser dans d'autres parties de l'application, comme `app.js`
module.exports = router;
