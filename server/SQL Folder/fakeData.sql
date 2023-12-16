-- Departments
INSERT INTO Department (DeptID, DeptName) VALUES
('101', 'Computer Science'),
('102', 'Data Science');

INSERT INTO Role (RoleID, RoleName, RoleDescription) VALUES
('R001', 'Teacher', 'Instructor responsible for course teaching'),
('R002', 'Student', 'Enrolled in courses');

-- Users (teachers and students)
INSERT INTO [User] (UserID, UserName, UserPass, UserLastName, UserFirstName, UserEmail, UserDOB, UserUniID, RoleID, DeptID) VALUES
('U001', 'teacher1', 'teacherpass1', 'Smith', 'John', 'teacher1@email.com', '1980-05-15', 'UNI123', 'R001', '101'),
('U002', 'teacher2', 'teacherpass2', 'Johnson', 'Emma', 'teacher2@email.com', '1975-10-18', 'UNI456', 'R001', '102'),
('U003', 'student1', 'studentpass1', 'Williams', 'Michael', 'student1@email.com', '1999-08-10', 'UNI789', 'R002', '101'),
('U004', 'student2', 'studentpass2', 'Brown', 'Alice', 'student2@email.com', '2000-02-20', 'UNI246', 'R002', '102');

-- Courses in Computer Science (10 courses)
INSERT INTO Course (CourseID, CourseName, UserID, DeptID) VALUES
('C001', 'Introduction to Programming', 'U001', '101'),
('C002', 'Algorithms', 'U001', '101'),
('C003', 'Data Structures', 'U001', '101'),
('C004', 'Database Management', 'U001', '101'),
('C005', 'Machine Learning Basics', 'U001', '101'),
('C006', 'Web Development', 'U001', '101'),
('C007', 'Computer Networks', 'U001', '101'),
('C008', 'Software Engineering', 'U001', '101'),
('C009', 'Cybersecurity', 'U001', '101'),
('C010', 'Operating Systems', 'U001', '101');

-- Courses in Data Science (10 courses)
INSERT INTO Course (CourseID, CourseName, UserID, DeptID) VALUES
('C011', 'Data Mining', 'U002', '102'),
('C012', 'Big Data Analytics', 'U002', '102'),
('C013', 'Artificial Intelligence', 'U002', '102'),
('C014', 'Deep Learning', 'U002', '102'),
('C015', 'Natural Language Processing', 'U002', '102'),
('C016', 'Predictive Analytics', 'U002', '102'),
('C017', 'Computer Vision', 'U002', '102'),
('C018', 'Statistical Analysis', 'U002', '102'),
('C019', 'Cloud Computing', 'U002', '102'),
('C020', 'Quantum Computing', 'U002', '102');

-- Enrollments
INSERT INTO Enroll (EnrollID, EnrollDate, UserID, CourseID) VALUES
('E001', '2023-01-15', 'U003', 'C001'),
('E002', '2023-02-20', 'U003', 'C002'),
('E003', '2023-03-10', 'U003', 'C003'),
('E004', '2023-04-05', 'U003', 'C004'),
('E005', '2023-04-15', 'U003', 'C005'),
('E006', '2023-01-25', 'U004', 'C011'),
('E007', '2023-02-28', 'U004', 'C012'),
('E008', '2023-03-15', 'U004', 'C013'),
('E009', '2023-04-20', 'U004', 'C014'),
('E010', '2023-05-05', 'U004', 'C015');

-- Content data
INSERT INTO Content (ConID, ConTitle, ConDesc, ConDate, CourseID) VALUES
('CO001', 'Variables in Programming', 'Introduction to variables in programming languages', '2023-01-20', 'C001'),
('CO002', 'Loop Structures', 'Understanding loop structures in programming', '2023-02-05', 'C001'),
('CO003', 'Functions and Methods', 'Exploring functions and methods in programming', '2023-02-18', 'C001'),
('CO004', 'Sorting Algorithms', 'Understanding various sorting algorithms', '2023-02-27', 'C002'),
('CO005', 'Graph Theory', 'Introduction to graph theory', '2023-03-10', 'C002'),
('CO006', 'Dynamic Programming', 'Understanding dynamic programming concepts', '2023-03-20', 'C002'),
('CO007', 'Stacks and Queues', 'Working with stacks and queues in data structures', '2023-03-25', 'C003'),
('CO008', 'Binary Trees', 'Understanding binary trees', '2023-04-05', 'C003'),
('CO009', 'Hash Tables', 'Working with hash tables in data structures', '2023-04-15', 'C003')
;

-- Announcement data
INSERT INTO Announcement (AnID, AnTitle, AnDesc, AnDate, CourseID) VALUES
('A001', 'Assignment 1 Details', 'Details about the first assignment', '2023-01-25', 'C001'),
('A002', 'Midterm Exam Schedule', 'Details about the midterm exams', '2023-03-01', 'C001'),
('A003', 'Project Submission Guidelines', 'Guidelines for the project submission', '2023-03-20', 'C001'),
('A004', 'Assignment 2 Information', 'Details about the second assignment', '2023-02-10', 'C002'),
('A005', 'Midterm Quiz Schedule', 'Details about the midterm quiz', '2023-03-05', 'C002'),
('A006', 'Project Proposal Submission', 'Submission guidelines for the project proposal', '2023-03-25', 'C002'),
('A007', 'Assignment 3 Details', 'Details about the third assignment', '2023-03-15', 'C003'),
('A008', 'Final Exam Schedule', 'Details about the final exam', '2023-04-10', 'C003'),
('A009', 'Project Presentation Guidelines', 'Guidelines for the project presentation', '2023-04-20', 'C003');
-- ...Add more announcement entries for other courses as needed


-- Assignment data
INSERT INTO Assignment (A_ID, A_Title, A_Desc, A_StartAt, A_DueDate, CourseID) VALUES
('AS001', 'Variables Exercise', 'Exercise on variables', '2023-01-25', '2023-02-05', 'C001'),
('AS002', 'Loop Structures Task', 'Task on loop structures', '2023-02-05', '2023-02-15', 'C001'),
('AS003', 'Functions Quiz', 'Quiz on functions and methods', '2023-02-20', '2023-02-28', 'C001'),
('AS004', 'Sorting Algorithms Project', 'Project on sorting algorithms', '2023-02-28', '2023-03-15', 'C002'),
('AS005', 'Graph Theory Assignment', 'Assignment on graph theory', '2023-03-10', '2023-03-25', 'C002'),
('AS006', 'Dynamic Programming Task', 'Task on dynamic programming concepts', '2023-03-20', '2023-04-05','C002'),
('AS007', 'Stacks and Queues Exercise', 'Exercise on stacks and queues', '2023-03-25', '2023-04-10', 'C003'),
('AS008', 'Binary Trees Quiz', 'Quiz on binary trees', '2023-04-05', '2023-04-20', 'C003'),
('AS009', 'Hash Tables Project', 'Project on hash tables', '2023-04-15', '2023-04-30', 'C003')
-- ...Add more assignment entries for other courses as needed
;
