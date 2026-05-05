-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 147.93.30.32    Database: matrimonydb
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'b54aa5c0-001f-11f1-bf6a-02420a000394:1-2546';

--
-- Table structure for table `connections`
--

DROP TABLE IF EXISTS `connections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `connections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from_user` int NOT NULL,
  `to_user` int NOT NULL,
  `status` enum('Sent','Accepted','Rejected') DEFAULT 'Sent',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `accepted_at` datetime DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_connection` (`from_user`,`to_user`),
  KEY `to_user` (`to_user`),
  CONSTRAINT `connections_ibfk_1` FOREIGN KEY (`from_user`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `connections_ibfk_2` FOREIGN KEY (`to_user`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `connections`
--

LOCK TABLES `connections` WRITE;
/*!40000 ALTER TABLE `connections` DISABLE KEYS */;
INSERT INTO `connections` VALUES (10,158,159,'Accepted','2026-03-03 03:03:10','2026-03-03 04:10:43',NULL),(12,163,159,'Sent','2026-05-03 08:33:34',NULL,NULL),(13,163,164,'Sent','2026-05-03 08:33:41',NULL,NULL);
/*!40000 ALTER TABLE `connections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `is_read` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_views`
--

DROP TABLE IF EXISTS `profile_views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_views` (
  `id` int NOT NULL AUTO_INCREMENT,
  `viewer_id` int NOT NULL,
  `viewed_user_id` int NOT NULL,
  `viewed_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_views`
--

LOCK TABLES `profile_views` WRITE;
/*!40000 ALTER TABLE `profile_views` DISABLE KEYS */;
INSERT INTO `profile_views` VALUES (1,159,158,'2026-03-02 17:33:15');
/*!40000 ALTER TABLE `profile_views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `dob` date NOT NULL,
  `birth_time` time DEFAULT NULL,
  `marital_status` varchar(20) DEFAULT NULL,
  `education` varchar(100) DEFAULT NULL,
  `occupation` varchar(100) DEFAULT NULL,
  `income` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `father_name` varchar(100) DEFAULT NULL,
  `mother_name` varchar(100) DEFAULT NULL,
  `grandfather_name` varchar(100) DEFAULT NULL,
  `grandmother_name` varchar(100) DEFAULT NULL,
  `siblings` varchar(100) DEFAULT NULL,
  `raasi` varchar(50) DEFAULT NULL,
  `star` varchar(50) DEFAULT NULL,
  `dosham` enum('No','Sevvai','Raagu','Kethu') DEFAULT 'No',
  `birth_place` varchar(100) DEFAULT NULL,
  `horoscope_uploaded` tinyint(1) DEFAULT '0',
  `horoscope_file_name` varchar(255) DEFAULT NULL,
  `horoscope_file_url` varchar(255) DEFAULT NULL,
  `religion` varchar(50) DEFAULT NULL,
  `caste` varchar(50) DEFAULT NULL,
  `address` text,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `privacy` enum('Public','Private') DEFAULT 'Public',
  `photo` varchar(255) DEFAULT NULL,
  `is_public` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(20) DEFAULT 'NEW',
  `user_id` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `work_location` varchar(255) DEFAULT NULL,
  `mother_side_grandmother_name` varchar(255) DEFAULT NULL,
  `mother_side_grandfather_name` varchar(255) DEFAULT NULL,
  `remarks` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'Swathi.S','Male','2010-12-31','22:41:00','Unmarried','BCA','Software Engineer','2000','vinothdurai137@gmail.com','6369312248','Raman','Lakshmi','Krishnan','Meena','5','Aries','Aswini','Sevvai','coimbatore',1,'1772471715600-333409280.pdf','/uploads/horoscope/1772471715600-333409280.pdf',NULL,NULL,'Saranavanampatti,TamilNadu','coimbatore','India','Public','1775195159213-732908795.png',1,'2026-03-02 17:15:18','ACTIVE',158,1,'Bengaluru','Amutha','Amuthan','Everything\'s okay'),(2,'Madhavan','Female','2001-01-01','22:57:00','Married','BBA','Data Analyasi','50000','malarkannanmadhavan@gmail.com','9585237314','Raman','Lakshmi','Krishnan','Meena','5','Gemini','Aswini','Raagu','Madurai',1,'Menu_and_BoM_Documentation.pdf','1772511011101-376405520.pdf',NULL,NULL,'Anna Nagar','Madurai','India','Private','1772510976925-465213082.webp',0,'2026-03-02 17:29:17','ACTIVE',159,1,'Chennai','Aruna','Arun','Degrees Must complete'),(3,'roacs','Male','2026-04-02','12:28:00','Unmarried','BE','Developer','15000','roacstech@gmail.com','9994911485','Ravi','Ravina','Rathinam','Radhaa','2','Aries','Bharani','Sevvai','Saravanampatti',1,'1775196009665-393269346.txt','/uploads/horoscope/1775196009665-393269346.txt',NULL,NULL,'SS kulam','Saravanampatti','India','Public','1775196009665-860812124.png',1,'2026-04-03 06:00:09','ACTIVE',162,1,'Chennai','Ramya','Ram','eve'),(4,'Gowtham Shanker.J.B','Male','1991-07-23','01:20:00','Unmarried','Bcom','Tesing','1500000','jbgowthamshankar@gmail.com','8973466515','Jothikimar','Bhavani','Thiruvenkdam','rakaja','2','Scorpio','Jyeshtha','No','Coimbatore',1,'1777702993533-429847437.png','/uploads/horoscope/1777702993533-429847437.png',NULL,NULL,'2/109 South Street','Coimbatore','India','Public','1777702993760-344869334.png',1,'2026-05-02 06:23:13','ACTIVE',163,1,'Bangalore','saras','kenja',NULL),(5,'Nithya','Female','1993-04-10','04:30:00','Unmarried','Bcom','HR','50000','nithya@gmail.com','9369979365','dsf','dfdf','sdfsd','sdf','1','Scorpio','Anuradha','No','Coimbatore',1,'1777703383971-714201827.pdf','/uploads/horoscope/1777703383971-714201827.pdf',NULL,NULL,'2/109 South Street','Coimbatore','India','Private','1777703383974-170037385.png',0,'2026-05-02 06:29:43','ACTIVE',164,1,'Coimbatore','sdfsdf','df','Fone'),(6,'Nithya','Female','1993-04-10','16:20:00','Unmarried','B.Com','HR Executive','40000','shanthi@gmail.com','1234567890','Nagarajan K','Lakshmi','Aruva Chettier','rukmani ammal','2','Gemini','Punarvasu','Raagu','Coimbatore',1,'1777796804412-626978900.png','/uploads/horoscope/1777796804412-626978900.png',NULL,NULL,'Ist Floor, 14A Thiruvalluvar Nagar','Coimbatore','India','Public','1777796804420-274609132.jfif',1,'2026-05-03 08:26:44','ACTIVE',165,1,'Bangalore','ponnammal','Rajan Chettier',NULL),(7,'Surendhran','Male','1996-11-23','08:10:00','Unmarried','BE Mech','Collins aeronautical private limited ','85000','dhamotharang39@gmail.com','9659684167','R Ganesan','Radha','Rangaiya chettiyar','Jaya mani','1','Aries','Aswini','No','Karamadai, coimbatore.',1,'1777798252283-155473969.jpg','/uploads/horoscope/1777798252283-155473969.jpg',NULL,NULL,'7/150 Dhayanur ','Karamadai, coimbatore.','India','Public','1777798252412-473087059.jpg',1,'2026-05-03 08:50:53','NEW',166,1,'Bangalore ','Lakshmi ammal','Krishnan',NULL),(8,'Gokul Krishnamoorthi R ','Male','1993-10-26','11:30:00','Unmarried','MBA','Private ','33,500','gokuldyr@gmail.com','9597478669','Ravichandran K','R Janaki','Krishnasamy ','Rangammal','1','Aquarius','Shatabhisha','No','Karamadai ',0,NULL,NULL,NULL,NULL,'7/52 Dhayanur kemmarampalayam ','Karamadai ','India ','Private','1777798385629-854731569.jpg',0,'2026-05-03 08:53:06','NEW',168,1,'Coimbatore ','Mangammal','Sathiyamoorthi ',NULL),(9,'Aravindh Uthandi','Male','1995-02-26','16:10:00','Unmarried','B com, MBA ','Software Engineer','120000','aravindhu1995@gmail.com','9786158278','Uthandi','Chandra','TU. Chinnaya Chettiyar','Thulasiammal','0','Capricorn','Uttarashada','No','Coimbatore',0,NULL,NULL,NULL,NULL,'Chinna Thadagam','Coimbatore','India','Private','1777813504739-103500466.jpg',0,'2026-05-03 13:05:17','NEW',173,1,'Coimbatore','Venkitammal','Sriranga Chettiyar',NULL),(10,'G Santhosh Kumar ','Male','1997-11-11','23:00:00','Unmarried','B Com CA & MSW','Enviro Solutions & Labs','30000','santhoshramp11@gmail.com','9629917073','T Govindaraj ','G Renuka ','Thirumalai Chettiar ','Lakshmi Ammal','1','Pisces','Uttarabhadra','No','Coimbatore ',1,'1777815747706-767379927.jpg','/uploads/horoscope/1777815747706-767379927.jpg',NULL,NULL,'Devanapuram Thekkampatti Post','Coimbatore ','India','Public','1777815748817-983306338.jpg',1,'2026-05-03 13:42:29','NEW',171,1,'Kavundampalayam -Coimbatore ','V Rajalakshmi','Varatharaj',NULL),(11,'Karunakaran','Male','1986-06-29','13:30:00','Unmarried','10th','QC','25000','vocraja.p@gmail.com','9952823090','Parameshwaran S V','Saraswathi P','Vengada chettiyar','Maasaka','2','Pisces','Revathi','Raagu','Tirupur',1,'1777820528176-786231265.jpg','/uploads/horoscope/1777820528176-786231265.jpg',NULL,NULL,'16 voc nagarc1st street valayangadu','Tirupur','India','Public','1777820528530-764881155.jpg',1,'2026-05-03 15:02:09','ACTIVE',174,1,'Tirupur','Thulasi ammal','Ramasamy chettiyar',NULL),(12,'Yogeshwaran','Male','2001-01-01','01:20:00','Unmarried','BE','enginer','150000','vinothdurai1718@gmail.com','7200623377','madhavan','madhavi','magesh','mariyyama','1','Aries','Aswini','Sevvai','Coimbatore',1,'1777955670878-982719677.txt','/uploads/horoscope/1777955670878-982719677.txt',NULL,NULL,'7/58 coimbature','Coimbatore','India','Public','1777955670879-773484178.jpg',1,'2026-05-05 04:34:30','ACTIVE',178,1,'Coimbature','malar','manoj','Teacher women req');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleid` int NOT NULL,
  `status` enum('NEW','PENDING','ACTIVE','REJECTED','INACTIVE') DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int NOT NULL DEFAULT '2',
  `is_active` tinyint(1) DEFAULT '1',
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL,
  `otp_verified` tinyint(1) DEFAULT '0',
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=179 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'ACTIVE','Admin','9999999999','admin@gmail.com','admin123',1,1,NULL,NULL,0,NULL),(158,2,'ACTIVE','Swathi','6369312248','vinothdurai137@gmail.com','123456',2,1,NULL,NULL,0,'2026-05-02 06:31:36'),(159,2,'ACTIVE','madhavan','9585237314','malarkannanmadhavan@gmail.com','123456',2,1,NULL,NULL,0,'2026-03-03 04:43:46'),(161,2,'NEW','maadyy','6380698123','madhvanmr0411@gmail.com','123456',2,1,NULL,NULL,0,NULL),(162,2,'ACTIVE','maady','9994911485','roacstech@gmail.com','123456',2,1,NULL,NULL,0,'2026-05-02 06:25:22'),(163,2,'ACTIVE','Gowtham Shanker.J.B','8973466515','jbgowthamshankar@gmail.com','12345',2,1,NULL,NULL,0,'2026-05-02 06:25:12'),(164,2,'ACTIVE','Nithya','9367797635','nithya@gmail.com','12345',2,1,NULL,NULL,0,'2026-05-02 06:30:01'),(165,2,'ACTIVE','Shanthi','1234567890','shanthi@gmail.com','12345',2,1,NULL,NULL,0,'2026-05-03 08:27:57'),(166,2,'PENDING','Damodharan G','96596841167','dhamotharang39@gmail.com','Dhamu@39',2,1,NULL,NULL,0,'2026-05-03 08:50:53'),(167,2,'NEW','Rajesh v','9788415440','rajeshkumar160794@gmail.com','Rajesh@123',2,1,NULL,NULL,0,NULL),(168,2,'PENDING','Gokul Krishnamoorthi R ','9597478669','gokuldyr@gmail.com','Gokul@1993',2,1,NULL,NULL,0,'2026-05-03 08:53:06'),(169,2,'NEW','rangaraju r','9994907964','rangaraju@gmail.com','Raju#101964',2,1,NULL,NULL,0,NULL),(170,2,'NEW','Raghuvaran ','9486894040','raghuvaran2558@gmail.com','raghu2558',2,1,NULL,NULL,0,NULL),(171,2,'PENDING','G Santhosh ','9629917073','santhoshramp11@gmail.com','sandy@9507',2,1,NULL,NULL,0,'2026-05-03 13:42:29'),(172,2,'NEW','Roopa','9535038017','keerthukanishka2120@gmail.com','1234',2,1,NULL,NULL,0,NULL),(173,2,'PENDING','Aravindh Uthandi','9786158278','aravindhu1995@gmail.com','Goodboy@12345',2,1,NULL,NULL,0,'2026-05-03 13:05:17'),(174,2,'ACTIVE','Karunakaran','09952823090','vocraja.p@gmail.com','May032026',2,1,NULL,NULL,0,'2026-05-05 04:24:14'),(175,2,'NEW','Gopinath Gopi','09976864887','gopiwritter@gmail.com','12345678',2,1,NULL,NULL,0,NULL),(176,2,'NEW','Gopalakrishnan Narasaiyan','06374819917','umagopal.kgins@gmail.com','Umagopal@1998',2,1,NULL,NULL,0,NULL),(177,2,'NEW','Gowtham vishnu j','8904043926','hariprasad.j94@gmail.com','8904043926',2,1,NULL,NULL,0,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-05 10:17:11
