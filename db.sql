CREATE DATABASE films_db;

USE films_db;

CREATE TABLE films (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  date INT,
  description VARCHAR(1024)
);

INSERT INTO films (titre, date, description) VALUES
("Le parrain", 1972, "En 1945, à New York, les Corleone sont une des 5 familles de la mafia. Don Vito Corleone, `parrain' de cette famille, marie sa fille à un bookmaker."),
("L'arme fatale", 1987, "Le film suit Roger Murtaugh qui est un policier qui aime le calme et la tranquillité. Pour ses 50 ans, ses supérieurs lui font un cadeau empoisonné."),
("Piege de cristal", 1988, "Un policier new-yorkais, John McClane, est séparé de sa femme Holly, cadre dans une puissante multinationale japonaise, la Nakatomi Corporation."),
("Heat", 1995, "La bande de Neil McCauley à laquelle est venu se greffer Waingro, une nouvelle recrue, attaque un fourgon blindé pour s'emparer d'une somme importante en obligations."),
("American gangster", 2007, "En 1970, dans le quartier de Harlem à New York, Frank Lucas décide de prendre la relève du trafic de drogue.");