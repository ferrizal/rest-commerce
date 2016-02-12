-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 12, 2016 at 04:25 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `commerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `description` text COLLATE utf8_bin,
  `lft` int(11) NOT NULL,
  `rgt` int(11) NOT NULL,
  `fg_status` tinyint(4) NOT NULL,
  `created_on` datetime NOT NULL,
  `modified_on` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `lft`, `rgt`, `fg_status`, `created_on`, `modified_on`) VALUES
(1, 'Root', 'Root', 1, 24, 1, '0000-00-00 00:00:00', '2016-02-12 13:24:44'),
(2, 'Handphone', 'All handphones and tablets', 18, 23, 1, '2016-02-11 15:00:00', '2016-02-11 15:00:00'),
(3, 'Television', NULL, 12, 17, 1, '2016-02-11 09:30:34', '2016-02-11 09:30:34'),
(4, 'Smart Phone', NULL, 19, 22, 1, '2016-02-11 16:05:28', '2016-02-11 16:05:28'),
(5, 'Android Phone', NULL, 20, 21, 1, '2016-02-11 16:17:03', '2016-02-11 16:17:03'),
(6, 'LED TV', NULL, 15, 16, 1, '2016-02-11 23:21:48', '2016-02-11 23:21:48'),
(7, 'Plasma TV', NULL, 13, 14, 1, '2016-02-12 01:59:34', '2016-02-12 01:59:34'),
(8, 'Peralatan Rumah Tangga', NULL, 10, 11, 1, '2016-02-12 07:08:25', '2016-02-12 07:08:25'),
(9, 'Laptop dan Komputer', 'Laptop, komputer, peralatan IT.', 8, 9, 1, '2016-02-12 07:13:12', '2016-02-12 07:50:50'),
(10, 'Fashion', 'Aneka pakaian, tua muda, laki-laki perempuan.', 2, 7, 1, '2016-02-12 07:15:41', '2016-02-12 07:15:41'),
(11, 'Pakaian Pria', 'Aneka pakaian pria.', 5, 6, 1, '2016-02-12 14:22:06', '2016-02-12 14:29:35'),
(12, 'Fashion Wanita', 'Aneka pakaian, tua muda, laki-laki perempuan.', 3, 4, 1, '2016-02-12 14:25:07', '2016-02-12 14:25:07');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `sku` varchar(255) COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `category_id` int(11) NOT NULL,
  `description` text COLLATE utf8_bin NOT NULL,
  `fg_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '-2=deleted;-1=inactive;0=new;1=on_review;2=published',
  `created_on` datetime NOT NULL,
  `modified_on` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `sku`, `name`, `category_id`, `description`, `fg_status`, `created_on`, `modified_on`) VALUES
(1, 'abc12345', 'Laptop Dell XPS 13', 4, 'Product description of Laptop Dell XPS', 2, '0000-00-00 00:00:00', '2016-02-12 06:02:35'),
(2, 'abc112233', 'Samsung Galaxy S5', 5, 'Product description of Laptop Dell XPS', 2, '0000-00-00 00:00:00', '2016-02-12 06:02:49'),
(3, 'abc112233', 'Samsung Galaxy S5', 5, 'Product description of Laptop Dell XPS', 2, '2016-02-10 17:26:59', '2016-02-12 06:08:42'),
(4, 'abc112233', 'Samsung Galaxy S5', 6, 'Product description of Laptop Dell XPS', 2, '2016-02-10 17:35:36', '2016-02-12 14:42:04'),
(5, 'absfs123', 'iPhone 6', 0, 'Product description of iPhone 6', -2, '2016-02-12 14:35:56', '2016-02-12 14:43:44'),
(6, 'absfs123', 'iPhone 6', 5, 'Product description of Laptop Dell XPS', 2, '2016-02-12 14:37:17', '2016-02-12 14:42:59'),
(7, 'absfs123', 'iPhone 6', 5, 'Product description of iPhone 6', 0, '2016-02-12 14:38:10', '2016-02-12 14:38:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
