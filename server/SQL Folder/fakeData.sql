USE CourseDB;

-- Inserting data into the Role table
INSERT INTO Role (RoleID, RoleName, RoleDescription)
VALUES 
    ('R1', 'Admin', 'Administrator role'),
    ('R2', 'Manager', 'Managerial role'),
    ('R3', 'User', 'Regular user role');

-- Inserting data into the Login table
INSERT INTO Login (LoginID, LoginUserName, LoginPassword)
VALUES 
    ('JD123', 'john_doe', 'password123'),
    ('AS456', 'alice_smith', 'pass456'),
    ('MJ789', 'mark_johnson', 'secret123');

-- Inserting data into the [User] table
INSERT INTO [User] (UserID, UserLastName, UserFirstName, UserEmail, UserDOB, LoginID, RoleID)
VALUES 
    ('U1', 'Doe', 'John', 'john@example.com', '1990-05-15', 'JD123', 'R1'),
    ('U2', 'Smith', 'Alice', 'alice@example.com', '1985-09-20', 'AS456', 'R2'),
    ('U3', 'Johnson', 'Mark', 'mark@example.com', '1995-02-10', 'MJ789', 'R3');
