-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema shelfdatav3
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema shelfdatav3
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `shelfdatav3` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `shelfdatav3` ;

-- -----------------------------------------------------
-- Table `shelfdatav3`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shelfdatav3`.`items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `tags` VARCHAR(200) NULL DEFAULT NULL,
  `weight` DECIMAL(10,0) NOT NULL,
  `notes` TEXT NULL DEFAULT NULL,
  `price` DECIMAL(10,0) NULL DEFAULT NULL,
  `imageLink` VARCHAR(150) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `shelfdatav3`.`shelves`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shelfdatav3`.`shelves` (
  `id` INT NOT NULL,
  `items_id` INT NULL DEFAULT NULL,
  `shelfPosition` INT NULL DEFAULT NULL,
  `updateFrequency` INT NOT NULL DEFAULT '0',
  `thresholdType` VARCHAR(45) NOT NULL DEFAULT 'NUMBER',
  `thresholdValue` DECIMAL(10,0) NOT NULL DEFAULT '0',
  `hundredPercent` DECIMAL(10,0) NULL DEFAULT NULL,
  `autocalc100Percent` TINYINT(1) NOT NULL DEFAULT '0',
  `warning` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_shelves_items1_idx` (`items_id` ASC) VISIBLE,
  CONSTRAINT `fk_shelves_items1`
    FOREIGN KEY (`items_id`)
    REFERENCES `shelfdatav3`.`items` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `shelfdatav3`.`id1weights`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shelfdatav3`.`id1weights` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dateTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `weight` DECIMAL(10,0) NOT NULL,
  `shelves_id` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  INDEX `fk_id1weights_shelves1_idx` (`shelves_id` ASC) VISIBLE,
  CONSTRAINT `fk_id1weights_shelves1`
    FOREIGN KEY (`shelves_id`)
    REFERENCES `shelfdatav3`.`shelves` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `shelfdatav3`.`id2weights`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shelfdatav3`.`id2weights` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dateTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `weight` DECIMAL(10,0) NOT NULL,
  `shelves_id` INT NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`),
  INDEX `fk_id2weights_shelves1_idx` (`shelves_id` ASC) VISIBLE,
  CONSTRAINT `fk_id2weights_shelves1`
    FOREIGN KEY (`shelves_id`)
    REFERENCES `shelfdatav3`.`shelves` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `shelfdatav3`.`id3weights`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shelfdatav3`.`id3weights` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dateTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `weight` DECIMAL(10,0) NOT NULL,
  `shelves_id` INT NOT NULL DEFAULT '3',
  PRIMARY KEY (`id`),
  INDEX `fk_id3weights_shelves1_idx` (`shelves_id` ASC) VISIBLE,
  CONSTRAINT `fk_id3weights_shelves1`
    FOREIGN KEY (`shelves_id`)
    REFERENCES `shelfdatav3`.`shelves` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `shelfdatav3`.`id4weights`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shelfdatav3`.`id4weights` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dateTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `weight` DECIMAL(10,0) NOT NULL,
  `shelves_id` INT NOT NULL DEFAULT '4',
  PRIMARY KEY (`id`),
  INDEX `fk_id4weights_shelves1_idx` (`shelves_id` ASC) VISIBLE,
  CONSTRAINT `fk_id4weights_shelves1`
    FOREIGN KEY (`shelves_id`)
    REFERENCES `shelfdatav3`.`shelves` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `shelfdatav3`.`id5weights`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shelfdatav3`.`id5weights` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dateTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `weight` DECIMAL(10,0) NOT NULL,
  `shelves_id` INT NOT NULL DEFAULT '5',
  PRIMARY KEY (`id`),
  INDEX `fk_id5weights_shelves1_idx` (`shelves_id` ASC) VISIBLE,
  CONSTRAINT `fk_id5weights_shelves1`
    FOREIGN KEY (`shelves_id`)
    REFERENCES `shelfdatav3`.`shelves` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `shelfdatav3`.`id6weights`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shelfdatav3`.`id6weights` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dateTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `weight` DECIMAL(10,0) NOT NULL,
  `shelves_id` INT NOT NULL DEFAULT '6',
  PRIMARY KEY (`id`),
  INDEX `fk_id6weights_shelves1_idx` (`shelves_id` ASC) VISIBLE,
  CONSTRAINT `fk_id6weights_shelves1`
    FOREIGN KEY (`shelves_id`)
    REFERENCES `shelfdatav3`.`shelves` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `shelfdatav3`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shelfdatav3`.`users` (
  `id` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `firstName` VARCHAR(45) NULL DEFAULT NULL,
  `lastName` VARCHAR(45) NULL DEFAULT NULL,
  `userType` INT NOT NULL DEFAULT '1',
  `loginStatus` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
