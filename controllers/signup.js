const bcrypt = require("bcryptjs"); // Importation du module bcryptjs pour le hachage des mots de passe


module.exports = {
  // Fonction pour afficher la page d'inscription
  signupView: (req, res) => {
    res.render("signup"); // Rendre la vue signup.ejs
  },

  // Fonction pour valider et enregistrer l'utilisateur
  signupValidation: async (req, res) => {
    // Récupération des valeurs du formulaire envoyé par l'utilisateur
    const nom = req.body.nom; // Récupère la valeur du champ "nom" dans la requête HTTP
    const prenom = req.body.prenom; // Récupère la valeur du champ "prenom" dans la requête HTTP
    const email = req.body.email; // Récupère la valeur du champ "email" dans la requête HTTP
    const date_naissance = req.body.date_naissance; // Récupère la valeur du champ "dateNaissance" dans la requête HTTP
    const mot_de_passe = req.body.mot_de_passe; // Récupère la valeur du champ "motdePasse" dans la requête HTTP

    // Vérification si tous les champs sont remplis
    if (!nom || !prenom || !email || !date_naissance || !mot_de_passe) {
      return res.status(400).send("Veuillez remplir tous les champs.");
    }

    try {
      const saltRounds = await bcrypt.genSalt(10); // Nombre de tours pour le sel utilisé dans le hachage
      
      const hashedPassword = await bcrypt.hash(mot_de_passe, saltRounds); // Hashage du mot de passe

      // Connexion à la base de données
      req.getConnection((err, connection) => {
        if (err) {
          console.error("Erreur de connexion à la base de données:", err);
          return res.status(500).send("Erreur serveur");
        }

        // Vérifier si l'email existe déjà
        const checkEmailSQL = "SELECT email FROM utilisateur WHERE email = ?";
        connection.query(checkEmailSQL, [email], (err, results) => {
          if (err) {
            console.error("Erreur SQL lors de la vérification de l'email:", err);
            return res.status(500).send("Erreur serveur");
          }

          if (results.length > 0) {
            return res.status(400).send("Cet email est déjà utilisé. Veuillez en choisir un autre.");
          }

          // Si l'email n'existe pas, insérer le nouvel utilisateur
          const insertSQL =
            "INSERT INTO utilisateur (nom, prenom, email, date_naissance, mot_de_passe) VALUES (?, ?, ?, ?, ?)";
          const values = [nom, prenom, email, date_naissance, hashedPassword];
          
          // Vérifie s'il y a une erreur lors de l'exécution de la requête SQL
          connection.query(insertSQL, values, (err, result) => {
            if (err) {
              console.error("Erreur SQL lors de l'inscription:", err); // Affiche l'erreur SQL dans la console
              return res.status(500).send("Erreur lors de l'inscription."); // Retourne une réponse HTTP 500 (Erreur serveur) au client
            }

            res.send('Inscription réussie ! <a href="/login">Se connecter</a>');  // Message de confirmation après une inscription réussie
          });
        });
      });
    } catch (err) {
      console.error("Erreur lors du hachage du mot de passe", err);
      res.status(500).send("Erreur interne du serveur");
    }
  },
};
