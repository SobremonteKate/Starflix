-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2024 at 08:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `starflix`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `accountID` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`accountID`, `fname`, `lname`, `email`, `password`) VALUES
(1, 'AdminLname', 'AdminFname', 'admin@gmail.com', '$2y$10$.toSlEkgWh1VPa1lwcs6ieThFniv.ZGmN21xmeiSD8qbzdkFQFODa');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movieID` int(11) NOT NULL,
  `movieName` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `ageRating` varchar(255) NOT NULL,
  `releaseDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movieID`, `movieName`, `duration`, `genre`, `ageRating`, `releaseDate`) VALUES
(1, 'The Matrix', '136 min', 'Sci-fi', '18+', '1999-03-31'),
(2, 'Inception', '148 min', 'Sci-fi', '16+', '2010-07-16'),
(3, 'The Dark Knight', '152 min', 'Action', '18+', '2008-07-18'),
(4, 'The Lord of the Rings: The Fellowship of the Ring', '178 min', 'Fantasy', 'All Ages', '2001-12-19'),
(5, 'Forrest Gump', '142 min', 'Drama', 'All Ages', '1994-07-06'),
(6, 'Pulp Fiction', '154 min', 'Drama', '18+', '1994-10-14'),
(7, 'Titanic', '195 min', 'Romance', 'All Ages', '1997-12-19'),
(8, 'Avengers: Endgame', '181 min', 'Action', 'All Ages', '2019-04-26'),
(9, 'Jurassic Park', '127 min', 'Sci-fi', 'All Ages', '1993-06-11'),
(10, 'Gladiator', '155 min', 'Action', '18+', '2000-05-05'),
(11, 'Star Wars: Episode IV - A New Hope', '121 min', 'Sci-fi', 'All Ages', '1977-05-25'),
(12, 'The Godfather', '175 min', 'Drama', '18+', '1972-03-24'),
(13, 'The Shawshank Redemption', '142 min', 'Drama', 'All Ages', '1994-09-22'),
(14, 'The Lion King', '88 min', 'Animation', 'All Ages', '1994-06-15'),
(15, 'The Avengers', '143 min', 'Action', 'All Ages', '2012-05-04'),
(16, 'Fight Club', '139 min', 'Drama', '18+', '1999-10-15'),
(17, 'The Truman Show', '103 min', 'Drama', 'All Ages', '1998-06-05'),
(18, 'Interstellar', '169 min', 'Sci-fi', '16+', '2014-11-07'),
(19, 'The Wolf of Wall Street', '180 min', 'Comedy', '18+', '2013-12-25'),
(20, 'The Prestige', '130 min', 'Drama', '16+', '2006-10-20'),
(21, 'Guardians of the Galaxy', '121 min', 'Action', 'All Ages', '2014-08-01'),
(22, 'The Grand Budapest Hotel', '99 min', 'Comedy', '16+', '2014-03-28'),
(23, 'Deadpool', '108 min', 'Action', '18+', '2016-02-12'),
(24, 'Shutter Island', '138 min', 'Thriller', '18+', '2010-02-19'),
(25, 'The Pursuit of Happyness', '117 min', 'Drama', 'All Ages', '2006-12-15'),
(26, 'The Revenant', '156 min', 'Action', '18+', '2015-12-25'),
(27, 'Inglourious Basterds', '153 min', 'Action', '18+', '2009-08-21'),
(28, 'The Silence of the Lambs', '118 min', 'Thriller', '18+', '1991-02-14'),
(29, 'La La Land', '128 min', 'Romance', 'All Ages', '2016-12-09'),
(30, 'The Departed', '151 min', 'Drama', '18+', '2006-10-06'),
(31, 'Mad Max: Fury Road', '120 min', 'Action', '18+', '2015-05-15'),
(32, 'The Green Mile', '189 min', 'Drama', 'All Ages', '1999-12-10'),
(33, 'The Godfather: Part II', '202 min', 'Drama', '18+', '1974-12-20'),
(34, 'Harry Potter and the Sorcerer\'s Stone', '152 min', 'Fantasy', 'All Ages', '2001-11-10'),
(35, 'Jaws', '124 min', 'Thriller', 'All Ages', '1975-06-20'),
(36, 'The Social Network', '120 min', 'Drama', '16+', '2010-10-01'),
(37, 'The Hobbit: An Unexpected Journey', '169 min', 'Fantasy', 'All Ages', '2012-12-14'),
(38, 'The Big Lebowski', '117 min', 'Comedy', '16+', '1998-03-06'),
(39, 'The Shining', '146 min', 'Horror', '18+', '1980-05-23'),
(40, 'The Sixth Sense', '107 min', 'Thriller', '16+', '1999-08-06'),
(41, 'The Matrix Reloaded', '138 min', 'Sci-fi', '18+', '2003-05-15'),
(42, 'The Dark Knight Rises', '164 min', 'Action', '18+', '2012-07-20'),
(43, 'Toy Story 3', '103 min', 'Animation', 'All Ages', '2010-06-18'),
(44, 'The Chronicles of Narnia: The Lion, the Witch, and the Wardrobe', '143 min', 'Fantasy', 'All Ages', '2005-12-09'),
(45, 'Iron Man', '126 min', 'Action', 'All Ages', '2008-05-02'),
(46, 'The Hobbit: The Desolation of Smaug', '161 min', 'Fantasy', 'All Ages', '2013-12-13'),
(47, 'Casino Royale', '144 min', 'Action', '18+', '2006-11-14'),
(48, '12 Angry Men', '96 min', 'Drama', 'All Ages', '1957-04-10'),
(49, 'Back to the Future', '116 min', 'Sci-fi', 'All Ages', '1985-07-03'),
(50, 'The Grandmaster', '108 min', 'Action', '18+', '2013-01-08'),
(51, 'Django Unchained', '165 min', 'Drama', '18+', '2012-12-25'),
(52, 'The Great Gatsby', '143 min', 'Drama', '16+', '2013-05-10'),
(53, 'The Imitation Game', '113 min', 'Drama', 'All Ages', '2014-11-28'),
(54, 'The Theory of Everything', '123 min', 'Drama', 'All Ages', '2014-11-07'),
(55, 'A Beautiful Mind', '135 min', 'Drama', 'All Ages', '2001-12-21'),
(56, 'The Secret Life of Walter Mitty', '114 min', 'Adventure', 'All Ages', '2013-12-25'),
(57, 'Zootopia', '108 min', 'Animation', 'All Ages', '2016-03-17'),
(58, 'Deadpool 2', '119 min', 'Action', '18+', '2018-05-18'),
(59, 'The Incredibles', '115 min', 'Animation', 'All Ages', '2004-11-05');

-- --------------------------------------------------------

--
-- Table structure for table `series`
--

CREATE TABLE `series` (
  `seriesID` int(11) NOT NULL,
  `seriesName` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `episodeRuntime` varchar(255) NOT NULL,
  `ageRating` varchar(255) NOT NULL,
  `releaseDate` date NOT NULL,
  `finalreleaseDate` date NOT NULL,
  `status` enum('Ongoing','Completed') NOT NULL DEFAULT 'Ongoing'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `series`
--

INSERT INTO `series` (`seriesID`, `seriesName`, `genre`, `episodeRuntime`, `ageRating`, `releaseDate`, `finalreleaseDate`, `status`) VALUES
(1, 'The Expanse', 'Sci-Fi', '60 min', '18+', '2015-11-23', '2021-01-14', 'Completed'),
(2, 'Chernobyl', 'Drama', '60 min', '18+', '2019-05-06', '2019-06-03', 'Completed'),
(3, 'Narcos: Mexico', 'Crime', '60 min', '18+', '2018-11-16', '2021-02-05', 'Completed'),
(4, 'The Good Place', 'Comedy', '22 min', 'All Ages', '2016-09-19', '2020-01-30', 'Completed'),
(5, 'Mindhunter', 'Crime', '50 min', '18+', '2017-10-13', '2019-08-16', 'Completed'),
(6, 'Fargo', 'Crime', '60 min', '18+', '2014-04-15', '2020-09-27', 'Completed'),
(7, 'The Haunting of Hill House', 'Horror', '60 min', '18+', '2018-10-12', '2018-10-12', 'Completed'),
(8, 'Dark', 'Sci-Fi', '50 min', '16+', '2017-12-01', '2020-06-27', 'Completed'),
(9, 'The Marvelous Mrs. Maisel', 'Comedy', '60 min', 'All Ages', '2017-03-17', '2024-03-01', 'Ongoing'),
(10, 'Black Sails', 'Adventure', '60 min', '18+', '2014-01-25', '2017-04-02', 'Completed'),
(11, 'The Night Manager', 'Thriller', '60 min', '18+', '2016-02-21', '2016-04-24', 'Completed'),
(12, 'True Blood', 'Fantasy', '60 min', '18+', '2008-09-07', '2014-08-24', 'Completed'),
(13, 'House of Cards', 'Drama', '50 min', '18+', '2013-02-01', '2018-11-02', 'Completed'),
(14, 'The 100', 'Sci-Fi', '42 min', '16+', '2014-03-19', '2020-09-30', 'Completed'),
(15, 'GLOW', 'Comedy', '30 min', '16+', '2017-06-23', '2019-08-09', 'Completed'),
(16, 'The OA', 'Mystery', '60 min', '16+', '2016-12-16', '2019-03-22', 'Completed'),
(17, 'Band of Brothers', 'Drama', '60 min', '18+', '2001-09-09', '2001-11-04', 'Completed'),
(18, 'Peaky Blinders', 'Crime', '60 min', '18+', '2013-09-12', '2022-06-10', 'Completed'),
(19, 'The End of the F***ing World', 'Comedy', '20 min', '16+', '2017-10-24', '2019-11-05', 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `tvshow`
--

CREATE TABLE `tvshow` (
  `tvID` int(11) NOT NULL,
  `showName` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `ageRating` varchar(255) NOT NULL,
  `episodeRuntime` varchar(255) NOT NULL,
  `releaseDate` date NOT NULL,
  `finalreleaseDate` date NOT NULL,
  `status` enum('Ongoing','Completed') NOT NULL DEFAULT 'Ongoing'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tvshow`
--

INSERT INTO `tvshow` (`tvID`, `showName`, `genre`, `ageRating`, `episodeRuntime`, `releaseDate`, `finalreleaseDate`, `status`) VALUES
(1, 'Stranger Things', 'Sci-fi', '16+', '50 min', '2016-07-15', '2024-01-01', 'Ongoing'),
(2, 'The Crown', 'Drama', '18+', '60 min', '2016-11-04', '2024-02-01', 'Completed'),
(3, 'Breaking Bad', 'Crime', '18+', '47 min', '2008-01-20', '2013-09-29', 'Completed'),
(4, 'The Office', 'Comedy', '18+', '22 min', '2005-03-24', '2013-05-16', 'Completed'),
(5, 'Game of Thrones', 'Fantasy', '18+', '60 min', '2011-04-17', '2019-05-19', 'Completed'),
(6, 'The Mandalorian', 'Action', '16+', '40 min', '2019-11-12', '2024-03-01', 'Ongoing'),
(7, 'Friends', 'Comedy', '16+', '22 min', '1994-09-22', '2004-05-06', 'Completed'),
(8, 'Money Heist', 'Crime', '16+', '45 min', '2017-05-02', '2021-12-03', 'Completed'),
(9, 'Narcos', 'Crime', '18+', '60 min', '2015-08-28', '2017-09-01', 'Completed'),
(10, 'Sherlock', 'Mystery', 'All Ages', '90 min', '2010-07-25', '2017-01-15', 'Completed'),
(11, 'The Simpsons', 'Animation', '18+', '22 min', '1989-12-17', '0000-00-00', 'Ongoing'),
(12, 'Black Mirror', 'Sci-Fi', '18+', '60 min', '2011-12-04', '2023-06-05', 'Completed'),
(13, 'Westworld', 'Sci-Fi', '18+', '60 min', '2016-10-02', '2024-04-01', 'Ongoing'),
(14, 'The Witcher', 'Fantasy', '16+', '60 min', '2019-12-20', '2024-02-01', 'Ongoing'),
(15, 'Peaky Blinders', 'Crime', '16+', '60 min', '2013-09-12', '2022-06-10', 'Completed'),
(16, 'The Walking Dead', 'Horror', '16+', '60 min', '2010-10-31', '2024-03-01', 'Ongoing'),
(17, 'Better Call Saul', 'Drama', '16+', '50 min', '2015-02-08', '2022-08-15', 'Completed'),
(18, 'The Boys', 'Action', '16+', '60 min', '2019-07-26', '2024-03-01', 'Ongoing'),
(19, 'Vikings', 'Action', '16+', '60 min', '2013-03-03', '2020-12-30', 'Completed'),
(20, 'True Detective', 'Crime', '16+', '60 min', '2014-01-12', '2019-07-01', 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `contactNum` varchar(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `subs` enum('Basic','Standard','Premium') NOT NULL DEFAULT 'Basic',
  `payment` enum('Credit Card','Debit Card','Gcash') NOT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `userName`, `contactNum`, `email`, `subs`, `payment`, `status`) VALUES
(1, 'Kate', 'Sobremonte', 'kvsobremonte', '09691400733', 'test@gmail.com', 'Basic', 'Credit Card', 'Active'),
(2, 'Jane', 'Smith', 'janesmith', '09281234567', 'janesmith@example.com', 'Premium', 'Gcash', 'Inactive'),
(3, 'Jellina', 'muril', 'jelimuri', '09123456789', 'jm@gmail.com', 'Premium', 'Gcash', 'Active'),
(4, 'jelili', 'murilli', 'jelimurili', '09123456789', 'probablewoman@gmail.com', 'Basic', 'Gcash', 'Inactive'),
(5, 'David', 'Wilson', 'davidw', '09511234567', 'davidw@example.com', 'Basic', 'Debit Card', 'Inactive'),
(6, 'Sarah', 'Lee', 'sarahlee', '09621234567', 'sarahlee@example.com', 'Premium', 'Credit Card', 'Active'),
(7, 'Chris', 'Taylor', 'christaylor', '09731234567', 'christaylor@example.com', 'Basic', 'Credit Card', 'Active'),
(8, 'Emma', 'Anderson', 'emmaanderson', '09841234567', 'emmaanderson@example.com', 'Premium', 'Debit Card', 'Active'),
(9, 'Tom', 'Thomas', 'tomthomas', '09951234567', 'tomt@example.com', 'Basic', 'Gcash', 'Active'),
(10, 'Mia', 'Jackson', 'miajackson', '09161234567', 'miaj@example.com', 'Premium', 'Credit Card', 'Inactive'),
(11, 'Ethan', 'Martinez', 'ethanmartinez', '09271234567', 'ethanm@example.com', 'Basic', 'Debit Card', 'Active'),
(12, 'Olivia', 'Hernandez', 'oliviahernandez', '09381234567', 'oliviah@example.com', 'Premium', 'Gcash', 'Active'),
(13, 'Benjamin', 'White', 'benjaminwhite', '09491234567', 'benjaminw@example.com', 'Basic', 'Credit Card', 'Active'),
(14, 'Charlotte', 'King', 'charlotteking', '09501234567', 'charlottek@example.com', 'Premium', 'Debit Card', 'Active'),
(15, 'William', 'Scott', 'williamscott', '09611234567', 'williams@example.com', 'Basic', 'Gcash', 'Inactive'),
(16, 'Amelia', 'Green', 'ameliagreen', '09721234567', 'ameliag@example.com', 'Premium', 'Credit Card', 'Active'),
(17, 'Alexander', 'Adams', 'alexanderadams', '09831234567', 'alexandra@example.com', 'Basic', 'Debit Card', 'Active'),
(18, 'Sofia', 'Baker', 'sofiabaker', '09941234567', 'sofiab@example.com', 'Premium', 'Gcash', 'Inactive'),
(19, 'Lucas', 'Gonzalez', 'lucasgonzalez', '09172345678', 'lucasg@example.com', 'Basic', 'Credit Card', 'Active'),
(20, 'Ava', 'Carter', 'avacarter', '09283456789', 'avac@example.com', 'Premium', 'Debit Card', 'Active'),
(21, 'John', 'Doe', 'johndoe21', '09171234567', 'johndoe21@example.com', 'Basic', 'Credit Card', 'Active'),
(22, 'Jane', 'Smith', 'janesmith22', '09182345678', 'janesmith22@example.com', 'Standard', 'Debit Card', 'Active'),
(23, 'Robert', 'Brown', 'robertbrown23', '09213456789', 'robertbrown23@example.com', 'Premium', 'Gcash', 'Inactive'),
(24, 'Emily', 'Davis', 'emilydavis24', '09224567890', 'emilydavis24@example.com', 'Basic', 'Credit Card', 'Active'),
(25, 'Michael', 'Miller', 'michaelmiller25', '09335678901', 'michaelmiller25@example.com', 'Standard', 'Debit Card', 'Inactive'),
(26, 'Sarah', 'Wilson', 'sarahwilson26', '09346789012', 'sarahwilson26@example.com', 'Premium', 'Gcash', 'Active'),
(27, 'David', 'Taylor', 'davidtaylor27', '09457890123', 'davidtaylor27@example.com', 'Basic', 'Credit Card', 'Inactive'),
(28, 'Linda', 'Anderson', 'lindaanderson28', '09468901234', 'lindaanderson28@example.com', 'Standard', 'Debit Card', 'Active'),
(29, 'James', 'Thomas', 'jamesthomas29', '09579012345', 'jamesthomas29@example.com', 'Premium', 'Gcash', 'Active'),
(30, 'Patricia', 'Jackson', 'patriciajackson30', '09580123456', 'patriciajackson30@example.com', 'Basic', 'Credit Card', 'Inactive'),
(31, 'Christopher', 'White', 'christopherwhite31', '09691234567', 'christopherwhite31@example.com', 'Standard', 'Debit Card', 'Active'),
(32, 'Susan', 'Harris', 'susanharris32', '09702345678', 'susanharris32@example.com', 'Premium', 'Gcash', 'Active'),
(33, 'Daniel', 'Martin', 'danielmartin33', '09713456789', 'danielmartin33@example.com', 'Basic', 'Credit Card', 'Inactive'),
(34, 'Jessica', 'Thompson', 'jessicathompson34', '09824567890', 'jessicathompson34@example.com', 'Standard', 'Debit Card', 'Active'),
(35, 'William', 'Garcia', 'williamgarcia35', '09835678901', 'williamgarcia35@example.com', 'Premium', 'Gcash', 'Active'),
(36, 'Karen', 'Martinez', 'karenmartinez36', '09946789012', 'karenmartinez36@example.com', 'Basic', 'Credit Card', 'Inactive'),
(37, 'Steven', 'Roberts', 'stevenroberts37', '09957890123', 'stevenroberts37@example.com', 'Standard', 'Debit Card', 'Active'),
(38, 'Nancy', 'Walker', 'nancywalker38', '09123456789', 'nancywalker38@example.com', 'Premium', 'Gcash', 'Active'),
(39, 'Brian', 'Hall', 'brianhall39', '09134567890', 'brianhall39@example.com', 'Basic', 'Credit Card', 'Inactive'),
(40, 'Betty', 'Allen', 'bettyallen40', '09245678901', 'bettyallen40@example.com', 'Standard', 'Debit Card', 'Active'),
(41, 'George', 'Young', 'georgeyoung41', '09256789012', 'georgeyoung41@example.com', 'Premium', 'Gcash', 'Active'),
(42, 'Helen', 'King', 'helenking42', '09367890123', 'helenking42@example.com', 'Basic', 'Credit Card', 'Inactive'),
(43, 'Charles', 'Scott', 'charlesscott43', '09378901234', 'charlesscott43@example.com', 'Standard', 'Debit Card', 'Active'),
(44, 'Margaret', 'Green', 'margaretgreen44', '09489012345', 'margaretgreen44@example.com', 'Premium', 'Gcash', 'Active'),
(45, 'Edward', 'Adams', 'edwardadams45', '09490123456', 'edwardadams45@example.com', 'Basic', 'Credit Card', 'Inactive'),
(46, 'Barbara', 'Baker', 'barbarabaker46', '09501234567', 'barbarabaker46@example.com', 'Standard', 'Debit Card', 'Active'),
(47, 'Joshua', 'Gonzalez', 'joshuagonzalez47', '09512345678', 'joshuagonzalez47@example.com', 'Premium', 'Gcash', 'Active'),
(48, 'Megan', 'Nelson', 'megannelson48', '09623456789', 'megannelson48@example.com', 'Basic', 'Credit Card', 'Inactive'),
(49, 'Paul', 'Carter', 'paulcarter49', '09634567890', 'paulcarter49@example.com', 'Standard', 'Debit Card', 'Active'),
(50, 'Sandra', 'Mitchell', 'sandramitchell50', '09745678901', 'sandramitchell50@example.com', 'Premium', 'Gcash', 'Active'),
(51, 'Tom', 'Perez', 'tomperez51', '09756789012', 'tomperez51@example.com', 'Basic', 'Credit Card', 'Inactive'),
(52, 'Rachel', 'Roberts', 'rachelroberts52', '09867890123', 'rachelroberts52@example.com', 'Standard', 'Debit Card', 'Active'),
(53, 'Gary', 'Carter', 'garycarter53', '09978901234', 'garycarter53@example.com', 'Premium', 'Gcash', 'Active'),
(54, 'Amber', 'Bennett', 'amberbennett54', '09189012345', 'amberbennett54@example.com', 'Basic', 'Credit Card', 'Active'),
(55, 'Philip', 'Clark', 'philipclark55', '09290123456', 'philipclark55@example.com', 'Standard', 'Debit Card', 'Inactive'),
(56, 'Samantha', 'Perez', 'samanthaperez56', '09301234567', 'samanthaperez56@example.com', 'Premium', 'Gcash', 'Active'),
(57, 'Benjamin', 'Morris', 'benjaminmorris57', '09412345678', 'benjaminmorris57@example.com', 'Basic', 'Credit Card', 'Inactive'),
(58, 'Victoria', 'Rodriguez', 'victoriarodriguez58', '09523456789', 'victoriarodriguez58@example.com', 'Standard', 'Debit Card', 'Active'),
(59, 'Natalie', 'Gonzalez', 'nataliegonzalez59', '09634567890', 'nataliegonzalez59@example.com', 'Premium', 'Gcash', 'Active'),
(60, 'Andrew', 'Wilson', 'andrewwilson60', '09745678901', 'andrewwilson60@example.com', 'Basic', 'Credit Card', 'Inactive'),
(61, 'Lauren', 'Anderson', 'laurenanderson61', '09856789012', 'laurenanderson61@example.com', 'Standard', 'Debit Card', 'Active'),
(62, 'Ethan', 'Young', 'ethanyoung62', '09967890123', 'ethanyoung62@example.com', 'Premium', 'Gcash', 'Active'),
(63, 'Sophia', 'Taylor', 'sophiataylor63', '09178901234', 'sophiataylor63@example.com', 'Basic', 'Credit Card', 'Inactive'),
(64, 'Matthew', 'Martinez', 'matthewmartinez64', '09289012345', 'matthewmartinez64@example.com', 'Standard', 'Debit Card', 'Active'),
(65, 'Ava', 'Roberts', 'avaroberts65', '09390123456', 'avaroberts65@example.com', 'Premium', 'Gcash', 'Active'),
(66, 'David', 'Johnson', 'davidjohnson66', '09401234567', 'davidjohnson66@example.com', 'Basic', 'Credit Card', 'Inactive'),
(67, 'Isabella', 'Harris', 'isabellaharris67', '09512345678', 'isabellaharris67@example.com', 'Standard', 'Debit Card', 'Active'),
(68, 'Samuel', 'Davis', 'samueldavis68', '09623456789', 'samueldavis68@example.com', 'Premium', 'Gcash', 'Active'),
(69, 'Zoe', 'Garcia', 'zoegarcia69', '09734567890', 'zoegarcia69@example.com', 'Basic', 'Credit Card', 'Inactive'),
(70, 'Joseph', 'Lee', 'josephlee70', '09845678901', 'josephlee70@example.com', 'Standard', 'Debit Card', 'Active'),
(71, 'Sophie', 'Walker', 'sophiewalker71', '09956789012', 'sophiewalker71@example.com', 'Premium', 'Gcash', 'Active'),
(72, 'Jackson', 'Allen', 'jacksonallen72', '09167890123', 'jacksonallen72@example.com', 'Basic', 'Credit Card', 'Inactive'),
(73, 'Chloe', 'King', 'chloeking73', '09278901234', 'chloeking73@example.com', 'Standard', 'Debit Card', 'Active'),
(74, 'Mason', 'White', 'masonwhite74', '09389012345', 'masonwhite74@example.com', 'Premium', 'Gcash', 'Active'),
(75, 'Charlotte', 'Adams', 'charlotteadams75', '09490123456', 'charlotteadams75@example.com', 'Basic', 'Credit Card', 'Inactive'),
(76, 'Henry', 'Nelson', 'henrynelson76', '09501234567', 'henrynelson76@example.com', 'Standard', 'Debit Card', 'Active'),
(77, 'Ella', 'Mitchell', 'ellamitchell77', '09612345678', 'ellamitchell77@example.com', 'Premium', 'Gcash', 'Active'),
(78, 'Jack', 'Roberts', 'jackroberts78', '09723456789', 'jackroberts78@example.com', 'Basic', 'Credit Card', 'Inactive'),
(79, 'Lily', 'Moore', 'lilymoore79', '09834567890', 'lilymoore79@example.com', 'Standard', 'Debit Card', 'Active'),
(80, 'Lucas', 'Martinez', 'lucasmartinez80', '09945678901', 'lucasmartinez80@example.com', 'Premium', 'Gcash', 'Active'),
(81, 'Maya', 'Gonzalez', 'mayagonzalez81', '09156789012', 'mayagonzalez81@example.com', 'Basic', 'Credit Card', 'Inactive'),
(82, 'Alexander', 'Brown', 'alexanderbrown82', '09267890123', 'alexanderbrown82@example.com', 'Standard', 'Debit Card', 'Active'),
(83, 'Lillian', 'Williams', 'lillianwilliams83', '09378901234', 'lillianwilliams83@example.com', 'Premium', 'Gcash', 'Active'),
(84, 'Sebastian', 'Miller', 'sebastianmiller84', '09489012345', 'sebastianmiller84@example.com', 'Basic', 'Credit Card', 'Inactive'),
(85, 'Ella', 'Davis', 'elladavis85', '09590123456', 'elladavis85@example.com', 'Standard', 'Debit Card', 'Active'),
(86, 'Aidan', 'Taylor', 'aidantaylor86', '09601234567', 'aidantaylor86@example.com', 'Premium', 'Gcash', 'Active'),
(87, 'Penelope', 'Rodriguez', 'peneloperodriguez87', '09712345678', 'peneloperodriguez87@example.com', 'Basic', 'Credit Card', 'Inactive'),
(88, 'Owen', 'Martinez', 'owenmartinez88', '09823456789', 'owenmartinez88@example.com', 'Standard', 'Debit Card', 'Active'),
(89, 'Aubrey', 'Scott', 'aubrayscott89', '09934567890', 'aubrayscott89@example.com', 'Premium', 'Gcash', 'Active'),
(90, 'Levi', 'Young', 'leviyoung90', '09145678901', 'leviyoung90@example.com', 'Basic', 'Credit Card', 'Inactive'),
(91, 'Mila', 'Hernandez', 'milahernandez91', '09256789012', 'milahernandez91@example.com', 'Standard', 'Debit Card', 'Active'),
(92, 'Henry', 'Brown', 'henrybrown92', '09367890123', 'henrybrown92@example.com', 'Premium', 'Gcash', 'Active'),
(93, 'Grace', 'Clark', 'graceclark93', '09478901234', 'graceclark93@example.com', 'Basic', 'Credit Card', 'Inactive'),
(94, 'Max', 'Martinez', 'maxmartinez94', '09589012345', 'maxmartinez94@example.com', 'Standard', 'Debit Card', 'Active'),
(95, 'Avery', 'Roberts', 'averyroberts95', '09690123456', 'averyroberts95@example.com', 'Premium', 'Gcash', 'Active'),
(96, 'Ella', 'Davis', 'elladavis96', '09701234567', 'elladavis96@example.com', 'Basic', 'Credit Card', 'Inactive'),
(97, 'William', 'Lopez', 'williamlopez97', '09812345678', 'williamlopez97@example.com', 'Standard', 'Debit Card', 'Active'),
(98, 'Lucy', 'Wilson', 'lucywilson98', '09923456789', 'lucywilson98@example.com', 'Premium', 'Gcash', 'Active'),
(99, 'Leo', 'Thomas', 'leothomas99', '09134567890', 'leothomas99@example.com', 'Basic', 'Credit Card', 'Inactive'),
(100, 'Charlotte', 'Martinez', 'charlottemartinez100', '09245678901', 'charlottemartinez100@example.com', 'Standard', 'Debit Card', 'Active'),
(101, 'Ethan', 'Smith', 'ethansmith101', '09123456789', 'ethansmith101@example.com', 'Basic', 'Credit Card', 'Active'),
(102, 'Chloe', 'Johnson', 'chloejohnson102', '09234567890', 'chloejohnson102@example.com', 'Standard', 'Debit Card', 'Inactive'),
(103, 'James', 'Williams', 'jameswilliams103', '09345678901', 'jameswilliams103@example.com', 'Premium', 'Gcash', 'Active'),
(104, 'Olivia', 'Brown', 'oliviabrown104', '09456789012', 'oliviabrown104@example.com', 'Basic', 'Credit Card', 'Inactive'),
(105, 'Liam', 'Jones', 'liamjones105', '09567890123', 'liamjones105@example.com', 'Standard', 'Debit Card', 'Active'),
(106, 'Zoe', 'Taylor', 'zoetaylor106', '09678901234', 'zoetaylor106@example.com', 'Premium', 'Gcash', 'Active'),
(107, 'Amelia', 'Davis', 'ameliadavis107', '09789012345', 'ameliadavis107@example.com', 'Basic', 'Credit Card', 'Inactive'),
(108, 'Jack', 'Moore', 'jackmoore108', '09890123456', 'jackmoore108@example.com', 'Standard', 'Debit Card', 'Active'),
(109, 'Mason', 'Clark', 'masonclark109', '09901234567', 'masonclark109@example.com', 'Premium', 'Gcash', 'Active'),
(110, 'Lucas', 'Lewis', 'lucaslewis110', '09112345678', 'lucaslewis110@example.com', 'Basic', 'Credit Card', 'Inactive');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`accountID`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movieID`);

--
-- Indexes for table `series`
--
ALTER TABLE `series`
  ADD PRIMARY KEY (`seriesID`);

--
-- Indexes for table `tvshow`
--
ALTER TABLE `tvshow`
  ADD PRIMARY KEY (`tvID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `accountID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movieID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `series`
--
ALTER TABLE `series`
  MODIFY `seriesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tvshow`
--
ALTER TABLE `tvshow`
  MODIFY `tvID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
