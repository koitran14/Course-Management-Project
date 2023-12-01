--   Role table
INSERT INTO Role (RoleID, RoleName, RoleDescription)
VALUES
    ('R001', 'Admin', 'Administrative Role'),
    ('R002', 'Tutor', 'Teaching Role'),
    ('R003', 'Student', 'Learning Role');

--   Login table
INSERT INTO Login (LoginID, LoginUserName, LoginPassword)
VALUES
    ('L001', 'admin_user', 'admin_pass'),
    ('L002', 'tutor_user', 'tutor_pass'),
    ('L003', 'student_user', 'student_pass');

--   [User] table
INSERT INTO [User] (UserID, UserLastName, UserFirstName, UserEmail, UserDOB, LoginID, RoleID)
VALUES
    ('U001', 'Admin', 'Alice', 'admin@example.com', '1990-01-01', 'L001', 'R001'),
    ('U002', 'Tutor', 'Bob', 'tutor@example.com', '1985-05-15', 'L002', 'R002'),
    ('U003', 'Student', 'Charlie', 'student@example.com', '2000-09-20', 'L003', 'R003');

--   Department table
INSERT INTO Department (DeptID, DeptName)
VALUES
    ('D001', 'Computer Science'),
    ('D002', 'Mathematics'),
    ('D003', 'Physics');

--   Student table
INSERT INTO Student (StudentID, UserID, DeptID)
VALUES
    ('S001', 'U003', 'D001'),
    ('S002', 'U003', 'D002'),
    ('S003', 'U003', 'D003');

--   Tutor table
INSERT INTO Tutor (TutorID, UserID, DeptID)
VALUES
    ('T001', 'U002', 'D001'),
    ('T002', 'U002', 'D002'),
    ('T003', 'U002', 'D003');

--   Course table
INSERT INTO Course (CourseID, CourseName, TutorID)
VALUES
    ('C001', 'Introduction to Programming', 'T001'),
    ('C002', 'Calculus I', 'T002'),
    ('C003', 'Mechanics', 'T003');

--   Enroll table
INSERT INTO Enroll (EnrollID, EnrollDate, StudentID, CourseID)
VALUES
    ('E001', '2023-01-01', 'S001', 'C001'),
    ('E002', '2023-01-01', 'S002', 'C002'),
    ('E003', '2023-01-01', 'S003', 'C003');

--   Content table
INSERT INTO Content (ConID, ConTitle, ConDesc, ConDate, CourseID)
VALUES
    ('CN001', 'Introduction to Variables', 'Basic concepts of variables', '2023-01-05', 'C001'),
    ('CN002', 'Limits and Derivatives', 'Understanding limits and derivatives', '2023-01-10', 'C002'),
    ('CN003', 'Newtonian Mechanics', 'Introductory mechanics principles', '2023-01-15', 'C003');

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
