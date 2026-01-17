create database curs;

\c curs

create table "talabalar"(
    id serial primary key unique,
    ismi varchar not null,
    baho int,
    shahri varchar not null,
    birth_data varchar not null,
    student_id int
);

select * from "talabalar";

alter table "talabalar" rename column birth_data to tugilgan_sana;

alter table "talabalar" add column kurs varchar(100);

insert into "talabalar"(ismi, baho, shahri, tugilgan_sana, student_id, kurs) values('Botir', 90, 'Xorazm', 2007, 123, 'it');

-- bu joyi jptni karomati

insert into "talabalar"(ismi, baho, shahri, tugilgan_sana, student_id, kurs) values('Botir', 90, 'Xorazm', 2007, 123, 'it'), 
('Zilola', 85, 'Toshkent', 2006, 102, 'Iqtisodiyot'),
('Sardor', 72, 'Samarqand', 2005, 103, 'Tibbiyot'),
('Madina', 95, 'Buxoro', 2008, 104, 'Dizayn'),
('Jasur', 68, 'Andijon', 2007, 105, 'Muhandislik'),
('Laylo', 88, 'Namangan', 2006, 106, 'Tibbiyot'),
('Anvar', 77, 'Farg''ona', 2005, 107, 'Iqtisodiyot'),
('Guli', 91, 'Navoiy', 2008, 108, 'IT'),
('Otabek', 82, 'Jizzax', 2007, 109, 'Muhandislik'),
('Diyora', 79, 'Qashqadaryo', 2006, 110, 'Dizayn'),
('Shoxrux', 84, 'Surxondaryo', 2005, 111, 'IT'),
('Nigora', 93, 'Sirdaryo', 2008, 112, 'Iqtisodiyot'),
('Bekzod', 65, 'Toshkent', 2007, 113, 'Muhandislik'),
('Malika', 89, 'Samarqand', 2006, 114, 'Dizayn'),
('Bobur', 74, 'Xorazm', 2005, 115, 'IT'),
('Sevara', 92, 'Buxoro', 2008, 116, 'Tibbiyot'),
('Rustam', 81, 'Andijon', 2007, 117, 'Iqtisodiyot'),
('Ziyoda', 76, 'Namangan', 2006, 118, 'IT'),
('Farrux', 87, 'Farg''ona', 2005, 119, 'Muhandislik'),
('Mohira', 94, 'Navoiy', 2008, 120, 'Dizayn'),
('Abbos', 70, 'Jizzax', 2007, 121, 'IT'),
('Kamola', 83, 'Qashqadaryo', 2006, 122, 'Tibbiyot'),
('Doston', 78, 'Surxondaryo', 2005, 123, 'Iqtisodiyot'),
('Nozima', 96, 'Sirdaryo', 2008, 124, 'Muhandislik'),
('Elyor', 69, 'Toshkent', 2007, 125, 'IT'),
('Umida', 86, 'Samarqand', 2006, 126, 'Dizayn'),
('Sanjar', 75, 'Buxoro', 2005, 127, 'Tibbiyot'),
('Iroda', 90, 'Xorazm', 2008, 128, 'Iqtisodiyot'),
('Sherzod', 73, 'Farg''ona', 2007, 129, 'IT'),
('Munira', 97, 'Andijon', 2006, 130, 'Muhandislik'); 

select * from "talabalar" order by id asc offset 5 limit 5;

create index student_id_indexing on "talabalar"(student_id);

SELECT shahri, COUNT(*) AS talabalar_soni
FROM "talabalar"
GROUP BY shahri
ORDER BY talabalar_soni DESC;

-- bahosi 70 bilan 90 oraliqdagi talabalar yoki toshkentdagi talabalar 

select baho, shahri
from "talabalar"
where (baho between 70 and 90) or shahri = 'Toshkent';

-- ismi sh bilan boshlab d bilan tugaydigannini qidiradigan kod

select ismi 
from "talabalar" 
where ismi ilike 'sh%' or ismi ilike '%d';

SELECT kurs, ROUND(AVG(baho), 2) AS ortacha_baho
FROM "talabalar"
GROUP BY kurs
HAVING AVG(baho) > 80
ORDER BY ortacha_baho DESC;

create table "kurslar"(
    id serial primary key,
    curs_id int,
    kurs_nomi varchar(100),
    vaqti varchar
);

create table "oqituvchilar"(
    id serial primary key,
    ismi varchar(75),
    shahri varchar(100),
    age int,
    teacher_id int,
    kurs varchar(500)
);

create index teacher_id_indexing on "oqituvchilar"(teacher_id);

INSERT INTO oqituvchilar (ismi, shahri, age, teacher_id, kurs) VALUES
('Alijon Valiyev', 'Toshkent', 45, 501, 'IT'),
('Saida Karimoava', 'Samarqand', 38, 502, 'Iqtisodiyot'),
('Olim Shokirov', 'Farg''ona', 52, 503, 'Tibbiyot'),
('Zuxra Toirova', 'Buxoro', 33, 504, 'Dizayn'),
('Murod Hakimov', 'Andijon', 41, 505, 'Muhandislik'),
('Nodira Rasulova', 'Namangan', 29, 506, 'Tibbiyot'),
('Rustam Karimov', 'Xorazm', 47, 507, 'Iqtisodiyot'),
('Dilfuza Ahmedova', 'Navoiy', 35, 508, 'IT'),
('Akmal Yusupov', 'Jizzax', 43, 509, 'Muhandislik'),
('Sirojiddin Faxriyev', 'Qashqadaryo', 50, 510, 'Dizayn'),
('Gulnora Mirzayeva', 'Surxondaryo', 36, 511, 'IT'),
('Sanjar Alimov', 'Sirdaryo', 32, 512, 'Iqtisodiyot'),
('Lola Qodirova', 'Toshkent', 40, 513, 'Muhandislik'),
('Baxtiyor Nurmatov', 'Samarqand', 55, 514, 'Dizayn'),
('Feruza Ismoilova', 'Xorazm', 31, 515, 'IT'),
('Jamshid Abduvohidov', 'Buxoro', 44, 516, 'Tibbiyot'),
('Umida Orifova', 'Andijon', 37, 517, 'Iqtisodiyot'),
('Sobir Ergashev', 'Namangan', 48, 518, 'IT'),
('Shaxlo G''afforova', 'Farg''ona', 34, 519, 'Muhandislik'),
('Elyor Mo''minov', 'Navoiy', 42, 520, 'Dizayn'),
('Nilufar Azimova', 'Jizzax', 39, 521, 'IT'),
('Azamat Sattorov', 'Qashqadaryo', 46, 522, 'Tibbiyot'),
('Barno Jo''rayeva', 'Surxondaryo', 30, 523, 'Iqtisodiyot'),
('Xurshid Tursunov', 'Sirdaryo', 49, 524, 'Muhandislik'),
('Maloxat Toychiyeva', 'Toshkent', 51, 525, 'IT'),
('Sardorbek Rahimov', 'Samarqand', 33, 526, 'Dizayn'),
('Munisbek Yoldoshev', 'Buxoro', 45, 527, 'Tibbiyot'),
('Shirin Komilova', 'Xorazm', 28, 528, 'Iqtisodiyot'),
('Javlonbek Boltayev', 'Farg''ona', 43, 529, 'IT'),
('Kamola Saidova', 'Andijon', 37, 530, 'Muhandislik');

select ismi, baho from talabalar order by baho desc limit 10;

-- jpt ishlab berdi

SELECT ismi, baho, kurs
FROM (
    SELECT ismi, baho, kurs,
           ROW_NUMBER() OVER(PARTITION BY kurs ORDER BY baho DESC) as o_rin
    FROM talabalar
) AS saralangan_royxat
WHERE o_rin <= 2;

select kurs, avg(baho) as avg_baaho
from talabalar
group by kurs
having avg(baho) > 85;

select * from talabalar
where (tugilgan_sana between 2005 and 2006) or shahri = 'Xorazm' and shahri = 'Samarqand';

SELECT * FROM talabalar
WHERE (tugilgan_sana::int BETWEEN 2008 AND 2009) 
   OR shahri = 'Xorazm' 
   OR shahri = 'Samarqand';

select ismi from talabalar where ismi ilike '%o'
union
select ismi from oqituvchilar where ismi ilike 'R%';

select * from talabalar order by id asc offset 20 limit 5;