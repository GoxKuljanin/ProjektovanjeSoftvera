insert into users (username, password, lastname, email, adress, city, country, phonenumber, uloga) values ('Goranr', '123', 'Kuljanin', 'goku@gmail.com', 'DJ', 'Novi Sad', 'RS', '064', 'ADMIN_K_C');
insert into users (username, password, lastname, email, adress, city, country, phonenumber, uloga) values ('ime', '456', 'Prezime', 'ime@gmail.com', 'adr', 'Novi Sad', 'RS', '064', 'User');
insert into users (username, password, lastname, email, adress, city, country, phonenumber, uloga) values ('Pacijent', '123', 'Prezime', 'pacijent', 'adr', 'Novi Sad', 'RS', '064', 'PACIJENT');
insert into users (username, password, lastname, email, adress, city, country, phonenumber, uloga) values ('Vesna', '456', 'Vesnaa', 'vesna@gmail.com', 'adr', 'Novi Sad', 'RS', '064', 'PACIJENT');
insert into users (username, password, lastname, email, adress, city, country, phonenumber, uloga) values ('Marko', '123', 'Markovic', 'lekar', 'adr', 'Novi Sad', 'RS', '064', 'LEKAR');
insert into users (username, password, lastname, email, adress, city, country, phonenumber, uloga) values ('Uros', '123', 'Urosevic', 'Urosevic2gmail.com', 'adr', 'Ruma', 'RS', '064', 'PACIJENT');
insert into users (username, password, lastname, email, adress, city, country, phonenumber, uloga) values ('Laza', '123', 'Lazic', 'Lazic2gmail.com', 'adr', 'Sremska Mitrovica', 'RS', '064', 'PACIJENT');
insert into users (username, password, lastname, email, adress, city, country, phonenumber, uloga) values ('Admin', '123', 'Klinike', 'adminklinike', 'adr', 'Sremska Mitrovica', 'RS', '064', 'ADMIN_K');
insert into users (username, password, lastname, email, adress, city, country, phonenumber, uloga) values ('Nemanja', '123', 'Pavlovic', 'lekar1', 'adr', 'Novi Sad', 'RS', '064', 'LEKAR');

insert into klinika (naziv, adresa, opis) values ('Euromedic', 'Bulervar Oslobodjenja 300', 'Na jednom mestu obezbedjena Vam je najkvalitetnija medicinska pomoc od strane vodecih specijalista i subspecijalista iz gotovo svih oblasti savremene medicine.');
insert into klinika (naziv, adresa, opis) values ('Naziv2', 'Adresa2', 'Opis2');


insert into lekar (specijalizacija, opis, slika, user_id, klinika_id) values ('Hirurg','Kratak opis lekara1','../../../../../assets/lekari/lekar1.jpg',5 , 1);
insert into lekar (specijalizacija, opis, slika, user_id, klinika_id) values ('Doktor','Kratak opis lekara2','../../../../../assets/lekari/lekar2.jpg',9 , 1);


insert into sala (name,klinika_id) values ('Ordinacija',1);
insert into sala (name,klinika_id) values ('Laboratorija',1);

insert into cena (vrednost, opis, klinika_id) values (1, 'Opis1', 1);
insert into cena (vrednost, opis, klinika_id) values (100, 'Operacija', 1);
insert into cena (vrednost, opis, klinika_id) values (250, 'Klinika2', 2);

insert into adminklinike (user_id, klinika_id) values (8, 1);


insert into zdravstvenikarton (dijagnoza, terapija) values ('Dijagnoza2', 'Terapija2');
insert into zdravstvenikarton (dijagnoza, terapija) values ('Dijagnoza1', 'Terapija1');

insert into pacijent (zdravstveni_karton_id, user_id) values (1, 3);
insert into pacijent (zdravstveni_karton_id, user_id) values (2, 4);
insert into pacijent (zdravstveni_karton_id, user_id) values (1, 6);
insert into pacijent (zdravstveni_karton_id, user_id) values (2, 7);

insert into termin (datum,klinika_id) values ('Datum1',1);

insert into pregled (datum, trajanje, sala_id, cena, lekar_id, pacijent_id, zdravstveni_karton_id, dijagnoza, terapija) values ('30.11.2019', '1h', 1, 1500.00, 1, 1, 1, 'Dijagnoza1', 'Terapija1');
insert into pregled (datum, trajanje, sala_id, cena, lekar_id) values ('14.12.2019', '11h', 1, 1500.00, 1);

