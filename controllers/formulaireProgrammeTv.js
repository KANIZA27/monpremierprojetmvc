module.exports = {
   formulaireProgrammeTvView: (req, res) => {
    
  let titre = req.body.titre; // Correction de "titer" en "titre"
  let heure_debut = req.body.heure_debut;
  let heure_fin = req.body.heure_fin;
  let lien_youtube = req.body.lien_youtube;

  let id = req.body.id;
  let requeteSQL;
  let ordreDonnees;

  res.render("formulaireProgrammeTv");

  // Connexion à la base pour exécuter la requête
  /*req.getConnection((err, connection) => {
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
  });*/
   }
}
