create database lesson6;

\c lesson6

CREATE TABLE auth(
    "id" serial NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
"role" VARCHAR(255) CHECK (
    "role" IN ('user', 'admin', 'superadmin')
) DEFAULT 'user',
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
    auth ADD PRIMARY KEY("id");
CREATE TABLE board_list(
    "id" serial NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" VARCHAR(255) CHECK (
        "status" IN('Pending', 'inProgress', 'Done')
        ) DEFAULT 'Pending',
        "task_user_id" INTEGER NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "created_by" INTEGER
);
ALTER TABLE
    board_list ADD PRIMARY KEY("id");
ALTER TABLE
    board_list ADD CONSTRAINT "board_list_created_by_foreign" FOREIGN KEY("created_by") REFERENCES auth("id");
ALTER TABLE
    board_list ADD CONSTRAINT "board_list_task_user_id_foreign" FOREIGN KEY("task_user_id") REFERENCES auth("id");

ALTER TABLE board_list ADD COLUMN "completed_at" TIMESTAMP;

-- trigger qo'shish

CREATE OR REPLACE FUNCTION set_completed_at()
RETURNS TRIGGER AS $$
BEGIN
    -- Agar status 'Done' ga o'zgargan bo'lsa va completed_at hali bo'sh bo'lsa
    IF NEW.status = 'Done' AND (OLD.status IS DISTINCT FROM 'Done') THEN
        NEW.completed_at = CURRENT_TIMESTAMP;
    -- Agar status 'Done' dan boshqa narsaga o'zgartirilsa, vaqtni o'chirib tashlaymiz
    ELSIF NEW.status != 'Done' THEN
        NEW.completed_at = NULL;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_completed_at
BEFORE UPDATE ON board_list
FOR EACH ROW
EXECUTE FUNCTION set_completed_at();