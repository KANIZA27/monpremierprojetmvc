// Importe le module Express pour pouvoir créer un routeur
const express = require('express'); 

// Importe le contrôleur `signupControllers` qui contient la fonction gérant l'affichage de la page "signup"
const signupControllers = require('../controllers/signup'); 

// Ici, je crée une nouvelle instance de routeur Express pour gérer les routes liées à "signup"
const router = express.Router(); 

//  Je définit une route GET sur la racine (`/`), qui appelle la fonction `signupView` du contrôleur
router.get('/signup', signupControllers.signupView);

// Définition d'une route POST sur "/signup"

router.post('/signup', signupControllers.signupValidation); // Lorsque l'utilisateur soumet le formulaire d'inscription, la fonction "signupValidation" du contrôleur "signupControllers" est exécutée
// Cette fonction gère la validation des données et l'inscription de l'utilisateur dans la base de données


// Exporte le routeur pour pouvoir l'utiliser dans d'autres parties de l'application, comme `app.js`
module.exports = router;
