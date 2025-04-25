-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: stackgreek
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `trabalho` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (2,'Emanuel Kubick','Security','(41) 94221-4220','Wymanchester'),(3,'Joshua Grimes','Tactics','(41) 96317-8502','Mireillefort'),(5,'Ethel Daugherty PhD','Tactics','(41) 96769-7583','Stantonville'),(6,'Arthur Walsh','Solutions','(41) 90648-9985','Kassulkeworth'),(7,'Jacqueline Vandervort','Operations','(41) 95786-9002','Riceburgh'),(8,'Dr. Roland Zemlak','Factors','(41) 97361-0577','Medhursttown'),(9,'Tara McClure','Web','(41) 96271-5929','North Guillermo'),(10,'Ernestine Weissnat','Branding','(41) 97088-7755','Durham'),(11,'Tanya Weissnat','Operations','(41) 94321-3311','Port Royalbury'),(12,'Gretchen Hammes Sr.','Markets','(41) 94499-4496','Wittingburgh'),(13,'Dixie Leannon','Branding','(41) 93121-9296','Lake Minerva'),(14,'Leona Nienow','Configuration','(41) 99359-7181','Hickleburgh'),(15,'Dr. Iris Robel','Interactions','(41) 98595-5788','West Efrenhaven'),(16,'Julia Hirthe','Implementation','(41) 93085-1829','Friesenboro'),(17,'Dr. Roger Morissette','Applications','(41) 99582-6566','Bellebury'),(18,'Morris Huel','Group','(41) 93242-6936','New Sven'),(19,'Stuart Wehner','Web','(41) 95099-7438','Anaheim'),(20,'Heather Orn','Paradigm','(41) 92694-9842','New Nataliastead'),(21,'Howard Wolf','Operations','(41) 96221-1712','Myrtiston'),(22,'Ross Dibbert','Creative','(41) 99863-4594','Fort Alexa'),(23,'Lee Hagenes MD','Implementation','(41) 98698-8079','Bellshire'),(24,'Wilfred O\'Reilly','Research','(41) 96317-9116','Aliso Viejo'),(25,'Alfonso Nicolas','Creative','(41) 98838-1845','Casperberg'),(26,'Danny Wilderman','Research','(41) 92274-6626','Sylvanboro'),(27,'Ms. Marion Franey','Tactics','(41) 96279-2119','North Emiliano'),(28,'Kendra Cormier','Accountability','(41) 90797-7240','Lavinashire'),(29,'Lawrence Padberg','Directives','(41) 94744-3480','North Marysemouth'),(30,'Joyce Ferry','Directives','(41) 96233-4270','East Aliyamouth'),(31,'Pedro Pascal','Actor','(41) 99530-3241','Santiago');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-24 21:39:57
