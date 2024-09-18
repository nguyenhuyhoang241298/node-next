ALTER TABLE `users` MODIFY COLUMN `full_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` datetime DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` datetime DEFAULT CURRENT_TIMESTAMP;