CREATE TABLE IF NOT EXISTS Users(
userID INT PRIMARY KEY AUTO_INCREMENT, 
firstName VARCHAR(15), 
lastName VARCHAR(15), 
age INT, 
emailAddress VARCHAR(50), 
userPassword TEXT
);

TRUNCATE Users;

-- CREATE TABLE IF NOT EXISTS Products(
-- )