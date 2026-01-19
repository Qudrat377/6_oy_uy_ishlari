create database magazin;

\c magazin
\dt

drop table if exists customers;
create table customers(
    id serial primary key,
    username varchar(50) not null,
    phone_number int not null
);

select * from customers;

insert into customers(username, phone_number) values('qudrat', 887900677),
('anvar', 887900688),
('jasur', 887900699),
('toshmat', 887900600),
('jalol', 887900611);

drop table if exists products;
create table products(
    id serial primary key,
    title varchar(100) not null,
    price float not null
);

select * from products;

insert into products(title, price) values('phone', 120),
('laptop', 500),
('mouse', 12),
('manitor', 400),
('cd', 6.4);


drop table if exists orders;
create table orders(
    id serial primary key,
    customers_id int not null,
    product_id int not null,
    quantity int not null,
    constraint fk_customers_id foreign key(customers_id) references customers(id) on delete cascade on update cascade,
    constraint fk_product_id foreign key(product_id) references products(id) on delete cascade on update cascade
);

select * from orders;

insert into orders(customers_id, product_id, quantity) values(1, 2, 1), (3, 2, 1), (5, 1, 2), (4, 2, 1), (5, 5, 1);

-- joinlar bilan ishlash

select customers.username, orders.id as order_id, orders.quantity
from customers
join orders on customers.id = orders.customers_id;

select customers.username, products.title as product
from orders
join customers on orders.customers_id = customers.id
join products on orders.product_id = products.id;

select products.title
from products
left join orders on products.id = orders.product_id
where orders.id is null;

select customers.username, products.title, orders.quantity
from customers
full join orders on customers.id = orders.customers_id
full join products on orders.product_id = products.id;

-- 2 masala

drop table if exists students;
create table students(
    id serial primary key,
    name varchar(50) not null
);

select * from students;

insert into students(name) values('qudrat'), ('sarvar'), ('bobur'), ('sherzod'), ('jalol');

drop table if exists courses;
create table courses(
    id serial primary key,
    title varchar(100) not null
);

select * from courses;

insert into courses(title) values('javaskript'), ('react.native'), ('nest.js'), ('react.js'), ('node.js');

drop table if exists enroliments;
create table enroliments(
    id serial primary key,
    student_id int not null,
    course_id int not null,
    constraint fk_student_id foreign key(student_id) references students(id) on delete cascade on update cascade,
    constraint fk_course_id foreign key(course_id) references courses(id) on delete cascade on update cascade 
);

select * from enroliments;

insert into enroliments(student_id, course_id) values(1, 1), (4, 4), (5, 1), (4, 1), (2, 1), (3, 5), (3, 1), (1, 5), (1, 4), (5, 2);

-- joinlar bilan ishlash 

select students.name, courses.title as shablon_as
from enroliments
join students on enroliments.student_id = students.id
join courses on enroliments.course_id = courses.id;

-- vs 

SELECT s.name AS student, c.title AS course
FROM students s
JOIN enroliments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id;

select students.name as student, courses.title as course
from students
full join enroliments on students.id = enroliments.student_id
full join courses on enroliments.course_id = courses.id;
where students.id is null or courses.id is null;