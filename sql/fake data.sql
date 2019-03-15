-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 15, 2019 at 03:55 PM
-- Server version: 5.7.25-0ubuntu0.18.04.2
-- PHP Version: 7.2.15-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `s34fu`
--

-- --------------------------------------------------------

--
-- Table structure for table `available_time`
--

CREATE TABLE `available_time` (
  `id` int(11) NOT NULL,
  `tutorId` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `available_time`
--

INSERT INTO `available_time` (`id`, `tutorId`, `time`) VALUES
(1, 2, '2019-03-15 10:16:07'),
(2, 3, '2019-03-31 16:21:10'),
(3, 6, '2019-03-28 11:18:14'),
(4, 7, '2019-04-06 13:45:00'),
(5, 8, '2019-04-06 09:40:00');

-- --------------------------------------------------------

--
-- Table structure for table `class_info`
--

CREATE TABLE `class_info` (
  `id` int(11) NOT NULL,
  `studentId` int(11) DEFAULT NULL,
  `tutorId` int(11) DEFAULT NULL,
  `available_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `class_info`
--

INSERT INTO `class_info` (`id`, `studentId`, `tutorId`, `available_time`) VALUES
(1, 1, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `forum`
--

CREATE TABLE `forum` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `content` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `forum`
--

INSERT INTO `forum` (`id`, `userId`, `subject`, `content`) VALUES
(1, 1, 'Looking for a second hand piano.', 'Looking for a second hand piano around $5000. DM me if you are interested!');

-- --------------------------------------------------------

--
-- Table structure for table `musician`
--

CREATE TABLE `musician` (
  `id` int(11) NOT NULL,
  `instrument` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `musician`
--

INSERT INTO `musician` (`id`, `instrument`) VALUES
(4, 'guitar');

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

CREATE TABLE `organization` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `organization`
--

INSERT INTO `organization` (`id`, `name`) VALUES
(5, 'ABC Pub');

-- --------------------------------------------------------

--
-- Table structure for table `organization_performance_instrument`
--

CREATE TABLE `organization_performance_instrument` (
  `id` int(11) NOT NULL,
  `organizationId` int(11) NOT NULL,
  `performanceId` int(11) NOT NULL,
  `instrument` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `organization_performance_instrument`
--

INSERT INTO `organization_performance_instrument` (`id`, `organizationId`, `performanceId`, `instrument`) VALUES
(1, 5, 1, 'guitar');

-- --------------------------------------------------------

--
-- Table structure for table `performance_info`
--

CREATE TABLE `performance_info` (
  `id` int(11) NOT NULL,
  `organizationId` int(11) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `performance_info`
--

INSERT INTO `performance_info` (`id`, `organizationId`, `location`, `time`) VALUES
(1, 5, 'Waterloo', '2019-03-24 11:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `instrument` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `instrument`) VALUES
(1, 'piano');

-- --------------------------------------------------------

--
-- Table structure for table `tutor`
--

CREATE TABLE `tutor` (
  `id` int(11) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `instrument` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tutor`
--

INSERT INTO `tutor` (`id`, `location`, `instrument`) VALUES
(2, 'CPH 3681', 'guitar'),
(3, 'Toronto', 'piano'),
(6, 'Waterloo 181', 'bass'),
(7, 'Hamilton', 'drum'),
(8, 'CPH 3681', 'guitar');

-- --------------------------------------------------------

--
-- Table structure for table `tutor_rating`
--

CREATE TABLE `tutor_rating` (
  `studentId` int(11) NOT NULL,
  `tutorId` int(11) NOT NULL,
  `rate` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tutor_rating`
--

INSERT INTO `tutor_rating` (`studentId`, `tutorId`, `rate`) VALUES
(1, 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `age`, `gender`, `password`, `type`) VALUES
(1, 'andy', 20, 0, '12345', 0),
(2, 'Laura', 3, 1, '12345', 1),
(3, 'Jaco', 20, 0, '12345', 1),
(4, 'Leo', 19, 0, '12345', 2),
(5, 'ABC Pub Administrator', 30, 1, '12345', 3),
(6, 'Alice', 28, 1, '12345', 1),
(7, 'Bob', 34, 0, '12345', 1),
(8, 'Carry', 22, 0, '12345', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `available_time`
--
ALTER TABLE `available_time`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tutorId` (`tutorId`);

--
-- Indexes for table `class_info`
--
ALTER TABLE `class_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `available_time` (`available_time`),
  ADD KEY `studentId` (`studentId`),
  ADD KEY `tutorId` (`tutorId`);

--
-- Indexes for table `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `musician`
--
ALTER TABLE `musician`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organization`
--
ALTER TABLE `organization`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organization_performance_instrument`
--
ALTER TABLE `organization_performance_instrument`
  ADD PRIMARY KEY (`id`,`organizationId`,`performanceId`),
  ADD KEY `organizationId` (`organizationId`),
  ADD KEY `performanceId` (`performanceId`);

--
-- Indexes for table `performance_info`
--
ALTER TABLE `performance_info`
  ADD PRIMARY KEY (`id`,`organizationId`),
  ADD KEY `organizationId` (`organizationId`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tutor`
--
ALTER TABLE `tutor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tutor_rating`
--
ALTER TABLE `tutor_rating`
  ADD PRIMARY KEY (`studentId`,`tutorId`),
  ADD KEY `tutor_fk` (`tutorId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `available_time`
--
ALTER TABLE `available_time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `class_info`
--
ALTER TABLE `class_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `forum`
--
ALTER TABLE `forum`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `musician`
--
ALTER TABLE `musician`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `organization`
--
ALTER TABLE `organization`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `organization_performance_instrument`
--
ALTER TABLE `organization_performance_instrument`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `performance_info`
--
ALTER TABLE `performance_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `available_time`
--
ALTER TABLE `available_time`
  ADD CONSTRAINT `available_time_ibfk_1` FOREIGN KEY (`tutorId`) REFERENCES `tutor` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `class_info`
--
ALTER TABLE `class_info`
  ADD CONSTRAINT `class_info_ibfk_1` FOREIGN KEY (`available_time`) REFERENCES `available_time` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `class_info_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `class_info_ibfk_3` FOREIGN KEY (`tutorId`) REFERENCES `tutor` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `forum`
--
ALTER TABLE `forum`
  ADD CONSTRAINT `forum_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `musician`
--
ALTER TABLE `musician`
  ADD CONSTRAINT `musician_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `organization`
--
ALTER TABLE `organization`
  ADD CONSTRAINT `organization_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `organization_performance_instrument`
--
ALTER TABLE `organization_performance_instrument`
  ADD CONSTRAINT `organization_performance_instrument_ibfk_1` FOREIGN KEY (`organizationId`) REFERENCES `organization` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `organization_performance_instrument_ibfk_2` FOREIGN KEY (`performanceId`) REFERENCES `performance_info` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `performance_info`
--
ALTER TABLE `performance_info`
  ADD CONSTRAINT `performance_info_ibfk_1` FOREIGN KEY (`organizationId`) REFERENCES `organization` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tutor`
--
ALTER TABLE `tutor`
  ADD CONSTRAINT `pk` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tutor_rating`
--
ALTER TABLE `tutor_rating`
  ADD CONSTRAINT `student_fk` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tutor_fk` FOREIGN KEY (`tutorId`) REFERENCES `tutor` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
