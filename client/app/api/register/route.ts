import { createLogin, getLoginByID, getLoginByUserName } from "@/actions/login-actions";
import { NextResponse } from "next/server";

async function generateUniqueLoginID() {
    const randomValue = Math.floor(Math.random() * 10000);
    const paddedRandom = String(randomValue).padStart(4, '0');
    const uniqueID = `L${paddedRandom}`;
    const available = await getLoginByID(uniqueID);

    if (!available) {
        return uniqueID;
    } else {
        return generateUniqueLoginID();
    }
}

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        console.log({ username, password });

        const newData = {
            LoginID: await generateUniqueLoginID(),
            LoginUserName: username,
            LoginPassword: password
        };
        const exist = await getLoginByUserName(newData.LoginUserName);
        if (!exist) {
            const loginData = await createLogin(newData);
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
