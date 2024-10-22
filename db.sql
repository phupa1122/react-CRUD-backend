-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2024 at 08:35 PM
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
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'อาหารคาว'),
(2, 'ของหวาน'),
(3, 'ของทอด'),
(4, 'ของทานเล่น'),
(5, 'เครื่องดื่ม');

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `food_id` int(11) NOT NULL,
  `food_name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `img` varchar(255) NOT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_employee`
--

CREATE TABLE `tb_employee` (
  `employee_id` int(2) NOT NULL,
  `employee_name` varchar(50) NOT NULL,
  `position_id` int(2) NOT NULL,
  `salary` decimal(10,0) NOT NULL,
  `address` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `phone_number` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_employee`
--

INSERT INTO `tb_employee` (`employee_id`, `employee_name`, `position_id`, `salary`, `address`, `image`, `phone_number`) VALUES
(1, 'test2', 3, 25000, '256 หมู่ 4 \n', '', '555'),
(2, 'นางสาวภัทรานิษฐ์  ไทยทองหลาง', 2, 1500, ' เลขที่ 387 หมู่6 ถนนสุขุมวิท ตำบลนาเกลือ อำเภอบางละมุง จังหวัดชลบุรี 20150', '', '650162222'),
(3, 'นางสาวศศิธร  หอมเกษร', 3, 1500, '', '', ''),
(4, 'นายเจษฎากรณ์  ใจมูลวงศ์', 4, 2000, '', '', ''),
(5, 'นางสาวชนิกา  เเลใจสุข', 5, 1800, '', '', ''),
(7, 'นางสาวนริศรา  จันลาวงศ์', 4, 2000, '', '', ''),
(8, 'ภาคภูมิ  วงค์อินต๊ะวัง', 7, 1750, '222\n', '', '1111'),
(9, 'นายชยากร 5555', 5, 2000, '256 หมู่ 4 ', '', '654545345'),
(10, 'นายธีรศักดิ์  ดือดี', 3, 800, '', '', ''),
(70, 'test test', 3, 5555, 'dddd', '1728486312940.png', '06555');

-- --------------------------------------------------------

--
-- Table structure for table `tb_position`
--

CREATE TABLE `tb_position` (
  `position_id` int(2) NOT NULL,
  `position_name` varchar(50) NOT NULL,
  `salary` decimal(10,0) NOT NULL,
  `phone_number` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_position`
--

INSERT INTO `tb_position` (`position_id`, `position_name`, `salary`, `phone_number`) VALUES
(1, 'เทคโนโลยีสารสนเทศ', 90000, '054342547'),
(2, 'นักออกแบบฐานข้อมูล', 1500, '054342549'),
(3, 'โปรแกรมเมอร์', 800, '084342546'),
(4, 'นักวิเคราะห์ระบบ', 2000, '0841517164'),
(5, 'นักออกแบบโปรแกรม', 1800, '650162502'),
(6, 'เว็บมาสเตอร์', 1200, '054342489'),
(7, 'นักออกแบบกราฟิก', 1750, '054342548'),
(8, 'นักออกประสาสัมพันธ์', 550, '054342547');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id` int(4) NOT NULL,
  `fname` varchar(25) NOT NULL,
  `email` varchar(35) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id`, `fname`, `email`, `password`) VALUES
(1, 'นราวิชญ์', 'naravittom@rmutl.ac.th', '1234'),
(2, 'ทม', 'tom@gmail.com', '4321'),
(3, 'นราวิชญ์', 'ืnaravittom@rmutl.ac.th', '1234'),
(4, 'ทม', 'tom@gmail.com', '4321'),
(5, 'bank', 'bank@gmail.com', '1234'),
(29, 'bank1', 'bank1@gmail.com', '$2b$10$dKa6rorRl4nmt/mNrareN.F8SA7NwNtiBkVhDA5BmNNPuJAZIcRyy'),
(30, 'bank2', 'bank2@gmail.com', '$2b$10$KzNb72CE.M1MthJjIJd6quxfXn13I8CqYNg6vmulQDqL.JBDUHuZW'),
(31, 'bank3', 'bank3@gmail.com', '$2b$10$9Y4GWpEB/7/pwMoNzuKsiunEwT4qc1fQAao.EZPnaEqMNqBLN65DO'),
(33, 'bank4', 'bank4@gmail.com', '$2b$10$VVxpLADmg41jJ6vMZ5RJaevOTXgGKhDxgmgFuYSEIZB62mm3W7yFi'),
(40, 'bank5', 'bank5@gmail.com', '$2b$10$TjrC6Fxa.VeLZ5xveKv0g.jR1w/0dH5jqkWR4uGXVNGOYbWv5/btC');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`food_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `tb_employee`
--
ALTER TABLE `tb_employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `Foreign Key position_id` (`position_id`);

--
-- Indexes for table `tb_position`
--
ALTER TABLE `tb_position`
  ADD PRIMARY KEY (`position_id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `food_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_employee`
--
ALTER TABLE `tb_employee`
  MODIFY `employee_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `tb_position`
--
ALTER TABLE `tb_position`
  MODIFY `position_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `food`
--
ALTER TABLE `food`
  ADD CONSTRAINT `food_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

--
-- Constraints for table `tb_employee`
--
ALTER TABLE `tb_employee`
  ADD CONSTRAINT `tb_employee_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `tb_position` (`position_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
