CREATE DATABASE CourseDB;

USE CourseDB;

CREATE TABLE Role (
    RoleID VARCHAR(25) PRIMARY KEY,
    RoleName varchar(25),
    RoleDescription varchar(1000),
);

CREATE TABLE [User] (
    UserID varchar(25) PRIMARY KEY,
    UserName varchar(25),
    UserPass varchar(25),
    UserLastName VARCHAR(25),
    UserFirstName varchar(25),
    UserEmail varchar(50),
    UserDOB DATETIME,
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
    EnrollDate DATETIME,
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
    ConDesc VARCHAR (1000),
    ConDate DATETIME,
    CourseID VARCHAR(25),
);

CREATE TABLE Announcement(
    AnID VARCHAR(25) PRIMARY KEY,
    AnTitle VARCHAR(50),
    AnDesc VARCHAR(1000),
    AnDate DATETIME,
    CourseID VARCHAR(25),
);

CREATE TABLE Assignment (
    A_ID VARCHAR(25) PRIMARY KEY,
    A_Title VARCHAR(50),
    A_Desc VARCHAR(1000),
    A_StartAt DATETIME,
    A_DueDate DATETIME,
    CourseID VARCHAR(25),
);

CREATE TABLE Attachment (
    AttachID VARCHAR(25) PRIMARY KEY,
    Attach_FileName VARCHAR(100),
    Attach_Date DATETIME,
    Attach_URL VARCHAR(150),
    CourseID VARCHAR(25)
);

CREATE TABLE AnnouncementAttachment (
    An_AtID uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
    AttachID VARCHAR(25),
    AnID VARCHAR(25)
);

CREATE TABLE ContentAttachment (
    Con_AtID uniqueidentifier PRIMARY KEY DEFAULT NEWID(), 
    AttachID VARCHAR(25),
    ConID VARCHAR(25)
);

CREATE TABLE AssignmentAttachment (
    A_AtID uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
    AttachID VARCHAR(25),
    A_ID VARCHAR(25)
);

CREATE TABLE AssignmentSubmission (
    A_SubID uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
    AttachID VARCHAR(25),
    DoAssignmentID UNIQUEIDENTIFIER,
);

CREATE TABLE DoAssignment(
    DoAssignmentID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    A_ID VARCHAR(25),
    UserID VARCHAR(25),
    Grade FLOAT,
    DoAt DateTime,
)

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

ALTER TABLE AssignmentAttachment
ADD CONSTRAINT FK_AA_Assignment FOREIGN KEY (A_ID) REFERENCES Assignment(A_ID);

ALTER TABLE AssignmentAttachment
ADD CONSTRAINT FK_AA_Attachment FOREIGN KEY (AttachID) REFERENCES Attachment(AttachID);

ALTER TABLE AnnouncementAttachment
ADD CONSTRAINT FK_AnA_Announcement FOREIGN KEY (AnID) REFERENCES Announcement(AnID);

ALTER TABLE AnnouncementAttachment
ADD CONSTRAINT FK_AnA_Attachment FOREIGN KEY (AttachID) REFERENCES Attachment(AttachID);

ALTER TABLE ContentAttachment
ADD CONSTRAINT FK_CAt_Content FOREIGN KEY (ConID) REFERENCES Content(ConID);

ALTER TABLE ContentAttachment
ADD CONSTRAINT FK_CAt_Attachment FOREIGN KEY (AttachID) REFERENCES Attachment(AttachID);

ALTER TABLE AssignmentSubmission
ADD CONSTRAINT FK_AssignmentSubmission_DoAssignment FOREIGN KEY (DoAssignmentID) REFERENCES DoAssignment(DoAssignmentID);

ALTER TABLE AssignmentSubmission
ADD CONSTRAINT FK_AssignmentSubmission_Attachment FOREIGN KEY (AttachID) REFERENCES Attachment(AttachID);