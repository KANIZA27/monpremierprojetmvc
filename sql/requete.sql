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

