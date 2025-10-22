Text file: 0000_burly_gamma_corps.sql
Latest content with line numbers:
1	CREATE TABLE `users` (
2		`id` varchar(64) NOT NULL,
3		`name` text,
4		`email` varchar(320),
5		`loginMethod` varchar(64),
6		`role` enum('user','admin') NOT NULL DEFAULT 'user',
7		`createdAt` timestamp DEFAULT (now()),
8		`lastSignedIn` timestamp DEFAULT (now()),
9		CONSTRAINT `users_id` PRIMARY KEY(`id`)
10	);
11	