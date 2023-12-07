export interface User {
    result: any;
    UserID: string,
    UserLastName: string,
    UserFirstName: string,
    UserEmail: string,
    UserDOB: Date,
    LoginID: string,
    RoleID: string
}

export async function getUser(id: string): Promise<User> {
    const res = await fetch(`http://localhost:8080/api/user/${id}`,{ next: { revalidate: 0 }}); // time to revalidate (refetch new data updated)
    const data = await res.json();
    return await data.result;

}