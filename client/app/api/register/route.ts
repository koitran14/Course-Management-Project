import { createUser, getUser, getUserByUserName } from "@/actions/user-actions";
import { NextResponse } from "next/server";

async function generateUniqueLoginID() {
    const randomValue = Math.floor(Math.random() * 100000);
    const paddedRandom = String(randomValue).padStart(4, '0');
    const uniqueID = `IU${paddedRandom}`;
    const available = await getUser(uniqueID);

    if (!available) {
        return uniqueID;
    } else {
        return generateUniqueLoginID();
    }
}

export async function POST(request: Request) {
    try {
        const { username, password, roleId, firstName, lastName, email, id, dob, deptID } = await request.json();
        console.log({ username, password, roleId, firstName, lastName, email, id, dob, deptID });

        const newData = {
            UserID: await generateUniqueLoginID(),
            UserName: username,
            UserPass: password,
            UserFirstName: firstName,
            UserLastName: lastName,
            UserEmail: email,
            UserDOB: dob,
            UserUniID: id,
            RoleID: roleId,
            DeptID: deptID
        };
        const exist = await getUserByUserName(newData.UserName);
        if (!exist) {
            const loginData = await createUser(newData);
            console.log('Login created:', loginData);
            return NextResponse.json(loginData);
        } else {
            console.error('Username taken');
            return new NextResponse("Username taken.", {status: 409} );
        }
    } catch (error) {
        console.error('Registration failed:', error);
        return new NextResponse('Registration failed.', {status: 500 });
    }
}
