export interface User {
    UserID: string,
    UserLastName: string,
    UserFirstName: string,
    UserEmail: string,
    UserDOB: Date,
    LoginID: string,
    RoleID: string
  }
  

export async function getUser(id: string): Promise<User> {
    const res = await fetch(`http://localhost:8080/api/user/${id}`);
    return res.json();
}