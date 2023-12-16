export interface User {
    UserID: string,
    UserName: string,
    UserPass: string,
    UserLastName: string,
    UserFirstName: string,
    UserEmail: string,
    UserDOB: Date,
    UserUniID: string,
    RoleID: string,
    DeptID: string
}

export async function getUser(id: string): Promise<User> {
    const res = await fetch(`http://localhost:8080/api/user/${id}`,{ next: { revalidate: 0 }}); // time to revalidate (refetch new data updated)
    const data = await res.json();
    return data.result;
}

export async function getUserByUserName(username: string): Promise<User> {
    const res = await fetch(`http://localhost:8080/api/user/username/${username}`, {next: { revalidate: 0 }});
    const data = await res.json();
    return data.result;
}

export async function createUser(newData: User): Promise<User> {
    const res = await fetch(`http://localhost:8080/api/user`,
    { 
        next: { revalidate: 0 },
        method: "POST",  
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
    }).then((data) => data.json()); 
    return res.result;
}

export async function updateUser(id: string, updatedUserData: Partial<User>): Promise<User> {
    const res = await fetch(`http://localhost:8080/api/user/${id}`, {
        method: "PUT", 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
    });

    if (!res.ok) {
        throw new Error(`Failed to update user: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    return data.result;
}