Text file: 0001_strong_jimmy_woo.sql
Latest content with line numbers:
1	CREATE TABLE `candidates` (
2		`id` varchar(64) NOT NULL,
3		`fullName` varchar(255) NOT NULL,
4		`email` varchar(320) NOT NULL,
5		`phone` varchar(50),
6		`profession` varchar(100) NOT NULL,
7		`yearsExperience` int,
8		`specializations` text,
9		`equipment` text,
10		`hasMobileExperience` boolean DEFAULT false,
11		`stage` enum('application_review','phone_interview','skills_assessment','final_interview','induction') NOT NULL DEFAULT 'application_review',
12		`status` enum('pending','scheduled','in_progress','induction','rejected','hired','withdrawn') NOT NULL DEFAULT 'pending',
13		`cvUrl` text,
14		`insuranceUrl` text,
15		`availability` text,
16		`appliedAt` timestamp DEFAULT (now()),
17		`updatedAt` timestamp DEFAULT (now()),
18		`isArchived` boolean DEFAULT false,
19		`applicationNotes` text,
20		`phoneInterviewNotes` text,
21		`skillsAssessmentNotes` text,
22		`finalInterviewNotes` text,
23		`inductionNotes` text,
24		CONSTRAINT `candidates_id` PRIMARY KEY(`id`)
25	);
26	--> statement-breakpoint
27	CREATE TABLE `emailHistory` (
28		`id` varchar(64) NOT NULL,
29		`candidateId` varchar(64) NOT NULL,
30		`templateId` varchar(64),
31		`recipientEmail` varchar(320) NOT NULL,
32		`subject` varchar(500) NOT NULL,
33		`body` text NOT NULL,
34		`sentAt` timestamp DEFAULT (now()),
35		`sentBy` varchar(64),
36		`status` enum('sent','failed') DEFAULT 'sent',
37		CONSTRAINT `emailHistory_id` PRIMARY KEY(`id`)
38	);
39	--> statement-breakpoint
40	CREATE TABLE `emailTemplates` (
41		`id` varchar(64) NOT NULL,
42		`name` varchar(255) NOT NULL,
43		`subject` varchar(500) NOT NULL,
44		`body` text NOT NULL,
45		`stage` varchar(100),
46		`createdAt` timestamp DEFAULT (now()),
47		`updatedAt` timestamp DEFAULT (now()),
48		CONSTRAINT `emailTemplates_id` PRIMARY KEY(`id`)
49	);
50	