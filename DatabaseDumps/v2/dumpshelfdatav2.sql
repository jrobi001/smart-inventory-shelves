CREATE DATABASE  IF NOT EXISTS `shelfdatav2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shelfdatav2`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: shelfdatav2
-- ------------------------------------------------------
-- Server version	8.0.19

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

--
-- Table structure for table `id1weights`
--

DROP TABLE IF EXISTS `id1weights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `id1weights` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateTime` datetime NOT NULL,
  `weight` decimal(10,0) NOT NULL,
  `shelves_id` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_id1weights_shelves1_idx` (`shelves_id`),
  CONSTRAINT `fk_id1weights_shelves1` FOREIGN KEY (`shelves_id`) REFERENCES `shelves` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `id1weights`
--

LOCK TABLES `id1weights` WRITE;
/*!40000 ALTER TABLE `id1weights` DISABLE KEYS */;
INSERT INTO `id1weights` VALUES (1,'2020-02-13 06:00:00',1500,1),(2,'2020-02-13 07:00:00',1500,1),(3,'2020-02-13 08:00:00',1000,1),(4,'2020-02-13 09:00:00',800,1),(5,'2020-02-13 10:00:00',2000,1),(6,'2020-02-13 11:00:00',1500,1);
/*!40000 ALTER TABLE `id1weights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `id2weights`
--

DROP TABLE IF EXISTS `id2weights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `id2weights` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateTime` datetime NOT NULL,
  `weight` decimal(10,0) NOT NULL,
  `shelves_id` int NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`),
  KEY `fk_id2weights_shelves1_idx` (`shelves_id`),
  CONSTRAINT `fk_id2weights_shelves1` FOREIGN KEY (`shelves_id`) REFERENCES `shelves` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `id2weights`
--

LOCK TABLES `id2weights` WRITE;
/*!40000 ALTER TABLE `id2weights` DISABLE KEYS */;
INSERT INTO `id2weights` VALUES (1,'2020-02-13 06:00:00',1500,2),(2,'2020-02-13 07:00:00',1500,2),(3,'2020-02-13 08:00:00',1000,2),(4,'2020-02-13 09:00:00',800,2),(5,'2020-02-13 10:00:00',2000,2),(6,'2020-02-13 11:00:00',1500,2);
/*!40000 ALTER TABLE `id2weights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `id3weights`
--

DROP TABLE IF EXISTS `id3weights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `id3weights` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateTime` datetime NOT NULL,
  `weight` decimal(10,0) NOT NULL,
  `shelves_id` int NOT NULL DEFAULT '3',
  PRIMARY KEY (`id`),
  KEY `fk_id3weights_shelves1_idx` (`shelves_id`),
  CONSTRAINT `fk_id3weights_shelves1` FOREIGN KEY (`shelves_id`) REFERENCES `shelves` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `id3weights`
--

LOCK TABLES `id3weights` WRITE;
/*!40000 ALTER TABLE `id3weights` DISABLE KEYS */;
INSERT INTO `id3weights` VALUES (1,'2020-02-13 06:00:00',1500,3),(2,'2020-02-13 07:00:00',1500,3),(3,'2020-02-13 08:00:00',1000,3),(4,'2020-02-13 09:00:00',800,3),(5,'2020-02-13 10:00:00',2000,3),(6,'2020-02-13 11:00:00',1500,3);
/*!40000 ALTER TABLE `id3weights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `id4weights`
--

DROP TABLE IF EXISTS `id4weights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `id4weights` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateTime` datetime NOT NULL,
  `weight` decimal(10,0) NOT NULL,
  `shelves_id` int NOT NULL DEFAULT '4',
  PRIMARY KEY (`id`),
  KEY `fk_id4weights_shelves1_idx` (`shelves_id`),
  CONSTRAINT `fk_id4weights_shelves1` FOREIGN KEY (`shelves_id`) REFERENCES `shelves` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `id4weights`
--

LOCK TABLES `id4weights` WRITE;
/*!40000 ALTER TABLE `id4weights` DISABLE KEYS */;
INSERT INTO `id4weights` VALUES (1,'2020-02-13 06:00:00',1500,4),(2,'2020-02-13 07:00:00',1500,4),(3,'2020-02-13 08:00:00',1000,4),(4,'2020-02-13 09:00:00',800,4),(5,'2020-02-13 10:00:00',2000,4),(6,'2020-02-13 11:00:00',1000,4);
/*!40000 ALTER TABLE `id4weights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `id5weights`
--

DROP TABLE IF EXISTS `id5weights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `id5weights` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateTime` datetime NOT NULL,
  `weight` decimal(10,0) NOT NULL,
  `shelves_id` int NOT NULL DEFAULT '5',
  PRIMARY KEY (`id`),
  KEY `fk_id5weights_shelves1_idx` (`shelves_id`),
  CONSTRAINT `fk_id5weights_shelves1` FOREIGN KEY (`shelves_id`) REFERENCES `shelves` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `id5weights`
--

LOCK TABLES `id5weights` WRITE;
/*!40000 ALTER TABLE `id5weights` DISABLE KEYS */;
INSERT INTO `id5weights` VALUES (1,'2020-02-13 06:00:00',1500,5),(2,'2020-02-13 07:00:00',1500,5),(3,'2020-02-13 08:00:00',1000,5),(4,'2020-02-13 09:00:00',800,5),(5,'2020-02-13 10:00:00',1500,5),(6,'2020-02-13 11:00:00',1000,5);
/*!40000 ALTER TABLE `id5weights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `id6weights`
--

DROP TABLE IF EXISTS `id6weights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `id6weights` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateTime` datetime NOT NULL,
  `weight` decimal(10,0) NOT NULL,
  `shelves_id` int NOT NULL DEFAULT '6',
  PRIMARY KEY (`id`),
  KEY `fk_id6weights_shelves1_idx` (`shelves_id`),
  CONSTRAINT `fk_id6weights_shelves1` FOREIGN KEY (`shelves_id`) REFERENCES `shelves` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `id6weights`
--

LOCK TABLES `id6weights` WRITE;
/*!40000 ALTER TABLE `id6weights` DISABLE KEYS */;
INSERT INTO `id6weights` VALUES (1,'2020-02-13 06:00:00',1500,6),(2,'2020-02-13 07:00:00',1500,6),(3,'2020-02-13 08:00:00',1000,6),(4,'2020-02-13 09:00:00',800,6),(5,'2020-02-13 10:00:00',1500,6),(6,'2020-02-13 11:00:00',1200,6);
/*!40000 ALTER TABLE `id6weights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `tags` varchar(200) DEFAULT NULL,
  `weight` decimal(10,0) NOT NULL,
  `notes` text,
  `price` decimal(10,0) DEFAULT NULL,
  `imageLink` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Jaffa Cakes','#cake #buiscuit',14,'Orangey things sold by supermarkets',0,'https://www.pbs.org/food/wp-content/blogs.dir/2/files/2017/06/Jaffa-Cake-670x370.jpg'),(2,'Diet Coke',NULL,340,'Fizzy things',1,NULL),(3,'9v Motor',NULL,100,'motorised',NULL,NULL),(4,'Dead Sea Scroll',NULL,250,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ullamcorper, ex ut venenatis accumsan, lorem mi varius leo, non cursus massa arcu et est. Maecenas molestie malesuada neque vitae semper. Sed dictum leo ac rutrum volutpat. Aliquam at consequat ligula, sit amet semper elit. Maecenas ut felis at nisl tincidunt congue ut at urna. Donec efficitur lacus id risus tempus, eu ullamcorper ex sodales. Maecenas congue elit et sapien tincidunt ornare.',999,NULL),(5,'Springs',NULL,50,NULL,NULL,NULL),(6,'Miniature elephant figurines',NULL,300,'Maybe they\'ll prove useful at some point',3,'https://i.etsystatic.com/6774949/r/il/fabba4/1649231827/il_794xN.1649231827_ooif.jpg');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shelves`
--

DROP TABLE IF EXISTS `shelves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shelves` (
  `id` int NOT NULL,
  `items_id` int DEFAULT NULL,
  `shelfPosition` int DEFAULT NULL,
  `updateFrequency` int NOT NULL DEFAULT '0',
  `thresholdType` varchar(45) NOT NULL DEFAULT 'NUMBER',
  `thresholdAbsolute` decimal(10,0) NOT NULL DEFAULT '0',
  `thresholdNumber` int NOT NULL DEFAULT '0',
  `thresholdPercent` int NOT NULL DEFAULT '0',
  `100percentWeight` decimal(10,0) DEFAULT NULL,
  `autocalc100Percent` tinyint(1) NOT NULL DEFAULT '0',
  `warning` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_shelves_items1_idx` (`items_id`),
  CONSTRAINT `fk_shelves_items1` FOREIGN KEY (`items_id`) REFERENCES `items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shelves`
--

LOCK TABLES `shelves` WRITE;
/*!40000 ALTER TABLE `shelves` DISABLE KEYS */;
INSERT INTO `shelves` VALUES (1,3,6,5,'NUMBER',0,5,0,NULL,0,1),(2,4,5,0,'NUMBER',0,5,0,NULL,0,1),(3,5,4,0,'NUMBER',0,5,0,NULL,0,1),(4,6,3,0,'NUMBER',0,5,0,NULL,0,1),(5,1,2,0,'NUMBER',0,5,0,NULL,0,1),(6,2,1,0,'NUMBER',0,10,0,NULL,0,1);
/*!40000 ALTER TABLE `shelves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `userType` int NOT NULL DEFAULT '1',
  `loginStatus` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-23 12:15:46
