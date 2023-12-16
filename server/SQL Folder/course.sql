CREATE DATABASE CourseDB;

USE CourseDB;

CREATE TABLE Role (
    RoleID VARCHAR(25) PRIMARY KEY,
    RoleName varchar(25),
    RoleDescription varchar(150),
);

CREATE TABLE [User] (
    UserID varchar(25) PRIMARY KEY,
    UserName varchar(25),
    UserPass varchar(25),
    UserLastName VARCHAR(25),
    UserFirstName varchar(25),
    UserEmail varchar(50),
    UserDOB DATE,
    UserUniID VARCHAR(25),
    RoleID VARCHAR(25),
    DeptID VARCHAR(25),
);

CREATE TABLE Department(
    DeptID varchar(25) primary key,
    DeptName varchar(50),
);

CREATE TABLE Enroll (
    EnrollID varchar(25) PRIMARY KEY,
    EnrollDate Date,
    UserID VARCHAR(25),
    CourseID VARCHAR(25)
);

CREATE TABLE Course (
    CourseID VARCHAR(25) PRIMARY KEY,
    CourseName VARCHAR(50),
    UserID VARCHAR(25),
    DeptID VARCHAR(25),
);

CREATE TABLE Content (
    ConID VARCHAR(25) PRIMARY KEY,
    ConTitle VARCHAR (50),
    ConDesc VARCHAR (150),
    ConDate VARCHAR (200),
    CourseID VARCHAR(25),
);

CREATE TABLE Announcement(
    AnID VARCHAR(25) PRIMARY KEY,
    AnTitle VARCHAR(50),
    AnDesc VARCHAR(150),
    AnDate DATE,
    CourseID VARCHAR(25),
);

CREATE TABLE Assignment (
    A_ID VARCHAR(25) PRIMARY KEY,
    A_Title VARCHAR(50),
    A_Desc VARCHAR(150),
    A_StartAt DATE,
    A_DueDate DATE,
    CourseID VARCHAR(25),
);

CREATE TABLE Attachment (
    AttachID VARCHAR(25) PRIMARY KEY,
    Attach_FileName VARCHAR(50),
    Attach_FileType VARCHAR(10),
    Attach_Size FLOAT,
    Attach_Date DATE,
    Attach_URL DATE,
    CourseID VARCHAR(25),
    A_ID VARCHAR(25),
    AnID VARCHAR(25),
    ConID VARCHAR(25),
);


-- FOREIGN KEY
-- Adding foreign key constraints to the [User] table
ALTER TABLE [User]
ADD CONSTRAINT FK_User_Role FOREIGN KEY (RoleID) REFERENCES Role(RoleID);

ALTER TABLE [User]
ADD CONSTRAINT FK_User_Dept FOREIGN KEY (DeptID) REFERENCES Department(DeptID);

-- Adding foreign key constraints to the Enroll table
ALTER TABLE Enroll
ADD CONSTRAINT FK_Enroll_User FOREIGN KEY (UserID) REFERENCES [User](UserID);

ALTER TABLE Enroll
ADD CONSTRAINT FK_Enroll_Course FOREIGN KEY (CourseID) REFERENCES Course(CourseID);

-- Adding foreign key constraints to the Course table
ALTER TABLE Course
ADD CONSTRAINT FK_Course_User FOREIGN KEY (UserID) REFERENCES [User](UserID);

ALTER TABLE Course
ADD CONSTRAINT FK_Course_Dept FOREIGN KEY (DeptID) REFERENCES Department(DeptID);

-- Adding foreign key constraints to the Content table
ALTER TABLE Content
ADD CONSTRAINT FK_Content_Course FOREIGN KEY (CourseID) REFERENCES Course(CourseID);

-- Adding foreign key constraints to the Announcement table
ALTER TABLE Announcement
ADD CONSTRAINT FK_Announcement_Course FOREIGN KEY (CourseID) REFERENCES Course(CourseID);

-- Adding foreign key constraints to the Assignment table
ALTER TABLE Assignment
ADD CONSTRAINT FK_Assignment_Course FOREIGN KEY (CourseID) REFERENCES Course(CourseID);

-- Adding foreign key constraints to the Attachment table
ALTER TABLE Attachment
ADD CONSTRAINT FK_Attachment_Course FOREIGN KEY (CourseID) REFERENCES Course(CourseID);

ALTER TABLE Attachment
ADD CONSTRAINT FK_Attachment_Assignment FOREIGN KEY (A_ID) REFERENCES Assignment(A_ID);

ALTER TABLE Attachment
ADD CONSTRAINT FK_Attachment_Announcement FOREIGN KEY (AnID) REFERENCES Announcement(AnID);

ALTER TABLE Attachment
ADD CONSTRAINT FK_Attachment_Content FOREIGN KEY (ConID) REFERENCES Content(ConID);

