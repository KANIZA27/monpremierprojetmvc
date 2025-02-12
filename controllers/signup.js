module.exports = {
    // Fonction pour afficher la page d'inscription
    signupView: (req, res) => {


      res.render("signup"); // Il doit chercher et rendre le fichier 'views/signup.ejs'
      
    } ,

    // Fonction pour valider et enregistrer l'utilisateur dans la base de données
    signupValidation: async (req, res) => {

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

      /*let requeteSQL = "INSERT INTO utilisateur (nom, prenom, email, date_naissance, mot_de_passe) VALUES (?, ?, ?, ?, ?)";
      let ordreDonnees = [null, nom, prenom, email, date_naissance, mot_de_passe];

    // Hashage du mot de passe avant de le stocker dans la base de données
      const hashedPassword = await bcrypt.hash(motdePasse, 10);*/

    // Connexion à la base de données 
    req.getConnection((err, connection) => {
    if (err) {
      console.error("Erreur de connexion à la base de données:", err); // Affichage de l'erreur dans la console
      return res.status(500).send("Erreur serveur"); // Retourne une erreur au client
    }

    // Requête SQL pour insérer un nouvel utilisateur dans la base de données
      const sql = "INSERT INTO utilisateur (nom, prenom, email, date_naissance, mot_de_passe) VALUES (?, ?, ?, ?, ?)";
      const values = [nom, prenom, email, dateNaissance, motdePasse];

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
        
    }
  
}