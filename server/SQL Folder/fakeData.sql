--   Role table
INSERT INTO Role (RoleID, RoleName, RoleDescription)
VALUES
    ('R001', 'Tutor', 'Teaching Role'),
    ('R002', 'Student', 'Learning Role');

--   Login table
INSERT INTO Login (LoginID, LoginUserName, LoginPassword)
VALUES
    ('L001', 'tutor_user', 'tutor_pass'),
    ('L002', 'tutor2_user', 'tutor2_pass'),
    ('L003', 'student_user', 'student_pass'),
    ('L004', 'student2_user', 'student2_pass');


--   [User] table
INSERT INTO [User] (UserID, UserLastName, UserFirstName, UserEmail, UserDOB, LoginID, RoleID)
VALUES
    ('U001', 'Adlan', 'Alice', 'tutor@example.com', '1990-01-01', 'L001', 'R001'),
    ('U002', 'Adlan', 'Alice', 'tutor2@example.com', '1990-01-01', 'L002', 'R001'),
    ('U003', 'Kali', 'Bob', 'student1@example.com', '1985-05-15', 'L003', 'R002'),
    ('U004', 'Mosala', 'Charlie', 'student2@example.com', '2000-09-20', 'L004', 'R002');

--   Department table
INSERT INTO Department (DeptID, DeptName)
VALUES
    ('D001', 'Computer Science'),
    ('D002', 'Mathematics');

--   Student table
INSERT INTO Student (StudentID, UserID, DeptID)
VALUES
    ('S001', 'U002', 'D001'),
    ('S002', 'U003', 'D002');

--   Tutor table
INSERT INTO Tutor (TutorID, UserID, DeptID)
VALUES
    ('T001', 'U001', 'D001'),
    ('T002', 'U002', 'D002');


--   Course table
INSERT INTO Course (CourseID, CourseName, TutorID, DeptID)
VALUES
    ('C001', 'Introduction to Programming', 'T001','D001'),
    ('C002', 'Calculus I', 'T002', 'D002'),
    ('C003', 'Mechanics', 'T002', 'D001'),
    ('C004', 'Data Structures', 'T001', 'D002'),
    ('C005', 'Linear Algebra', 'T002', 'D002'),
    ('C006', 'Principle of Database Management', 'T002', 'D001');

--   Enroll table
INSERT INTO Enroll (EnrollID, EnrollDate, StudentID, CourseID)
VALUES
    ('E001', '2023-01-01', 'S001', 'C001'),
    ('E002', '2023-01-01', 'S001', 'C002'),
    ('E003', '2023-01-01', 'S001', 'C003'),
    ('E004', '2023-01-05', 'S001', 'C002'),
    ('E005', '2023-02-20', 'S001', 'C004'),
    ('E006', '2023-01-10', 'S002', 'C003'),
    ('E007', '2023-02-25', 'S002', 'C005'),
    ('E008', '2023-03-15', 'S002', 'C001');

--   Content table
-- Insert 2 content entries for each course
INSERT INTO Content (ConID, ConTitle, ConDesc, ConDate, CourseID)
VALUES
    ('CN001', 'Introduction to Variables', 'Basic concepts of variables', '2023-01-05', 'C001'),
    ('CN002', 'Limits and Derivatives', 'Understanding limits and derivatives', '2023-01-10', 'C001'),
    ('CN003', 'Calculus Fundamentals', 'Fundamental concepts of calculus', '2023-01-15', 'C002'),
    ('CN004', 'Integration Techniques', 'Exploring integration techniques', '2023-01-20', 'C002'),
    ('CN005', 'Mechanics Basics', 'Basic principles of mechanics', '2023-01-25', 'C003'),
    ('CN006', 'Mechanics Advanced', 'Advanced concepts in mechanics', '2023-01-30', 'C003'),
    ('CN007', 'Data Structures Overview', 'Overview of data structures', '2023-02-05', 'C004'),
    ('CN008', 'Data Structures Implementation', 'Implementation of data structures', '2023-02-10', 'C004'),
    ('CN009', 'Linear Algebra Basics', 'Basic concepts of linear algebra', '2023-02-15', 'C005'),
    ('CN010', 'Matrix Operations', 'Operations on matrices', '2023-02-20', 'C005'),
    ('CN011', 'Database Management Overview', 'Overview of database management', '2023-02-25', 'C006'),
    ('CN012', 'Database Modeling', 'Concepts of database modeling', '2023-03-01', 'C006');

--   Announcement table
INSERT INTO Announcement (AnID, AnTitle, AnDesc, AnDate, CourseID)
VALUES
    ('A001', 'Important Notice', 'Exam schedule changed', '2023-02-01', 'C001'),
    ('A002', 'Assignment Reminder', 'Submit your assignment by next week', '2023-02-05', 'C002'),
    ('A003', 'Guest Lecture', 'Special lecture by visiting professor', '2023-02-10', 'C003');

--   Assignment table
INSERT INTO Assignment (A_ID, A_Title, A_Desc, A_StartAt, A_DueDate, A_TextSubmission, A_Comment, CourseID)
VALUES
    ('AS001', 'Variables Exercise', 'Practice on variables', '2023-01-07', '2023-01-14', 'Text submission here', 'Remember to include explanations', 'C001'),
    ('AS002', 'Derivatives Problems', 'Solving derivative exercises', '2023-01-12', '2023-01-19', 'Text submission here', 'Please show detailed steps', 'C002'),
    ('AS003', 'Mechanics Quiz', 'Short quiz on mechanics concepts', '2023-01-18', '2023-01-25', 'Text submission here', 'Review your notes before attempting', 'C003');

--   Attachment table 
INSERT INTO Attachment (AttachID, Attach_FileName, Attach_FileType, Attach_Size, Attach_Date, CourseID, A_ID, AnID, ConID)
VALUES
    ('AT001', 'variables.pdf', 'pdf', 123.45, '2023-01-14', 'C001', 'AS001', NULL, 'CN001'),
    ('AT002', 'derivatives.docx', 'docx', 234.56, '2023-01-19', 'C002', 'AS002', NULL, 'CN002'),
    ('AT003', 'mechanics_notes.pdf', 'pdf', 345.67, '2023-01-25', 'C003', NULL, NULL, 'CN003'),
    ('AT004', 'assignment_1.pdf', 'pdf', 456.78, '2023-02-01', 'C001', 'AS001', NULL, NULL),
    ('AT005', 'calculus_homework.docx', 'docx', 567.89, '2023-02-05', 'C002', 'AS002', NULL, NULL),
    ('AT006', 'momentum_equations.pdf', 'pdf', 678.90, '2023-02-10', 'C003', NULL, 'A003', 'CN003'),
    ('AT007', 'variables_solution.pdf', 'pdf', 789.01, '2023-02-15', 'C001', 'AS001', NULL, NULL),
    ('AT008', 'calculus_exam.pdf', 'pdf', 890.12, '2023-02-20', 'C002', 'AS002', 'A002', NULL),
    ('AT009', 'forces_lab_report.docx', 'docx', 901.23, '2023-02-25', 'C003', NULL, 'A003', NULL),
    ('AT010', 'programming_assignment.py', 'py', 1023.45, '2023-03-01', 'C001', 'AS001', NULL, NULL);
