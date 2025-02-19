const bcryptjs = require('bcryptjs');  //Importation du module bcryptjs pour le hachage des mots de passe

module.exports = {
    // Fonction pour afficher la page de connexion
    loginView: (req, res) => {
        res.render("login"); // Il doit chercher 'views/login.ejs'
    },

    // Fonction pour valider la connexion
    loginVerification: (req, res) => {
        // Récupère l'email et le mot de passe saisis par l'utilisateur
        const email = req.body.email; 
        const mot_de_passe = req.body.mot_de_passe; 

        console.log("Email reçu:", email);
        console.log("Mot de passe reçu:", mot_de_passe);

        // Vérifie si les champs sont remplis
        if (!email || !mot_de_passe) {
            return res.status(400).send("Veuillez remplir tous les champs.");
        }

        // Connexion à la base de données MySQL
        req.getConnection((err, connection) => {
            if (err) {
                console.error("Erreur de connexion à la base de données:", err);
                return res.status(500).send("Erreur serveur lors de la connexion à la base de données.");
            }

            // Requête SQL pour récupérer l'utilisateur correspondant à l'email fourni
            const sql = "SELECT * FROM utilisateur WHERE email = ?";
            connection.query(sql, [email], (err, results) => {
                if (err) {
                    console.error("Erreur SQL:", err);
                    return res.status(500).send("Erreur serveur lors de l'exécution de la requête.");
                }

                console.log("Résultats de la requête SQL:", results);

                // Vérifie si un utilisateur avec cet email existe en base de données
                if (results.length === 0) {
                    return res.status(401).send("Email non trouvé.");
                }

                // Récupère les données de l'utilisateur trouvé
                const utilisateur = results[0]; 
                console.log("Mot de passe stocké:", utilisateur.mot_de_passe);

                if (!utilisateur.mot_de_passe) {
                    console.error("Erreur: Aucun mot de passe trouvé pour cet utilisateur.");
                    return res.status(500).send("Erreur: Mot de passe non défini en base de données.");
                }

                console.log("Mot de passe saisi:", mot_de_passe);
                console.log("Mot de passe stocké (en clair):", utilisateur.mot_de_passe);

                // Vérification du mot de passe en clair
                if (mot_de_passe !== utilisateur.mot_de_passe) {
                    return res.status(401).send("Mot de passe incorrect.");
                }

                // Redirection vers la page Programme TV après une connexion réussie
                res.redirect("/programmeTv");
            });
        });
    }
};
