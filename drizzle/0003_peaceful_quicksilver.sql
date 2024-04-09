ALTER TABLE "playlist" ADD COLUMN "duration_ms" numeric DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "playlist" ADD COLUMN "total_tracks" numeric DEFAULT '0' NOT NULL;