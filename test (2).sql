SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `test`;
USE `test`;

CREATE TABLE `associations` (
  `name` varchar(50) NOT NULL,
  `branch` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `incharge` varchar(50) NOT NULL
) ;

CREATE TABLE `clubs` (
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `incharge` varchar(35) NOT NULL
) ;

CREATE TABLE `event_association` (
  `associationname` varchar(15) NOT NULL,
  `eventname` varchar(50) NOT NULL,
  `date1` date NOT NULL,
  `from1` varchar(6) NOT NULL,
  `to1` varchar(6) NOT NULL,
  `venue` varchar(50) NOT NULL,
  `guest` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `imagepath` varchar(80) NOT NULL
) ;

CREATE TABLE `event_club` (
  `clubname` varchar(50) NOT NULL,
  `eventname` varchar(50) NOT NULL,
  `date1` date NOT NULL,
  `from1` varchar(10) NOT NULL,
  `to1` varchar(10) NOT NULL,
  `venue` varchar(50) NOT NULL,
  `guest` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `imagepath` varchar(100) NOT NULL
) ;

CREATE TABLE `student_association` (
  `association` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `regno` int(7) NOT NULL,
  `rollno` int(6) NOT NULL,
  `position` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact` bigint(10) NOT NULL,
  `year` varchar(2) NOT NULL
) ;

CREATE TABLE `student_club` (
  `clubname` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `regno` int(7) NOT NULL,
  `rollno` int(6) NOT NULL,
  `branch` varchar(30) NOT NULL,
  `position` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact` bigint(10) NOT NULL,
  `year` varchar(2) NOT NULL
) ;

CREATE TABLE `student_reg_association` (
  `associationname` varchar(50) NOT NULL,
  `eventname` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `regno` int(7) NOT NULL,
  `rollno` int(6) NOT NULL,
  `course` varchar(6) NOT NULL,
  `year` varchar(2) NOT NULL,
  `branch` varchar(7) NOT NULL,
  `contactno` bigint(10) NOT NULL
) ;

CREATE TABLE `student_reg_club` (
  `clubname` varchar(50) NOT NULL,
  `eventname` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `regno` int(7) NOT NULL,
  `rollno` int(6) NOT NULL,
  `course` varchar(7) NOT NULL,
  `year` varchar(2) NOT NULL,
  `branch` varchar(7) NOT NULL,
  `contactno` bigint(10) NOT NULL
) ;


ALTER TABLE `associations`
  ADD PRIMARY KEY (`name`);

ALTER TABLE `clubs`
  ADD PRIMARY KEY (`name`);

ALTER TABLE `event_association`
  ADD PRIMARY KEY (`eventname`,`date1`);

ALTER TABLE `event_club`
  ADD PRIMARY KEY (`eventname`,`date1`);

ALTER TABLE `student_association`
  ADD PRIMARY KEY (`regno`);

ALTER TABLE `student_club`
  ADD PRIMARY KEY (`regno`,`rollno`);

ALTER TABLE `student_reg_association`
  ADD PRIMARY KEY (`associationname`,`eventname`,`date`,`regno`);

ALTER TABLE `student_reg_club`
  ADD PRIMARY KEY (`clubname`,`eventname`,`date`,`regno`);


