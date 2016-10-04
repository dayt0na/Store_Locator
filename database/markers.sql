-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 04, 2016 at 04:11 PM
-- Server version: 5.7.11
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `data_marker`
--

-- --------------------------------------------------------

--
-- Table structure for table `markers`
--

CREATE TABLE `markers` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `address` varchar(80) NOT NULL,
  `lat` float(10,6) NOT NULL,
  `lng` float(10,6) NOT NULL,
  `category` varchar(60) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `markers`
--

INSERT INTO `markers` (`id`, `name`, `address`, `lat`, `lng`, `category`) VALUES
(20, 'HVC Hotel 7', '81 EIGHT AVENUE MANHATTAN, NY 10011', 40.737331, -73.992661, '5star'),
(19, 'HVC Hotel 6', '2100 88Th St North Bergen, NJ 07047', 40.812984, -74.015335, '3star'),
(18, 'HVC Hotel 5', '65 RIVER ROAD EDGEWATER, NJ 07020', 40.805634, -73.991928, '4star'),
(17, 'HVC Hotel 4', '1200 HARBOR BLVD WEEHAWKEN, NJ 07086', 40.759781, -73.991928, '4star'),
(16, 'HVC Hotel 3', '75 CHRISTOPHER STREET NEW YORK, NY 10014', 40.733562, -74.003204, '3star'),
(15, 'HVC Hotel 2', '400 WEST 58TH STREET NEW YORK, NY 10019', 40.768536, -73.985687, '5star'),
(14, 'HVC Hotel 1', '272 8TH AVENUE NEW YORK, NY 10011', 40.745743, -73.997963, '5star'),
(21, 'HVC Hotel 8', '811 CLINTON STREET HOBOKEN, NJ 07030', 40.747555, -74.032471, '3star'),
(22, 'HVC Hotel 9', '200 WEST END AVENUE MANHATTAN, NY 10023', 40.777977, -73.985390, '5star'),
(23, 'HVC Hotel 10', '400 Park Pl Secaucus, NJ 07094', 40.792866, -74.042130, '4star');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `markers`
--
ALTER TABLE `markers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `markers`
--
ALTER TABLE `markers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
