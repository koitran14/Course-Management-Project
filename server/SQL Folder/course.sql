CREATE DATABASE CourseDB;

USE CourseDB;

CREATE TABLE Role (
    RoleID VARCHAR(25) PRIMARY KEY,
    RoleName varchar(25),
    RoleDescription varchar(150),
);

CREATE TABLE Login (
    LoginID varchar(25) PRIMARY KEY,
    LoginUserName varchar(25) UNIQUE,
    LoginPassword varchar(25),
)

CREATE TABLE [User] (
    UserID varchar(25) PRIMARY KEY,
    UserLastName VARCHAR(25),
    UserFirstName varchar(25),
    UserEmail varchar(50) UNIQUE,
    UserDOB DATE,
    LoginID VARCHAR(25),
    RoleID VARCHAR(25)
)

CREATE TABLE Student (
    StudentID VARCHAR(25) primary key,
    UserID VARCHAR(25),
    DeptID VARCHAR(25),
)

CREATE TABLE Department(
    DeptID varchar(25) primary key,
    DeptName varchar(50),
)

CREATE TABLE Tutor (
    TutorID VARCHAR(25) PRIMARY KEY,
    UserID VARCHAR(25),
    DeptID VARCHAR(25),
)

CREATE TABLE Enroll (
    EnrollID varchar(25) PRIMARY KEY,
    EnrollDate Date,
    StudentID VARCHAR(25),
    CourseID VARCHAR(25)
)

CREATE TABLE Course (
    CourseID VARCHAR(25) PRIMARY KEY,
    CourseName VARCHAR(50),
    TutorID VARCHAR(25),
)

CREATE TABLE Content (
    ConID VARCHAR(25) PRIMARY KEY,
    ConTitle VARCHAR (50),
    ConDesc VARCHAR (150),
    ConDate Date,
    CourseID VARCHAR(25),
)

CREATE TABLE Announcement(
    AnID VARCHAR(25) PRIMARY KEY,
    AnTitle VARCHAR(50),
    AnDesc VARCHAR(150),
    AnDate DATE,
    CourseID VARCHAR(25),
)

CREATE TABLE Assignment (
    A_ID VARCHAR(25) PRIMARY KEY,
    A_Title VARCHAR(50),
    A_Desc VARCHAR(150),
    A_StartAt DATE,
    A_DueDate DATE,
    A_TextSubmission VARCHAR(500),
    A_Comment VARCHAR(150),
    CourseID VARCHAR(25),
)

CREATE TABLE Attachment (
    AttachID VARCHAR(25) PRIMARY KEY,
    Attach_FileName VARCHAR(50),
    Attach_FileType VARCHAR(10),
    Attach_Size FLOAT,
    Attach_Date DATE,
    CourseID VARCHAR(25),
    A_ID VARCHAR(25),
    AnID VARCHAR(25),
    ConID VARCHAR(25),
)

-- FOREIGN KEY
ALTER TABLE [User]
ADD FOREIGN KEY (LoginID) REFERENCES Login(LoginID);

ALTER TABLE [User]
ADD FOREIGN KEY (RoleID) REFERENCES Role(RoleID);

ALTER TABLE Student
ADD FOREIGN KEY (UserID) REFERENCES [User](UserID);

ALTER TABLE Student
ADD FOREIGN KEY (DeptID) REFERENCES Department(DeptID);

ALTER TABLE Tutor
ADD FOREIGN KEY (UserID) REFERENCES [User](UserID);

ALTER TABLE Tutor
ADD FOREIGN KEY (DeptID) REFERENCES Department(DeptID);

ALTER TABLE Enroll
ADD FOREIGN KEY (StudentID) REFERENCES Student(StudentID);

ALTER TABLE Enroll
ADD FOREIGN KEY (CourseID) REFERENCES Course(CourseID);

ALTER TABLE Course
ADD FOREIGN KEY (TutorID) REFERENCES Tutor(TutorID);

ALTER TABLE Content
ADD FOREIGN KEY (CourseID) REFERENCES Course(CourseID);

ALTER TABLE Announcement
ADD FOREIGN KEY (CourseID) REFERENCES Course(CourseID);

ALTER TABLE Assignment
ADD FOREIGN KEY (CourseID) REFERENCES Course(CourseID);

ALTER TABLE Attachment
ADD FOREIGN KEY (CourseID) REFERENCES Course(CourseID);

ALTER TABLE Attachment
ADD FOREIGN KEY (A_ID) REFERENCES Assignment(A_ID);

ALTER TABLE Attachment
ADD FOREIGN KEY (AnID) REFERENCES Announcement(AnID);

ALTER TABLE Attachment
ADD FOREIGN KEY (ConID) REFERENCES Content(ConID);

