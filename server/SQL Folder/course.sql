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
    EnrollID VARCHAR(25)
)

CREATE TABLE Department(
    DeptID varchar(25) primary key,
    DeptName varchar(50),
    TutorID varchar(25),
    StudentID varchar(25),
    CourseID varchar(25)
)

CREATE TABLE Tutor (
    TutorID VARCHAR(25) PRIMARY KEY,
    UserID VARCHAR(25),
    DeptID VARCHAR(25),
    CourseID varchar(25)
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
    AnID VARCHAR(25),
    ConID VARCHAR(25),
    A_ID VARCHAR(25),
    EnrollID VARCHAR(25),
    TutorID VARCHAR(25)
)

CREATE TABLE Content (
    ConID VARCHAR(25) PRIMARY KEY,
    ConTitle VARCHAR (50),
    ConDesc VARCHAR (150),
    ConDate VARCHAR (200),
    ConAttachID VARCHAR(25),
)

CREATE TABLE Announcement(
    AnID VARCHAR(25) PRIMARY KEY,
    AnTitle VARCHAR(50),
    AnDesc VARCHAR(150),
    AnDate DATE,
    AnAttachID VARCHAR(25),
)

CREATE TABLE Assignment (
    A_ID VARCHAR(25) PRIMARY KEY,
    A_Title VARCHAR(50),
    A_Desc VARCHAR(150),
    A_StartAt DATE,
    A_DueDate DATE,
    A_TextSubmission VARCHAR(500),
    A_Comment VARCHAR(150),
    A_AttachID VARCHAR(25)
)

CREATE TABLE Attachment (
    AttachID VARCHAR(25) PRIMARY KEY,
    Attach_FileName VARCHAR(50),
    Attach_FileType VARCHAR(10),
    Attach_Size FLOAT,
    Attach_Date DATE
)


-- foreign key
ALTER TABLE [User]
ADD CONSTRAINT FK_User_Login
FOREIGN KEY (LoginID) REFERENCES Login(LoginID);

ALTER TABLE [User]
ADD CONSTRAINT FK_User_Role
FOREIGN KEY (RoleID) REFERENCES Role(RoleID);

ALTER TABLE Enroll
ADD CONSTRAINT FK_Enroll_Student
FOREIGN KEY (StudentID) REFERENCES Student(StudentID);

ALTER TABLE Enroll
ADD CONSTRAINT FK_Enroll_Course
FOREIGN KEY (CourseID) REFERENCES Course(CourseID);

ALTER TABLE Student
ADD CONSTRAINT FK_Student_User
FOREIGN KEY (UserID) REFERENCES [User](UserID);

ALTER TABLE Student
ADD CONSTRAINT FK_Student_Department
FOREIGN KEY (DeptID) REFERENCES Department(DeptID);

ALTER TABLE Student
ADD CONSTRAINT FK_Student_Enroll
FOREIGN KEY (EnrollID) REFERENCES Enroll(EnrollID);

ALTER TABLE Department
ADD CONSTRAINT FK_Department_Tutor
FOREIGN KEY (TutorID) REFERENCES Tutor(TutorID);

ALTER TABLE Department
ADD CONSTRAINT FK_Department_Student
FOREIGN KEY (StudentID) REFERENCES Student(StudentID);

ALTER TABLE Department
ADD CONSTRAINT FK_Department_Course
FOREIGN KEY (CourseID) REFERENCES Course(CourseID);

ALTER TABLE Tutor
ADD CONSTRAINT FK_Tutor_User
FOREIGN KEY (UserID) REFERENCES [User](UserID);

ALTER TABLE Tutor
ADD CONSTRAINT FK_Tutor_Department
FOREIGN KEY (DeptID) REFERENCES Department(DeptID);

ALTER TABLE Tutor
ADD CONSTRAINT FK_Tutor_Course
FOREIGN KEY (CourseID) REFERENCES Course(CourseID);

ALTER TABLE Course
ADD CONSTRAINT FK_Course_Tutor
FOREIGN KEY (TutorID) REFERENCES Tutor(TutorID);

ALTER TABLE Course
ADD CONSTRAINT FK_Course_Annnouncement
FOREIGN KEY (AnID) REFERENCES Announcement(AnID);

ALTER TABLE Course
ADD CONSTRAINT FK_Course_Content
FOREIGN KEY (ConID) REFERENCES Content(ConID);

ALTER TABLE Course
ADD CONSTRAINT FK_Course_Assignment
FOREIGN KEY (A_ID) REFERENCES Assignment(A_ID);

ALTER TABLE Course
ADD CONSTRAINT FK_Course_Enroll
FOREIGN KEY (EnrollID) REFERENCES Enroll(EnrollID);


ALTER TABLE Announcement
ADD CONSTRAINT FK_Announcement_Attachment
FOREIGN KEY (AnAttachID) REFERENCES Attachment(AttachID);

ALTER TABLE Content
ADD CONSTRAINT FK_Content_Attachment
FOREIGN KEY (ConAttachID) REFERENCES Attachment(AttachID);

