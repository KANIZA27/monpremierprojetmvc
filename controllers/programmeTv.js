module.exports = {
    // Définition de la fonction `programmeTvView` pour afficher la page des programmes TV
    programmeTvView: (req, res) => {
        
        // Obtient une connexion à la base de données via `req.getConnection`
        req.getConnection((erreur, connection) => {
            
            // Vérifie s'il y a une erreur lors de la connexion à la base de données
            if (erreur) {
                console.log("Erreur de connexion à la base de données:", erreur);
                
                // Envoie une réponse avec un statut HTTP 300 et un message d'erreur
                return res.status(300).send("Erreur de connexion à la base de données.");
            }
        
            // Exécute une requête SQL pour récupérer toutes les données de la table `programmediffusion`
            connection.query("SELECT * FROM programmediffusion", [], (err, resultat) => {
                
                // Vérifie s'il y a une erreur lors de l'exécution de la requête SQL
                if (err) {
                    console.log("Erreur lors de l'exécution de la requête :", err);
                    
                    // Envoie une réponse avec un statut HTTP 300 et un message d'erreur
                    return res.status(300).send("Erreur lors de la récupération des programmes.");
                }
              
                // Affiche le résultat de la requête SQL dans la console pour le débogage
                console.log("Résultat :", resultat);
              
                // Rend la vue `programmeTv.ejs` et lui passe les données récupérées sous la variable `programmediffusion`
                res.render("programmeTv", { programmediffusion: resultat });
            });
        });
    }
}
