Text file: 0002_supreme_white_tiger.sql
Latest content with line numbers:
1	CREATE TABLE `documents` (
2		`id` varchar(64) NOT NULL,
3		`candidateId` varchar(64) NOT NULL,
4		`documentType` enum('cv','insurance','certificate','qualification','dbs_check','other') NOT NULL,
5		`fileName` varchar(255) NOT NULL,
6		`fileUrl` varchar(500) NOT NULL,
7		`fileSize` int,
8		`mimeType` varchar(100),
9		`isVerified` boolean DEFAULT false,
10		`verifiedBy` varchar(64),
11		`verifiedAt` timestamp,
12		`expiryDate` timestamp,
13		`uploadedAt` timestamp DEFAULT (now()),
14		CONSTRAINT `documents_id` PRIMARY KEY(`id`)
15	);
16	--> statement-breakpoint
17	CREATE TABLE `inductionChecklist` (
18		`id` varchar(64) NOT NULL,
19		`candidateId` varchar(64) NOT NULL,
20		`personalInfoComplete` boolean DEFAULT false,
21		`contactDetailsVerified` boolean DEFAULT false,
22		`emergencyContactAdded` boolean DEFAULT false,
23		`qualificationsUploaded` boolean DEFAULT false,
24		`certificatesVerified` boolean DEFAULT false,
25		`insuranceValid` boolean DEFAULT false,
26		`dbsCheckComplete` boolean DEFAULT false,
27		`rightToWorkVerified` boolean DEFAULT false,
28		`contractSigned` boolean DEFAULT false,
29		`gdprConsentGiven` boolean DEFAULT false,
30		`reference1Received` boolean DEFAULT false,
31		`reference2Received` boolean DEFAULT false,
32		`referencesVerified` boolean DEFAULT false,
33		`equipmentListProvided` boolean DEFAULT false,
34		`equipmentVerified` boolean DEFAULT false,
35		`brandsSpecified` boolean DEFAULT false,
36		`phoneInterviewCompleted` boolean DEFAULT false,
37		`skillsAssessmentPassed` boolean DEFAULT false,
38		`finalInterviewCompleted` boolean DEFAULT false,
39		`availabilityConfirmed` boolean DEFAULT false,
40		`locationsCovered` boolean DEFAULT false,
41		`transportationConfirmed` boolean DEFAULT false,
42		`systemTrainingComplete` boolean DEFAULT false,
43		`profileSetupComplete` boolean DEFAULT false,
44		`teamIntroductionDone` boolean DEFAULT false,
45		`policiesAcknowledged` boolean DEFAULT false,
46		`updatedAt` timestamp DEFAULT (now()),
47		CONSTRAINT `inductionChecklist_id` PRIMARY KEY(`id`)
48	);
49	--> statement-breakpoint
50	ALTER TABLE `candidates` MODIFY COLUMN `hasMobileExperience` boolean;--> statement-breakpoint
51	ALTER TABLE `candidates` MODIFY COLUMN `stage` enum('application_review','phone_interview','skills_assessment','final_interview','induction') NOT NULL;--> statement-breakpoint
52	ALTER TABLE `candidates` MODIFY COLUMN `status` enum('pending','scheduled','in_progress','completed','rejected','induction') NOT NULL;--> statement-breakpoint
53	ALTER TABLE `candidates` MODIFY COLUMN `cvUrl` varchar(500);--> statement-breakpoint
54	ALTER TABLE `candidates` MODIFY COLUMN `insuranceUrl` varchar(500);--> statement-breakpoint
55	ALTER TABLE `candidates` MODIFY COLUMN `updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
56	ALTER TABLE `candidates` DROP COLUMN `applicationNotes`;--> statement-breakpoint
57	ALTER TABLE `candidates` DROP COLUMN `phoneInterviewNotes`;--> statement-breakpoint
58	ALTER TABLE `candidates` DROP COLUMN `skillsAssessmentNotes`;--> statement-breakpoint
59	ALTER TABLE `candidates` DROP COLUMN `finalInterviewNotes`;--> statement-breakpoint
60	ALTER TABLE `candidates` DROP COLUMN `inductionNotes`;--> statement-breakpoint
61	ALTER TABLE `emailHistory` DROP COLUMN `recipientEmail`;