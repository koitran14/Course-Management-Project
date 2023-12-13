"use client"

import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import  LoginForm  from './_components/login-form'

const LoginPage = () => {
    const { auth } = useAuth();

    if (auth?.user !== undefined){
        redirect(`/${auth.userID}`);
    }   
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="border-2 border-slate-500 p-8 rounded-xl">
                <LoginForm />
            </div>
        </div>
    );
}
 
export default LoginPage;