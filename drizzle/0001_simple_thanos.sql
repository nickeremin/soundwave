CREATE TABLE IF NOT EXISTS "playlist_track" (
	"track_id" text PRIMARY KEY NOT NULL,
	"playlist_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "playlist" ADD COLUMN "user_id" text NOT NULL;