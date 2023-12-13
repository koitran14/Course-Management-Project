import { getLoginByID, getLoginByUserName } from "@/actions/login-actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const newData = {
            LoginUserName: username,
            LoginPassword: password
        };
        
        const exist = await getLoginByUserName(newData.LoginUserName);
        if (exist && newData.LoginPassword === exist.LoginPassword) {
            console.log('Login successfully:', exist);
            return NextResponse.json(exist);
        } else {
            console.error("Unauthorized")
            return new NextResponse("Unauthorized.", {status: 409} );
        }
    } catch (error) {
        console.error('Registration failed:', error);
        return new NextResponse('Login failed.', {status: 500 });
    }
}
