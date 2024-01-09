"use client"

import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import  LoginForm  from './_components/login-form'
import Image from "next/image";
import logoLogin from "@/public/login-logo.svg"
import bbTitle from "@/public/blackboard-title.svg"


const LoginPage = () => {
    const { auth } = useAuth();

    if (auth?.user !== undefined){
        redirect(`/${auth.userID}`);
    }   
    return (
        <div className="w-full h-full flex items-center md:justify-end justify-center relative">
            <div className="w-fit h-full flex items-center md:absolute md:-top-10 md:right-40">
                <div className="flex flex-col">
                    <Image 
                        priority
                        src= {bbTitle}
                        alt="Blackboard Login"
                        className="w-[400px] h-[150px] md:block hidden"
                    />
                    <LoginForm />
                </div>
            </div>
            <Image 
                priority
                src= {logoLogin}
                alt="Blackboard Login"
                className="w-[640px] h-[640px] md:block hidden absolute left-14"
            />
            <div className="w-full absolute bottom-5 flex items-center justify-center">
                <p className="text-sm font-light ">
                    &copy; {new Date().getFullYear()} International University. All rights reserved.
                </p>
            </div>
        </div>
    );
}
 
export default LoginPage;