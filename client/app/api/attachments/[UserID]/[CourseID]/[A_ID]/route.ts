import { createUser, getUser, getUserByUserName } from "@/actions/user-actions";
import { NextResponse } from "next/server";

async function generateUniqueAttachmentID() {
    const randomValue = Math.floor(Math.random() * 100000);
    const paddedRandom = String(randomValue).padStart(4, '0');
    const uniqueID = `AT{paddedRandom}`;
    const available = await getUser(uniqueID);

    if (!available) {
        return uniqueID;
    } else {
        return generateUniqueAttachmentID();
    }
}

export async function POST(request: Request, params: {UserID:string, A_ID: string}) {
    try {
        // const { username, password, roleId, firstName, lastName, email, id, dob, deptID } = await request.json();
        // console.log({ username, password, roleId, firstName, lastName, email, id, dob, deptID });

        const newData = {
            // UserID: await generateUniqueAttachmentID(),
            // AttachID: ,
            // Attach_FileName: ,
            // Attach_FileType: ,
            // Attach_Size: ,
            // Attach_Date: Date,
            // Attach_URL: Date,
            // CourseID: ,
            // A_ID: ,
            // AnID: ,
            // ConID: ,
        };
        // const exist = await getUserByUserName(newData.UserName);
        // if (!exist) {
        //     const loginData = await createUser(newData);
        //     console.log('Login created:', loginData);
        //     return NextResponse.json(loginData);
        // } else {
        //     console.error('Username taken');
        //     return new NextResponse("Username taken.", {status: 409} );
        // }
    } catch (error) {
        console.error('Registration failed:', error);
        return new NextResponse('Registration failed.', {status: 500 });
    }
}
