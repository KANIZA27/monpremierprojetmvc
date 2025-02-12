module.exports = {
    // Fonction pour afficher la page de connexion
    loginView: (req, res) => {
        res.render("login"); // Il doit chercher 'views/login.ejs'
    },

    // Fonction pour valider la connexion
    loginValidation: async (req, res) => {
        const email = req.body.email; // Récupère l'email saisi par l'utilisateur
        const password = req.body.password; // Récupère le mot de passe saisi par l'utilisateur

        // Vérifie si les champs sont remplis
        if (!email || !password) {
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
            connection.query(sql, [email], async (err, results) => {
                if (err) {
                    console.error("Erreur SQL:", err);
                    return res.status(500).send("Erreur serveur lors de l'exécution de la requête.");
                }

                // Vérifie si un utilisateur avec cet email existe en base de données
                if (results.length === 0) {
                    return res.status(401).send("Email non trouvé.");
                }

                // Récupère les données de l'utilisateur trouvé
                const user = results[0];

                try {
                    // Vérification du mot de passe hashé stocké en base de données
                    const validPassword = await bcrypt.compare(password, user.password);
                    if (!validPassword) {
                        return res.status(401).send("Mot de passe incorrect.");
                    }

                    // Stocke les informations de l'utilisateur en session pour maintenir la connexion
                    req.session.userId = user.id;
                    req.session.email = user.email;

                    // Redirection vers la page Programme TV après une connexion réussie
                    res.redirect("/programmeTv");
                } catch (err) {
                    console.error("Erreur lors de la vérification du mot de passe:", err);
                    res.status(500).send("Erreur serveur.");
                }
            });
        });
    }
};