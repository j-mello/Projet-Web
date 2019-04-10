drop table if exists UTILISATEURS;

create table UTILISATEURS (
    idUtil SERIAL Primary key,
    identifiant varchar(50) unique,
    password varchar(50),
    email varchar(100) unique,
    birthdate date default '01/01/1970' constraint NN_Birthdate Not Null,
    profilePic BYTEA
);

create table LISTES (
    idListe SERIAL Primary Key,
    nomListe varchar(30),
    idUtil integer references UTILISATEURS(idUtil)
);

create table TACHES (
    idTache SERIAL Primary key,
    nomTache varchar(50),
    descriptionTache varchar(240),
    dateLimite date,
    idListe integer references LISTES(idListe)
);

//Version présentée

create table UTILISATEURS (
    idUtil SERIAL Primary key,
    identifiant varchar(50) unique,
    password varchar(50),
    email varchar(100) unique,
    birthdate date default '01/01/1970' constraint NN_Birthdate Not Null,
    profilePic BYTEA
);

create table TACHES (
    idTache SERIAL Primary key,
    nomTache varchar(50),
    descriptionTache varchar(240),
    dateLimite date,
    idUtil integer references UTILISATEURS(idUtil)
);
