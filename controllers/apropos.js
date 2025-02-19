// Exporte un objet contenant la fonction `aproposView`
module.exports = {
    
    // Je définit de la fonction `aproposView`
    aproposView: (req, res) => {
        
        // Obtient une connexion à la base de données via `req.getConnection`
        req.getConnection((erreur, connection) => {
      
        // Vérifie s'il y a une erreur lors de la connexion à la base de données
            if (erreur) {
              console.log("Erreur de connexion à la base de données:", erreur); // Affiche l'erreur dans la console
            } else {
          
          // Exécute une requête SQL pour récupérer toutes les données de la table `equipe`
          connection.query("SELECT * FROM equipe", [], (err, resultat) => {
            
            // Vérifie s'il y a une erreur lors de l'exécution de la requête SQL
            if (err) {
              console.log("Erreur lors de l'exécution de la requête:" , err);  // Affiche l'erreur dans la console 
            } else {
              
              // Affiche le résultat de la requête dans la console
              console.log("Résultat :", resultat);
              
              // Rend la vue "apropos.ejs" en envoyant les données récupérées (la liste des membres de l'équipe)
              res.render("apropos", { equipe: resultat }); 
            }
          });
        }
      });
}
}
