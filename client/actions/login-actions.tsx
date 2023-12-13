export interface Login{
    LoginID: string,
    LoginUserName: string,
    LoginPassword: string,
}

export async function getLoginByUserName(username: string): Promise< Login > {
    const res = await fetch(`http://localhost:8080/api/login/name/${username}`,{ next: { revalidate: 0 }, method: "GET"}); // time to revalidate (refetch new data updated)
    const data = await res.json();
    return data.result;
}

export async function getLoginByID(id: string): Promise< Login > {
    const res = await fetch(`http://localhost:8080/api/login/${id}`,{ next: { revalidate: 0 }}); // time to revalidate (refetch new data updated)
    const data = await res.json();
    return data.result;
}

export async function createLogin(newData: Login): Promise< Login > {
    const res = await fetch(`http://localhost:8080/api/login`,
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