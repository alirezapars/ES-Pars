-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2019 at 06:23 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `espars`
--

-- --------------------------------------------------------

--
-- Table structure for table `pars_systems`
--

CREATE TABLE `pars_systems` (
  `ID` int(11) NOT NULL,
  `name` text COLLATE utf8_persian_ci NOT NULL,
  `atrr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `pars_systems`
--

INSERT INTO `pars_systems` (`ID`, `name`, `atrr_id`) VALUES
(1, 'سیستم خبره انتخاب موبایل', 2),
(2, 'سیستم خبره لپ تاپ', 3);

-- --------------------------------------------------------

--
-- Table structure for table `pars_tree`
--

CREATE TABLE `pars_tree` (
  `ID` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `content` text COLLATE utf8_persian_ci NOT NULL,
  `position` text COLLATE utf8_persian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

--
-- Dumping data for table `pars_tree`
--

INSERT INTO `pars_tree` (`ID`, `parent_id`, `content`, `position`) VALUES
(2, 0, 'چه نوع موبایلی میخواهید؟؟', 'atr'),
(158, 2, 'موبایل معمولی ', 'val'),
(159, 2, 'موبایل هوشمند', 'val'),
(160, 158, 'انتخاب شما چیست؟', 'atr'),
(161, 160, 'موبایل ایرانی', 'val'),
(162, 160, 'موبایل خارجی', 'val'),
(163, 159, 'آیا موبایل ایرانی میخواهید؟', 'atr'),
(166, 163, 'بله', 'val'),
(167, 163, 'خیر', 'val'),
(168, 167, 'برند مورد علاقه شما چیست؟', 'atr'),
(169, 168, 'Samsung', 'val'),
(170, 168, 'HTC', 'val'),
(171, 168, 'Nokia', 'val'),
(172, 169, 'چه تعداد سیمکارت داشته باشد؟', 'atr'),
(173, 172, 'تک سیمکارت', 'val'),
(174, 172, 'دو سیمکارت', 'val'),
(175, 174, 'کیفیت دوربین مهم است؟', 'atr'),
(176, 175, 'بله', 'val'),
(177, 175, 'خیر', 'val'),
(178, 176, 'Samsung j7 Prime 2017', 'con');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pars_systems`
--
ALTER TABLE `pars_systems`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `pars_tree`
--
ALTER TABLE `pars_tree`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pars_systems`
--
ALTER TABLE `pars_systems`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `pars_tree`
--
ALTER TABLE `pars_tree`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
