 Gestion des Bases de Données

Commande	                                                            Signification

SHOW DATABASES;	                                                        Affiche toutes les bases de données existantes
CREATE DATABASE nom_db;	                                                Crée une nouvelle base de données
USE nom_db;	                                                            électionne une base de données pour travailler dessus
DROP DATABASE nom_db;	                                                Supprime une base de données
ALTER DATABASE nom_db CHARACTER SET utf8mb4;	                        Modifie le jeu de caractères d'une base de données


Gestion des Tables

Commande	                                                             Signification

SHOW TABLES;	                                                        Affiche toutes les tables de la base sélectionnée
CREATE TABLE nom_table (colonne1 TYPE, colonne2 TYPE, ...);         	Crée une table
DROP TABLE nom_table;	                                                Supprime une table
ALTER TABLE nom_table ADD colonne TYPE;	                                Ajoute une colonne à une table
ALTER TABLE nom_table DROP COLUMN colonne;	                            Supprime une colonne d'une table
ALTER TABLE nom_table MODIFY colonne TYPE;	                            Modifie le type d'une colonne
DESCRIBE nom_table; ou SHOW COLUMNS FROM nom_table;	                    Affiche la structure d'une table


Manipulation des Données

Commande	                                                            Signification

SELECT * FROM nom_table;	                                            Récupère toutes les données d'une table
SELECT colonne1, colonne2 FROM nom_table;	                            Sélectionne des colonnes spécifiques
INSERT INTO nom_table (col1, col2) VALUES ('val1', 'val2');	            Insère des données dans une table
UPDATE nom_table SET col1 = 'nouvelle_valeur' WHERE condition;	        Met à jour des données
DELETE FROM nom_table WHERE condition;	                                Supprime des données d'une table
TRUNCATE TABLE nom_table;	                                             Vide complètement une table sans la supprimer



Filtrage et Conditions


Commande	                                                             Signification
WHERE	                                                                 Filtre les résultats selon une condition
ORDER BY colonne ASC/DESC;	                                             Trie les résultats par ordre croissant ou décroissant
LIMIT n;                                                                 Limite le nombre de résultats retournés
GROUP BY colonne;	                                                     Regroupe les résultats par valeur d’une colonne
HAVING condition;	                                                     Filtre les groupes (utilisé après GROUP BY)



 Jointures (Relations entre Tables)

Commande	                                                            Signification

INNER JOIN	                                                            Récupère les données communes entre deux tables
LEFT JOIN	                                                            Récupère toutes les données de la table de gauche et celles correspondantes de la table de droite
RIGHT JOIN	                                                            Récupère toutes les données de la table de droite et celles correspondantes de la table de gauche
FULL JOIN                                                               (Non supporté par MySQL)	Combine LEFT JOIN et RIGHT JOIN


 Exemple d’une jointure :

SELECT equipe.nom, programmediffusion.titre
FROM equipe
INNER JOIN programmediffusion ON equipe.id = programmediffusion.equipe_id;


Index et Clés

Commande	                                                            Signification

PRIMARY KEY (colonne)	                                            Définit une clé primaire (unique et obligatoire)
FOREIGN KEY (colonne) REFERENCES autre_table(colonne);          	Définit une clé étrangère (relation entre tables)
CREATE INDEX nom_index ON nom_table(colonne);	                    Crée un index pour accélérer les requêtes
DROP INDEX nom_index ON nom_table;	                                Supprime un index



Utilisateurs et Droits

Commande	                                                        Signification
CREATE USER 'nom_user'@'localhost' IDENTIFIED BY 'password';	    Crée un utilisateur
GRANT ALL PRIVILEGES ON nom_db.* TO 'nom_user'@'localhost';     	Accorde des privilèges à un utilisateur
REVOKE ALL PRIVILEGES ON nom_db.* FROM 'nom_user'@'localhost';	    Révoque les privilèges
DROP USER 'nom_user'@'localhost';	                                Supprime un utilisateur


Transactions

Commande	                                                        Signification
START TRANSACTION;	                                                Démarre une transaction
COMMIT;	                                                            Valide les changements (sauvegarde)
ROLLBACK;	A                                                       nnule les changements en cours
SAVEPOINT nom;	                                                    Crée un point de sauvegarde dans une transaction
ROLLBACK TO SAVEPOINT nom;	                                        Revient à un point de sauvegarde


Sauvegarde et Restauration

Commande	                                                        Signification
mysqldump -u utilisateur -p nom_db > sauvegarde.sql	               Sauvegarde une base de données
mysql -u utilisateur -p nom_db < sauvegarde.sql	                    Restaure une base de données à partir d'un fichier









CREATE DATABASE chainetv;
USE chainetv;

CREATE TABLE equipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    poste VARCHAR(255) NOT NULL
);



CREATE TABLE programmediffusion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    heure_debut TIME NOT NULL,
    heure_fin TIME NOT NULL
);


 Les equipe
INSERT INTO equipe (nom, poste) VALUES 
('Sophie Martin', 'Directrice Générale'),
('Assani Moussa', 'Chef d\'émission'),
('Alice Bernard', 'Responsable de la programmation'),
('Marc Lemoine', 'Cameraman principal'),
('Luc Durand', 'Assistant caméraman'),
('Thomas Morel', 'Ingénieur du son'),
('Elena Rousseau', 'Réalisatrice');

Les programmediffusion

 INSERT INTO programmediffusion (titre, heure_debut, heure_fin) VALUES 
('Chigoma', '14:00:00', '15:00:00'),
('Débat', '16:00:00', '17:30:00'),
('Mazaraka', '18:00:00', '19:00:00'),
('Chants', '20:00:00', '21:00:00'),
('Documentaire', '22:00:00', '23:30:00');


Ajouter une colonne

ALTER TABLE programmediffusion ADD lien_youtube VARCHAR(100);



CREATE TABLE utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(155) NOT NULL,
    prenom VARCHAR(155) NOT NULL,
    email VARCHAR(155) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    date_naissance DATE
);

INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, date_naissance) 
VALUES 
('Dupont', 'Jean', 'jean.dupont@email.com', 'jeanpasse123', '1990-05-15'),
('Martin', 'Sophie', 'sophie.martin@email.com', 'sophiepasse456', '1985-10-23'),
('Durand', 'Paul', 'paul.durand@email.com', 'paulpasse789', '2000-07-09'),
('Bacar', 'Moussa', 'moussa.bacar@email.com', 'moussapasse789', '2000-07-09');
