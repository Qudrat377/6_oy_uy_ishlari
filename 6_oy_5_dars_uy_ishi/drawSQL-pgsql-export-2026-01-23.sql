CREATE TABLE "contacts"(
    "id" UUID NOT NULL,
    "partner_id" UUID NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "notes" VARCHAR(255) NOT NULL,
    "created-at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "created_by" UUID NOT NULL,
    "update_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_by" UUID NOT NULL
);
ALTER TABLE
    "contacts" ADD PRIMARY KEY("id");
CREATE TABLE "sponsors"(
    "id" UUID NOT NULL,
    "group_id" UUID NOT NULL,
    "partner_id" UUID NOT NULL,
    "sponsor_pack_id" UUID NOT NULL,
    "contact_id" UUID NULL,
    "start" DATE NOT NULL,
    "finish" DATE NOT NULL,
    "paid" DATE NULL,
    "price" FLOAT(53) NULL
);
ALTER TABLE
    "sponsors" ADD PRIMARY KEY("id");
CREATE TABLE "venues"(
    "id" UUID NOT NULL,
    "partner_id" UUID NOT NULL,
    "contact_id" UUID NULL,
    "address" VARCHAR(255) NOT NULL,
    "address_lat" BIGINT NULL
);
ALTER TABLE
    "venues" ADD PRIMARY KEY("id");
CREATE TABLE "partners"(
    "id" UUID NOT NULL,
    "group_id" UUID NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "notes" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NULL,
    "logo" VARCHAR(255) NOT NULL,
    "social_facebook" VARCHAR(255) NULL,
    "social_instagram" VARCHAR(255) NULL,
    "social_twitter" VARCHAR(255) NULL,
    "social_linkedin" VARCHAR(255) NULL,
    "social_youtube" VARCHAR(255) NULL,
    "social_meetup" VARCHAR(255) NULL,
    "social_eventbrite" VARCHAR(255) NULL,
    "social_slack" VARCHAR(255) NULL,
    "social_discord" VARCHAR(255) NULL,
    "social_github" VARCHAR(255) NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "created_by" UUID NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_by" UUID NOT NULL
);
ALTER TABLE
    "partners" ADD PRIMARY KEY("id");
CREATE TABLE "sponsor_packs"(
    "id" UUID NOT NULL,
    "group_id" UUID NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" FLOAT(53) NOT NULL
);
ALTER TABLE
    "sponsor_packs" ADD PRIMARY KEY("id");
CREATE TABLE "users"(
    "id" UUID NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NULL,
    "email_validated" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "email_validation_before_login" BOOLEAN NULL,
    "avatar" VARCHAR(255) NOT NULL,
    "bio" VARCHAR(255) NULL,
    "company" VARCHAR(255) NULL,
    "location" VARCHAR(255) NULL,
    "phone" VARCHAR(255) NULL,
    "website" VARCHAR(255) NULL,
    "social_instagram" VARCHAR(255) NULL,
    "social_twitter" VARCHAR(255) NULL,
    "social_linkedin" VARCHAR(255) NULL,
    "social_youtube" VARCHAR(255) NULL,
    "social_meetup" VARCHAR(255) NULL,
    "social_eventbrite" VARCHAR(255) NULL,
    "social_slack" VARCHAR(255) NULL,
    "social_discord" VARCHAR(255) NULL,
    "social_github" VARCHAR(255) NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "mentoring" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "groups"(
    "id" UUID NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "logo" VARCHAR(255) NULL,
    "banner" VARCHAR(255) NULL,
    "contact" VARCHAR(255) NULL,
    "website" VARCHAR(255) NULL,
    "description" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NULL,
    "location_lat" VARCHAR(255) NULL
);
ALTER TABLE
    "groups" ADD PRIMARY KEY("id");
CREATE TABLE "logins"(
    "provider_id" VARCHAR(255) NOT NULL,
    "provider_key" VARCHAR(255) NOT NULL,
    "user_id" UUID NOT NULL
);
ALTER TABLE
    "logins" ADD PRIMARY KEY("provider_id");
CREATE TABLE "cfps"(
    "id" UUID NOT NULL,
    "group_id" UUID NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "begin" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "close" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "description" VARCHAR(255) NOT NULL,
    "tags" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "created_by" UUID NOT NULL,
    "update_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_by" UUID NOT NULL
);
ALTER TABLE
    "cfps" ADD PRIMARY KEY("id");
CREATE TABLE "events"(
    "id" UUID NOT NULL,
    "group_id" BIGINT NOT NULL,
    "cfp_id" UUID NULL,
    "slug" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "start" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "max_attendee" BIGINT NULL,
    "allow_rsvp" BOOLEAN NULL,
    "description" VARCHAR(255) NOT NULL,
    "orga_notes" VARCHAR(255) NOT NULL,
    "orga_notes_updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "orga_notes_updated_by" UUID NOT NULL,
    "venue" VARCHAR(255) NULL,
    "talks" VARCHAR(255) NOT NULL,
    "tags" VARCHAR(255) NOT NULL,
    "published" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "meetupgroup" VARCHAR(255) NULL,
    "meetupevent" BIGINT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "created_by" UUID NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_by" UUID NOT NULL,
    "kind" VARCHAR(255) NULL
);
ALTER TABLE
    "events" ADD PRIMARY KEY("id");
CREATE TABLE "proposal_ratings"(
    "proposal_id" UUID NOT NULL,
    "grade" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "created_by" UUID NOT NULL
);
ALTER TABLE
    "proposal_ratings" ADD PRIMARY KEY("proposal_id");
CREATE TABLE "event_rsvps"(
    "event_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "answer" VARCHAR(255) NOT NULL,
    "answered_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "event_rsvps" ADD PRIMARY KEY("event_id");
CREATE TABLE "proposals"(
    "id" UUID NOT NULL,
    "talk_id" UUID NOT NULL,
    "cfp_id" UUID NOT NULL,
    "event_id" UUID NULL,
    "status" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "durpation" BIGINT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "speakers" VARCHAR(255) NOT NULL,
    "slides" VARCHAR(255) NULL,
    "video" VARCHAR(255) NOT NULL,
    "tags" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "created_by" UUID NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_by" UUID NOT NULL,
    "orga_tags" VARCHAR(255) NULL,
    "message" VARCHAR(255) NULL
);
ALTER TABLE
    "proposals" ADD PRIMARY KEY("id");
CREATE TABLE "comments"(
    "event_id" UUID NOT NULL,
    "proposal_id" UUID NULL,
    "id" UUID NOT NULL,
    "kind" VARCHAR(255) NOT NULL,
    "answers" VARCHAR(255) NULL,
    "text" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "created_by" UUID NOT NULL
);
ALTER TABLE
    "comments" ADD PRIMARY KEY("event_id");
CREATE TABLE "talks"(
    "id" UUID NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "duration" BIGINT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "speakers" VARCHAR(255) NOT NULL,
    "slides" VARCHAR(255) NULL,
    "video" VARCHAR(255) NULL,
    "tags" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "created_by" UUID NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_by" UUID NOT NULL,
    "message" VARCHAR(255) NULL
);
ALTER TABLE
    "talks" ADD PRIMARY KEY("id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_updated_by_foreign" FOREIGN KEY("updated_by") REFERENCES "users"("id");
ALTER TABLE
    "partners" ADD CONSTRAINT "partners_updated_by_foreign" FOREIGN KEY("updated_by") REFERENCES "users"("id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_id_foreign" FOREIGN KEY("id") REFERENCES "comments"("event_id");
ALTER TABLE
    "partners" ADD CONSTRAINT "partners_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "groups"("id");
ALTER TABLE
    "sponsors" ADD CONSTRAINT "sponsors_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "groups"("id");
ALTER TABLE
    "talks" ADD CONSTRAINT "talks_created_by_foreign" FOREIGN KEY("created_by") REFERENCES "users"("id");
ALTER TABLE
    "sponsor_packs" ADD CONSTRAINT "sponsor_packs_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "groups"("id");
ALTER TABLE
    "event_rsvps" ADD CONSTRAINT "event_rsvps_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_orga_notes_updated_by_foreign" FOREIGN KEY("orga_notes_updated_by") REFERENCES "users"("id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "groups"("id");
ALTER TABLE
    "cfps" ADD CONSTRAINT "cfps_group_id_foreign" FOREIGN KEY("group_id") REFERENCES "groups"("id");
ALTER TABLE
    "logins" ADD CONSTRAINT "logins_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "proposals" ADD CONSTRAINT "proposals_cfp_id_foreign" FOREIGN KEY("cfp_id") REFERENCES "cfps"("id");
ALTER TABLE
    "cfps" ADD CONSTRAINT "cfps_updated_by_foreign" FOREIGN KEY("updated_by") REFERENCES "users"("id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_id_foreign" FOREIGN KEY("id") REFERENCES "event_rsvps"("event_id");
ALTER TABLE
    "proposals" ADD CONSTRAINT "proposals_updated_by_foreign" FOREIGN KEY("updated_by") REFERENCES "users"("id");
ALTER TABLE
    "venues" ADD CONSTRAINT "venues_contact_id_foreign" FOREIGN KEY("contact_id") REFERENCES "contacts"("id");
ALTER TABLE
    "proposals" ADD CONSTRAINT "proposals_created_by_foreign" FOREIGN KEY("created_by") REFERENCES "users"("id");
ALTER TABLE
    "proposals" ADD CONSTRAINT "proposals_id_foreign" FOREIGN KEY("id") REFERENCES "proposal_ratings"("proposal_id");
ALTER TABLE
    "contacts" ADD CONSTRAINT "contacts_updated_by_foreign" FOREIGN KEY("updated_by") REFERENCES "users"("id");
ALTER TABLE
    "talks" ADD CONSTRAINT "talks_updated_by_foreign" FOREIGN KEY("updated_by") REFERENCES "users"("id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_created_by_foreign" FOREIGN KEY("created_by") REFERENCES "users"("id");
ALTER TABLE
    "proposals" ADD CONSTRAINT "proposals_speakers_foreign" FOREIGN KEY("speakers") REFERENCES "talks"("speakers");
ALTER TABLE
    "partners" ADD CONSTRAINT "partners_created_by_foreign" FOREIGN KEY("created_by") REFERENCES "users"("id");
ALTER TABLE
    "sponsors" ADD CONSTRAINT "sponsors_contact_id_foreign" FOREIGN KEY("contact_id") REFERENCES "contacts"("id");
ALTER TABLE
    "proposals" ADD CONSTRAINT "proposals_event_id_foreign" FOREIGN KEY("event_id") REFERENCES "events"("id");
ALTER TABLE
    "cfps" ADD CONSTRAINT "cfps_created_by_foreign" FOREIGN KEY("created_by") REFERENCES "users"("id");
ALTER TABLE
    "proposal_ratings" ADD CONSTRAINT "proposal_ratings_created_by_foreign" FOREIGN KEY("created_by") REFERENCES "users"("id");
ALTER TABLE
    "proposals" ADD CONSTRAINT "proposals_talk_id_foreign" FOREIGN KEY("talk_id") REFERENCES "talks"("id");
ALTER TABLE
    "comments" ADD CONSTRAINT "comments_created_by_foreign" FOREIGN KEY("created_by") REFERENCES "users"("id");
ALTER TABLE
    "partners" ADD CONSTRAINT "partners_id_foreign" FOREIGN KEY("id") REFERENCES "venues"("id");
ALTER TABLE
    "comments" ADD CONSTRAINT "comments_proposal_id_foreign" FOREIGN KEY("proposal_id") REFERENCES "proposals"("id");
ALTER TABLE
    "contacts" ADD CONSTRAINT "contacts_partner_id_foreign" FOREIGN KEY("partner_id") REFERENCES "partners"("id");
ALTER TABLE
    "sponsors" ADD CONSTRAINT "sponsors_partner_id_foreign" FOREIGN KEY("partner_id") REFERENCES "partners"("id");
ALTER TABLE
    "partners" ADD CONSTRAINT "partners_created_by_foreign" FOREIGN KEY("created_by") REFERENCES "partners"("created_by");
ALTER TABLE
    "contacts" ADD CONSTRAINT "contacts_created_by_foreign" FOREIGN KEY("created_by") REFERENCES "users"("id");