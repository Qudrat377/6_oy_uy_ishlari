create database lesson4;

\c lesson4

create table users(
    id serial primary key,
    username varchar not null,
    birth_date date not null
);

insert into users(username, birth_date) values('ali', '2020-09-30'),
('nodir', '1998-01-03'), ('usmon', '2010-11-22');

insert into users(username, birth_date) values('ali version 2', '2020-01-10');

create or replace function calculate_age(birth_date date)
returns int as $$
begin
 return extract(year from age(birth_date));
end;
$$ language plpgsql;

select username, calculate_age(birth_date) from users;

-- shundan keyingilarini jptdan to'g'ri ko'chirdim 

-- presedura

create or replace procedure enroll_students(courseID int, studentList text)
language plpgsql as
$$
declare
    studentID int;
    cur cursor for select (jsonb_array_elements_text(studentList::jsonb))::int;
begin
    open cur;
    loop
        fetch cur into studentID;
        exit when not found;

        insert into enrollments (student_id, course_id, enrollment_date)
        values(studentID, courseID, current_date);
    end loop;
    close cur;
end;
$$;

call enroll_students(1, '[1, 2, 3, 4]');

drop table if exists enrollments;
drop table if exists students;
drop table if exists course;

create table students(
    id serial primary key,
    username varchar(100) not null,
    age int not null
);

create table course(
    id serial primary key,
    title varchar(100) not null
);

create table enrollments(
    id serial primary key,
    student_id int not null,
    course_id int not null,
    enrollment_date date not null
);

insert into students(username, age) values
('bek', 55), 
('xon', 88), 
('jon', 8), 
('shox', 33);

insert into course(title) values
('node.js'), 
('react.js');



select e.id, s.username, c.title, e.enrollment_date
from enrollments e
join students s on e.student_id = s.id
join course c on e.course_id = c.id;

-- trigger 

create or replace function grade_updete_notification_function()
returns trigger as $$
begin
    if NEW.grade < OLD.grade then
    insert into notifications (student_id, message, created_at)
    values (NEW.student_id, 'Your grade has decreased to' ||
    NEW.grade, current_timestamp);
  end if;
  return NEW;
end;
$$ language plpgsql;

create trigger grade_update_notification
after update on students
for each row
execute function grade_updete_notification_function();

-- Talaba bahosi 

ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS grade INT;

UPDATE enrollments SET grade = 85 WHERE student_id = 1 AND course_id = 1;
UPDATE enrollments SET grade = 95 WHERE student_id = 1 AND course_id = 2;

CREATE OR REPLACE FUNCTION get_avg_grade(p_student_id INT)
RETURNS DECIMAL AS $$
DECLARE
    avg_result DECIMAL;
BEGIN
    SELECT AVG(grade) INTO avg_result
    FROM enrollments
    WHERE student_id = p_student_id;

    RETURN COALESCE(avg_result, 0);
END;
$$ LANGUAGE plpgsql;

SELECT username, get_avg_grade(id) AS o_rtacha_baho
FROM students;

-- dublikatlikni oldini olish

CREATE OR REPLACE FUNCTION prevent_duplicate_enroll()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM enrollments WHERE student_id = NEW.student_id AND course_id = NEW.course_id) THEN
        RAISE EXCEPTION 'Bu talaba allaqachon ushbu kursga yozilgan!';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_no_duplicate
BEFORE INSERT ON enrollments
FOR EACH ROW EXECUTE FUNCTION prevent_duplicate_enroll();

-- 2 topshiriq

DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS course CASCADE;
DROP TABLE IF EXISTS students CASCADE;

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    age INT NOT NULL
);

CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);

CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    course_id INT REFERENCES course(id) ON DELETE CASCADE,
    grade INT DEFAULT 0,
    enrollment_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO students (username, age) VALUES ('Qudrat', 22), ('Jalol', 20), ('Sherzod', 21);
INSERT INTO course (title) VALUES ('Node.js'), ('React.js');
INSERT INTO enrollments (student_id, course_id, grade, enrollment_date) VALUES 
(1, 1, 95, '2024-01-10'), 
(2, 1, 88, '2024-01-12'), 
(3, 1, 98, '2024-01-15');

-- 1 masala

CREATE OR REPLACE FUNCTION get_best_student(p_course_id INT)
RETURNS TEXT AS $$
DECLARE
    v_result TEXT;
BEGIN
    SELECT 
        'Ismi: ' || s.username || ', Bahosi: ' || e.grade || ', Sana: ' || e.enrollment_date
    INTO v_result
    FROM enrollments e
    JOIN students s ON e.student_id = s.id
    WHERE e.course_id = p_course_id
    ORDER BY e.grade DESC
    LIMIT 1;

    RETURN COALESCE(v_result, 'Ushbu kursda talabalar mavjud emas');
END;
$$ LANGUAGE plpgsql;

SELECT get_best_student(1);

-- 2 masala 

CREATE OR REPLACE PROCEDURE count_course_students(p_course_id INT)
AS $$
DECLARE
    v_count INT;
    v_course_name TEXT;
BEGIN
    SELECT COUNT(*) INTO v_count FROM enrollments WHERE course_id = p_course_id;
    SELECT title INTO v_course_name FROM course WHERE id = p_course_id;

    RAISE NOTICE 'Kurs: %, Talabalar soni: %', v_course_name, v_count;
END;
$$ LANGUAGE plpgsql;

CALL count_course_students(1);

-- 3 masala 

CREATE OR REPLACE FUNCTION notify_enrollment()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO notifications (message)
    VALUES ('Sizning ro''yxatdan o''tishingiz muvaffaqiyatli amalga oshdi!');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_after_enroll
AFTER INSERT ON enrollments
FOR EACH ROW
EXECUTE FUNCTION notify_enrollment();

INSERT INTO enrollments (student_id, course_id, grade) VALUES (1, 2, 90);
SELECT * FROM notifications;