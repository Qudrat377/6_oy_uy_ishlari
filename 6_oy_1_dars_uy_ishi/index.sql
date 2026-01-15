{car create}

create database car;
DROP TABLE IF EXISTS madel;

CREATE TABLE "madel" (
    id serial primary key,
    nomi varchar(50),
    color varchar(150),
    password varchar(50),
    distanation int,
    year int
);

alter table "madel" drop column password;
alter table "madel" rename to "cars";
alter table "cars" add column age int;
ALTER TABLE "cars" RENAME COLUMN age TO yosh;

select * from "cars";
select * from "cars" where id = 7;
insert into "cars"(nomi, color, distanation, year, yosh) values('matiz', 'oq', 87000, 2009, 17);
update "cars" set nomi = 'nexia 2' where nomi = 'matiz';
update "cars" set color = 'qora', year = 2012, yosh = 14 where nomi = 'tico';
delete from cars where id = 2;

{fruit create}

create database fruit;

 create table "mevalar" (
    id serial primary key,
    nomi varchar(50),
    kg int,
    color varchar(50)
 );

 alter table "mevalar" drop column kg;
 alter table "mevalar" add column kg int;
 alter table "mevalar" rename to "fruits";
 ALTER TABLE "fruits" RENAME COLUMN kg TO kilogramm;

 select * from "fruits";
 select * from "fruits" where id = 7;
 insert into "fruits"(nomi, color, kilogramm) values('anor', 'qizil', 1);
 update "fruits" set nomi = 'uzum' where id = 2;
 update "fruits" set color = 'yashil', kilogramm = 5 where id = 2;
 delete from fruits where id = 2;

 {animal create}

create database animall;

\l

DROP TABLE IF EXISTS yirtqichlar;

CREATE TABLE "yirtqichlar" (
    id varchar(255) primary key default gen_random_uuid(),
    nomi varchar(50) not null,
    email varchar(255),
    kg int
);

\dt

alter table "yirtqichlar" add column age int;
select * from "yirtqichlar";
select age from "yirtqichlar";
alter table "yirtqichlar" rename column email to password;
alter table "yirtqichlar" drop column password;

insert into "yirtqichlar"(nomi, kg, age) values('sher', 87, 14);
insert into "yirtqichlar"(nomi, kg, age) values('bo"ri', 45, 7), ('sirtlon', 75, 4), ('oq ayiq', 120, 8), ('puma', 19, 8), ('yolbars', 65, 5), ('gepard', 47, 8);
select * from "yirtqichlar" where nomi = 'sher';
update "yirtqichlar" set nomi = 'tulki' where nomi = 'sirtlon';
update "yirtqichlar" set kg = 18, age = 6 where nomi = 'tulki';
delete from "yirtqichlar" where id = '713e5138-ff03-4974-a027-c3b1b213dc3c';

 {flower create}

create database flower;

\l

\c flower

drop table if exists flovers;

\c car

alter database flower rename to flowers;

\c flowers

create table "gullar" (
    id serial primary key,
    nomi varchar(59) not null,
    ifori varchar(200)
);

select * from "gullar";
alter table "gullar" add column color varchar(49);
select nomi, ifori from "gullar";
alter table "gullar" rename column color to rangi;
alter table "gullar" add column age int;
alter table "gullar" drop column age;

insert into "gullar"(nomi, ifori, rangi) values('arhedeya', 'bilmadim', 'oq');
insert into "gullar"(nomi, ifori, rangi) values('lola', 'yengil', 'qizil'), ('atirgul', 'bilmadim', 'oq'), ('qaqtus', 'yoq ignali', 'yashil'), ('liliya', 'bilmadim', 'oq balki qizil'), ('chinnigul', 'yengil', 'oq'), ('moychechak', 'tabiy', 'sariq');
select * from "gullar" where nomi = 'lola';
insert into "gullar"(nomi, ifori, rangi) values('nilufa', 'bilmadim', 'yashul');
update "gullar" set ifori = 'yengil', rangi = 'sariq' where nomi = 'nilufa';
delete from "gullar" where id = 8;