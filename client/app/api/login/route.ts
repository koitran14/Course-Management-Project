import { getUserByUserName } from "@/actions/user-actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        const exist = await getUserByUserName(username);

        if (exist && password === exist.UserPass) {
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
